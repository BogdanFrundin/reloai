const supabaseUrl = "https://fumsrsguidoytjgvewkk.supabase.co";
const supabaseAnonKey = "sb_publishable_vhiLfwZUOEEdprJc9Al5wA_ujzqirCc";

async function auditBanks() {
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/document_guides?category=eq.финансы&order=name.asc`,
      {
        headers: {
          "apikey": supabaseAnonKey,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP ${response.status}: ${errorText}`);
      return;
    }

    const banks = await response.json();

    console.log("ПОЛНЫЙ АУДИТ ДАННЫХ БАНКОВ\n" + "=".repeat(120) + "\n");
    console.log(`Всего банков: ${banks.length}\n`);

    const fieldsToCheck = [
      { key: "tags", label: "Особенности (tags)" },
      { key: "description", label: "Развёрнутое описание" },
      { key: "where_to_submit", label: "Куда подавать" },
      { key: "cost", label: "Стоимость/Валюта" },
      { key: "required_docs", label: "Документы" },
      { key: "instructions", label: "Как оформить" },
      { key: "tips", label: "Советы" },
      { key: "common_mistakes", label: "Частые ошибки" },
    ];

    console.log("ДЕТАЛЬНЫЙ СПИСОК ПО КАЖДОМУ БАНКУ:\n");

    const results = [];

    banks.forEach((bank, i) => {
      const missing = [];
      const present = [];

      fieldsToCheck.forEach(({ key, label }) => {
        const value = bank[key];
        const isEmpty = !value || (Array.isArray(value) && value.length === 0);
        if (isEmpty) {
          missing.push(label);
        } else {
          present.push(label);
        }
      });

      results.push({
        name: bank.name,
        missing,
        present,
      });

      console.log(`${i + 1}. ${bank.name}`);
      if (present.length > 0) {
        console.log(`   ✓ ЕСТЬ: ${present.join(", ")}`);
      }
      if (missing.length > 0) {
        console.log(`   ✗ НЕТ:  ${missing.join(", ")}`);
      }
      console.log();
    });

    // Summary table
    console.log("\n" + "=".repeat(120) + "\nТАБЛИЦА ПРОБЕЛОВ В ДАННЫХ\n");
    console.log("№  | Банк                          | Особ | Опис | Адрес | Стоим | Доки | Оформ | Совет | Ошибки");
    console.log("-".repeat(120));

    banks.forEach((bank, i) => {
      const abbr = (str) => str.substring(0, 5);
      const row = [
        String(i + 1).padStart(2),
        bank.name.substring(0, 30).padEnd(30),
        bank.tags && bank.tags.length > 0 ? "✓" : "✗",
        bank.description ? "✓" : "✗",
        bank.where_to_submit ? "✓" : "✗",
        bank.cost ? "✓" : "✗",
        bank.required_docs && bank.required_docs.length > 0 ? "✓" : "✗",
        bank.instructions && bank.instructions.length > 0 ? "✓" : "✗",
        bank.tips && bank.tips.length > 0 ? "✓" : "✗",
        bank.common_mistakes && bank.common_mistakes.length > 0 ? "✓" : "✗",
      ];
      console.log(row.join(" | "));
    });

    // Statistics
    console.log("\n" + "=".repeat(120) + "\nСТАТИСТИКА ЗАПОЛНЕННОСТИ\n");
    fieldsToCheck.forEach(({ key, label }) => {
      const filledCount = banks.filter((b) => {
        const value = b[key];
        return value && (Array.isArray(value) ? value.length > 0 : true);
      }).length;
      const emptyCount = banks.length - filledCount;
      const percent = Math.round((filledCount / banks.length) * 100);
      console.log(`${label.padEnd(30)} | ${filledCount}/${banks.length} (${percent}%) | ${emptyCount} банков без данных`);
    });

    console.log("\n" + "=".repeat(120));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

auditBanks();
