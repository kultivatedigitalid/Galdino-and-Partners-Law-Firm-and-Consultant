# Template execution contract

## Reference

- Retained source: `C:\Users\Joshua\OneDrive\Documents\Law\tmp\discovery\source.docx`
- SHA-256: `2ff093b8653baaa0d21f8e92ddc6fca15b7dd1896e6518069e07592c1f51eb47`
- Page count: unresolved because the required LibreOffice renderer is unavailable; the source has one section, 128 top-level paragraphs, 127 tables, no inline shapes, no text boxes, and no content controls.
- Structural evidence: `tmp/discovery/source-inspection/form_structure.json`, `tmp/discovery/source-inspection/form_text.txt`, `tmp/discovery/source-style-evidence.json`.
- Render attempt: `tmp/discovery/source-render`; conversion failed before page images were created because `soffice` is not installed.

## Page system

- One A4 portrait section: 8.2701 x 11.6903 inches.
- Margins: 0.7201 inch left/right, 0.65 inch top/bottom.
- Header distance: 0.25 inch. Footer distance: 0.30 inch.
- No different first-page header/footer and no additional section pattern.

## Typography

- `Normal`: Arial 10 pt, color `263238`, 5 pt after, approximately 1.18 line spacing.
- `K Title`: Arial 27 pt bold, color `263238`, 6 pt after, keep with next.
- `K Subtitle`: Arial 12 pt regular, color `667178`, 10 pt after, keep with next.
- `K Section`: Arial 20 pt bold, color `263238`, 5 pt after, keep with next.
- `K Heading`: Arial 13 pt bold, color `263238`, 14 pt before, 6 pt after, keep with next.
- `K Helper`: Arial 9 pt regular, color `667178`, 6 pt after, keep with next.
- The template uses extensive intentional direct formatting in its questionnaire tables; these existing properties remain authoritative and must not be normalized.

## Tables and recurring components

- The form is table-driven. Question banners, helper/example boxes, checkbox options, matrices, identity fields, and callouts are separate source tables using the source `Normal Table` pattern and existing cell geometry.
- Existing table widths, column grids, fills, borders, cell margins, row rules, and paragraph formatting are preserve-only.
- Question banners are stably located by a `word/document.xml` table cell containing a question number matching `1.1` through `6.6` plus its exact question text.
- The seven-project-identity rows are located in the first seven-row table whose first column starts with `Nama perusahaan / brand`.
- Final confirmation, filler identity, and additional-notes tables are located by their exact section headings and row labels.

## Content flow and slot map

- Preserve the complete opening, usage instructions, six numbered sections, every question/helper/example/options/matrix table, final confirmation, filler identity, and additional-notes block in their original order.
- Fill only the answer-side cells of the project-identity table.
- For each numbered question, add a short evidence-status response inside the existing question-banner cell without deleting the question, helper, examples, choices, or response matrix.
- Leave pre-existing choice and matrix structures intact; detailed evidence, missing information, recommendations, and requested additional data are added to a new appendix in the same 1.1-6.6 order.
- Append `Lampiran Analisis Berdasarkan Project` after the final source paragraph. The appendix may use only source paragraph styles (`K Section`, `K Heading`, `K Helper`, `Normal`, and `List Bullet`) and must not introduce new tables or page geometry.
- Do not invent answers for unsupported slots. Use the four user-required status labels and explicitly separate recommendations from implemented facts.

## Package preservation

- Editable: `word/document.xml` only, plus metadata that the document library may update on save.
- Preserve-only: styles, numbering, theme, font table, settings, headers, footers, relationships, content types, custom XML, media, comments, footnotes/endnotes, and all other opaque package parts.
- The source has no content controls, inline shapes, or text boxes. Existing package relationships must remain present.

## Fidelity gates

- Retained source SHA-256 must remain unchanged.
- Section count, A4 page size, margins, header/footer distances, style names, existing table count, and original question order must remain unchanged unless the appendix adds non-table paragraphs only.
- All 50 numbered questions, seven project-identity fields, four final confirmations, three filler-identity fields, and the additional-notes field must remain present.
- Every numbered question must have exactly one appendix entry with Status, Jawaban berdasarkan project, Sumber dalam project, optional uncertainty, Rekomendasi, and optional Data tambahan yang dibutuhkan.
- No source value marked placeholder, dummy, concept, unverified, pending, or awaiting approval may be promoted to a confirmed real-world fact.
- Renderer gate is unavailable in this environment; final QA must therefore include structural re-inspection, package-part comparison, paragraph/table counts, duplicate/missing-question checks, and Word-open integrity validation where possible.
