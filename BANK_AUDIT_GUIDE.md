# Bank Data Audit Guide

This document describes which fields in the `document_guides` table (category = "финансы") should be audited for completeness across all banks.

## Fields to Check for Each Bank

Based on the BankCard component rendering logic, the following fields should be audited:

### Display Fields (shown in collapsed/headline)
- **tags** → "Особенности" (Free, Multicurrency, etc.) shown as headline/subtitle
- **cost** → Converted to display currency, shown as subtitle

### Expanded Content Sections

1. **Description**
   - Field: `description`
   - Shown: Yes, if present
   - Required for full card information

2. **Info Grid**
   - `when_to_get` → "Когда подавать"
   - `where_to_submit` → "Куда подавать" (with Google Maps link)
   - `working_hours` → "Часы работы"
   - `online_booking` → "Онлайн запись"
   - `cost` → "Стоимость/Валюта" (with currency hint)
   - `waiting_time` → "Время ожидания"

3. **Required Documents**
   - Field: `required_docs` (array)
   - Shown: Only if array has items

4. **How to Apply**
   - Field: `instructions` (array)
   - Shown: Only if array has items
   - Displayed as numbered steps

5. **Tips**
   - Field: `tips` (array)
   - Shown: Only if array has items

6. **Common Mistakes**
   - Field: `common_mistakes` (array)
   - Shown: Only if array has items

7. **Important Notice**
   - Field: `important_2026`
   - Shown: If present (amber warning box)

8. **Links**
   - Field: `links` (array) or `online_url`
   - Shown: "Официальный сайт" button if link exists

### Additional Fields (backend/filtering)
- `price_label` → May be used for display
- `important_2026` → 2026 specific information

## How to Generate the Audit

### Method 1: Via API (with correct Supabase key)
```bash
node audit-banks.mjs
```

### Method 2: Manual Database Query
```sql
SELECT id, name, type,
  description IS NOT NULL as has_description,
  tags IS NOT NULL AND array_length(tags, 1) > 0 as has_tags,
  cost IS NOT NULL as has_cost,
  required_docs IS NOT NULL AND array_length(required_docs, 1) > 0 as has_docs,
  instructions IS NOT NULL AND array_length(instructions, 1) > 0 as has_instructions,
  tips IS NOT NULL AND array_length(tips, 1) > 0 as has_tips,
  links IS NOT NULL AND array_length(links, 1) > 0 as has_links,
  online_url IS NOT NULL as has_online_url,
  important_2026 IS NOT NULL as has_important_2026,
  when_to_get IS NOT NULL as has_when_to_get,
  where_to_submit IS NOT NULL as has_where_to_submit,
  working_hours IS NOT NULL as has_working_hours,
  online_booking IS NOT NULL as has_online_booking,
  waiting_time IS NOT NULL as has_waiting_time,
  common_mistakes IS NOT NULL AND array_length(common_mistakes, 1) > 0 as has_common_mistakes
FROM document_guides
WHERE category = 'финансы'
ORDER BY name;
```

## Expected Issues Found

Based on the code structure and user feedback:

1. **Bank Pocztowy** - Missing tags/features and description
2. **BNP Paribas** - Has complete data
3. Various banks may have incomplete info sections

## Audit Template

For each bank, record:
```
Bank Name: [name]
  ✓ Заполнены: [field1, field2, ...]
  ✗ Пусто: [field1, field2, ...]
  Data completeness: X/16 fields
```

## Notes

- The app displays all fields as optional (no required fields)
- Empty fields are gracefully hidden via conditional rendering
- Arrays must have at least 1 item to be considered "filled"
- The audit focuses on what's visible to end users, not backend/filtering fields
