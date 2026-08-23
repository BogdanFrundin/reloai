import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { getTemplateByKey } from "../../../_lib/formTemplates";
import type { DocumentProfile } from "../../../_lib/documentProfile";

export const runtime = "nodejs";

type FillRequestBody = {
  templateKey?: string;
  profile?: DocumentProfile;
  citizenship?: string | null;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as FillRequestBody | null;
  if (!body?.templateKey) {
    return NextResponse.json({ error: "templateKey is required" }, { status: 400 });
  }

  const template = getTemplateByKey(body.templateKey);
  if (!template) {
    return NextResponse.json({ error: "Unknown templateKey" }, { status: 404 });
  }

  const profile = body.profile ?? {};
  const citizenship = body.citizenship ?? null;
  const ctx = { profile, citizenship };

  let bytes: Buffer;
  try {
    const filePath = path.join(process.cwd(), "public", template.pdfPath);
    bytes = await readFile(filePath);
  } catch (err) {
    console.error("Failed to read form template:", err);
    return NextResponse.json({ error: "Template file not found" }, { status: 500 });
  }

  const pdfDoc = await PDFDocument.load(bytes);
  const hasOverlayFields = template.fields.some((f) => f.kind === "overlay-text" || f.kind === "overlay-check");
  const helvetica = hasOverlayFields ? await pdfDoc.embedFont(StandardFonts.Helvetica) : null;
  const helveticaBold = hasOverlayFields ? await pdfDoc.embedFont(StandardFonts.HelveticaBold) : null;

  const skipped: string[] = [];

  for (const field of template.fields) {
    try {
      if (field.kind === "text") {
        const form = pdfDoc.getForm();
        const value = field.value(ctx);
        if (!value) continue;
        const textField = form.getTextField(field.pdfField);
        textField.setText(String(value));
      } else if (field.kind === "checkbox") {
        const form = pdfDoc.getForm();
        const shouldCheck = field.checked(ctx);
        const checkBox = form.getCheckBox(field.pdfField);
        if (shouldCheck) checkBox.check();
      } else if (field.kind === "overlay-text") {
        const value = field.value(ctx);
        if (!value) continue;
        const page = pdfDoc.getPage(field.page);
        const size = field.size ?? 9;
        let drawSize = size;
        if (field.maxWidth && helvetica) {
          const width = helvetica.widthOfTextAtSize(String(value), size);
          if (width > field.maxWidth) {
            drawSize = Math.max(6, size * (field.maxWidth / width));
          }
        }
        page.drawText(String(value), { x: field.x, y: field.y, size: drawSize, font: helvetica! });
      } else {
        // overlay-check
        if (!field.checked(ctx)) continue;
        const page = pdfDoc.getPage(field.page);
        const size = field.size ?? 9;
        page.drawText("X", { x: field.x, y: field.y, size, font: helveticaBold! });
      }
    } catch (err) {
      // A field/position that no longer matches the source PDF shouldn't
      // take down the whole fill -- skip it and keep going with the rest.
      const label = field.kind === "text" || field.kind === "checkbox" ? field.pdfField : `${field.kind}@${field.page}`;
      skipped.push(label);
    }
  }

  if (skipped.length > 0) {
    console.warn(`Form fill (${template.key}): ${skipped.length} field(s) failed:`, skipped);
  }

  try {
    pdfDoc.getForm().updateFieldAppearances();
  } catch {
    // Best-effort -- pdf-lib already generates appearances per setText/check call.
  }

  const filledBytes = await pdfDoc.save();

  return new Response(new Uint8Array(filledBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${template.key}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
