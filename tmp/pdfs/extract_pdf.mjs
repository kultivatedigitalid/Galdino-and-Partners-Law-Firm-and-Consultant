import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const [inputPath, outputPath, pdfjsPath] = process.argv.slice(2);

if (!inputPath || !outputPath || !pdfjsPath) {
  throw new Error('Usage: node extract_pdf.mjs <input.pdf> <output.txt> <pdf.mjs>');
}

// PDF.js attempts to install these browser primitives from an optional native
// canvas dependency. Text extraction does not use their rendering behavior, so
// lightweight placeholders are sufficient in this read-only extraction script.
globalThis.DOMMatrix ??= class DOMMatrix {
  constructor(init) {
    this.a = init?.[0] ?? 1;
    this.b = init?.[1] ?? 0;
    this.c = init?.[2] ?? 0;
    this.d = init?.[3] ?? 1;
    this.e = init?.[4] ?? 0;
    this.f = init?.[5] ?? 0;
  }
};
globalThis.ImageData ??= class ImageData {};
globalThis.Path2D ??= class Path2D {};

const pdfjs = await import(pathToFileURL(pdfjsPath).href);
const data = new Uint8Array(await fs.readFile(inputPath));
const loadingTask = pdfjs.getDocument({
  data,
  disableWorker: true,
  useSystemFonts: true,
  isEvalSupported: false,
});
const pdf = await loadingTask.promise;
const metadata = await pdf.getMetadata().catch(() => ({}));
const outline = await pdf.getOutline().catch(() => null);

const lines = [];
lines.push(`PAGE_COUNT: ${pdf.numPages}`);
lines.push(`TITLE: ${metadata?.info?.Title ?? ''}`);
lines.push(`AUTHOR: ${metadata?.info?.Author ?? ''}`);
if (outline) {
  lines.push('OUTLINE:');
  const walk = (items, depth = 0) => {
    for (const item of items ?? []) {
      lines.push(`${'  '.repeat(depth)}- ${item.title}`);
      walk(item.items, depth + 1);
    }
  };
  walk(outline);
}

for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
  const page = await pdf.getPage(pageNumber);
  const content = await page.getTextContent({ includeMarkedContent: false });
  const textItems = content.items.filter((item) => typeof item.str === 'string');
  const pageLines = [];
  let current = '';
  let previousY = null;

  for (const item of textItems) {
    const y = Math.round(item.transform?.[5] ?? 0);
    const newVisualLine = previousY !== null && Math.abs(y - previousY) > 2;
    if (newVisualLine && current.trim()) {
      pageLines.push(current.trim());
      current = '';
    }
    if (current && item.str && !/^\s/.test(item.str)) current += ' ';
    current += item.str;
    if (item.hasEOL && current.trim()) {
      pageLines.push(current.trim());
      current = '';
    }
    previousY = y;
  }
  if (current.trim()) pageLines.push(current.trim());

  lines.push('');
  lines.push(`===== PAGE ${pageNumber} =====`);
  lines.push(...pageLines);
  page.cleanup();
}

await fs.writeFile(outputPath, lines.join('\n'), 'utf8');
await pdf.destroy();
