import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument } from "pdf-lib";
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
  const form = pdfDoc.getForm();

  const skipped: string[] = [];

  for (const field of template.fields) {
    try {
      if (field.kind === "text") {
        const value = field.value(ctx);
        if (!value) continue;
        const textField = form.getTextField(field.pdfField);
        textField.setText(String(value));
      } else {
        const shouldCheck = field.checked(ctx);
        const checkBox = form.getCheckBox(field.pdfField);
        if (shouldCheck) {
          checkBox.check();
        }
      }
    } catch (err) {
      // A field name that no longer matches the source PDF shouldn't take
      // down the whole fill -- skip it and keep going with the rest.
      skipped.push(field.pdfField);
    }
  }

  if (skipped.length > 0) {
    console.warn(`Form fill (${template.key}): ${skipped.length} field(s) not found in PDF:`, skipped);
  }

  try {
    form.updateFieldAppearances();
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
