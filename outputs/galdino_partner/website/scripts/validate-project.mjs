import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const required = [
  'src/pages/id/index.astro', 'src/pages/en/index.astro',
  'src/pages/id/profile.astro', 'src/pages/en/profile.astro',
  'src/pages/id/services.astro', 'src/pages/en/services.astro',
  'src/pages/id/projects.astro', 'src/pages/en/projects.astro',
  'src/pages/id/blog/index.astro', 'src/pages/en/blog/index.astro',
  'src/pages/id/contact.astro', 'src/pages/en/contact.astro',
  'src/pages/api/contact.ts', '.env.example', 'vercel.json',
  ...['PROJECT_CONTEXT', 'REQUIREMENTS', 'ARCHITECTURE', 'DESIGN_SYSTEM', 'PAGE_SPECIFICATIONS', 'COMPONENT_GUIDELINES', 'CONTENT_GUIDELINES', 'I18N_GUIDELINES', 'SEO_GUIDELINES', 'ACCESSIBILITY_GUIDELINES', 'SERVERLESS_CONTACT_FORM', 'DEPLOYMENT', 'DEVELOPMENT_WORKFLOW'].map((name) => `docs/${name}.md`),
];
const missing = required.filter((file) => !existsSync(join(root, file)));
if (missing.length) throw new Error(`Missing required files:\n${missing.join('\n')}`);

for (const locale of ['id', 'en']) {
  const dir = join(root, 'src/content/blog', locale);
  const posts = readdirSync(dir).filter((file) => file.endsWith('.md'));
  if (!posts.length) throw new Error(`No ${locale} blog content.`);
  for (const file of posts) {
    const content = readFileSync(join(dir, file), 'utf8');
    for (const key of ['title:', 'description:', 'publishDate:', 'author:', 'category:', 'tags:', 'featuredImage:', 'locale:', 'translationKey:', 'draft:']) {
      if (!content.includes(key)) throw new Error(`${locale}/${file} is missing ${key}`);
    }
  }
}

const nav = readFileSync(join(root, 'src/data/site.ts'), 'utf8');
for (const locale of ['id', 'en']) {
  if (!nav.includes(`{ href: '/${locale}/', label: 'Home' }`)) throw new Error(`Navigation missing /${locale}/ Home item`);
  for (const route of ['profile', 'services', 'projects', 'blog']) {
    if (!nav.includes(`/${locale}/${route}/`)) throw new Error(`Navigation missing /${locale}/${route}/`);
  }
}

console.log(`Project validation passed: ${required.length} required files, bilingual routes, approved navigation, contact routes, and blog frontmatter.`);
