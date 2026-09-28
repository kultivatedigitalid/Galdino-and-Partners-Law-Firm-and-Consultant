import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const root = 'C:/Users/Joshua/OneDrive/Documents/Law/outputs/galdino_partner/website';
const output = 'C:/Users/Joshua/OneDrive/Documents/Law/tmp/mapping_workbook_2026-08-14/codebase_audit.json';
const textExtensions = new Set(['.astro', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.md', '.css', '.scss', '.txt', '.yml', '.yaml', '.toml', '.xml']);
const textNames = new Set(['.env.example', '.gitignore', 'LICENSE']);
const excludedDirectories = new Set(['node_modules', 'dist', '.git', '.astro', '.vercel']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(full));
    else result.push(full);
  }
  return result;
}

function relative(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}

function routeFromFile(rel) {
  if (!rel.startsWith('src/pages/')) return null;
  let route = rel.slice('src/pages/'.length).replace(/\.(astro|ts|js|mjs)$/, '');
  route = route.replace(/\/index$/, '/').replace(/index$/, '');
  route = '/' + route;
  route = route.replaceAll('\\', '/').replace(/\/+/g, '/');
  return route || '/';
}

const allFiles = await walk(root);
const files = [];
const routes = [];
const imports = [];
const componentUsages = [];
const links = [];
const flags = [];
const assetFiles = [];

for (const file of allFiles) {
  const rel = relative(file);
  const ext = path.extname(file).toLowerCase();
  const stat = await fs.stat(file);
  if (!textExtensions.has(ext) && !textNames.has(path.basename(file))) {
    assetFiles.push({ file: rel, size: stat.size, extension: ext || '(none)' });
    continue;
  }
  const content = await fs.readFile(file, 'utf8');
  const lines = content.split(/\r?\n/);
  const digest = crypto.createHash('sha256').update(content).digest('hex');
  const fileRecord = {
    file: rel,
    bytes: Buffer.byteLength(content),
    lines: lines.length,
    sha256: digest,
    placeholderCount: (content.match(/PLACEHOLDER/gi) || []).length,
    dummyCount: (content.match(/DUMMY/gi) || []).length,
    noindexCount: (content.match(/noindex/gi) || []).length,
  };
  files.push(fileRecord);

  const route = routeFromFile(rel);
  if (route) routes.push({ file: rel, route });

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    for (const match of line.matchAll(/(?:import\s+[^'\"]+?\s+from\s+|import\s*)['\"]([^'\"]+)['\"]/g)) {
      imports.push({ file: rel, line: lineNumber, target: match[1] });
    }
    for (const match of line.matchAll(/<([A-Z][A-Za-z0-9_]*)\b/g)) {
      componentUsages.push({ file: rel, line: lineNumber, component: match[1] });
    }
    for (const match of line.matchAll(/(?:href|action)=\{?['\"`]([^'\"`]+)['\"`]/g)) {
      links.push({ file: rel, line: lineNumber, href: match[1] });
    }
    if (/PLACEHOLDER|DUMMY|PREVIEW|noindex|prerender\s*=|Resend|schema|structured data/i.test(line)) {
      flags.push({ file: rel, line: lineNumber, text: line.trim().slice(0, 500) });
    }
  });
}

const audit = {
  root,
  generatedAt: new Date().toISOString(),
  coverage: {
    totalFiles: allFiles.length,
    textFilesRead: files.length,
    binaryOrAssetFiles: assetFiles.length,
    totalTextLines: files.reduce((sum, item) => sum + item.lines, 0),
    totalTextBytes: files.reduce((sum, item) => sum + item.bytes, 0),
  },
  files,
  assetFiles,
  routes,
  imports,
  componentUsages,
  links,
  flags,
};

await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, JSON.stringify(audit, null, 2), 'utf8');
console.log(JSON.stringify({
  coverage: audit.coverage,
  routes: routes.length,
  imports: imports.length,
  componentUsages: componentUsages.length,
  links: links.length,
  flaggedLines: flags.length,
  topPlaceholderFiles: files.filter((item) => item.placeholderCount || item.dummyCount).sort((a, b) => (b.placeholderCount + b.dummyCount) - (a.placeholderCount + a.dummyCount)).slice(0, 20),
}, null, 2));
