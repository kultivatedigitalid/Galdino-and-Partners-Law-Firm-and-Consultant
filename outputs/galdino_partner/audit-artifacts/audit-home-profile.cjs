const fs = require('node:fs/promises');
const { chromium } = require('C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const BASE = 'http://127.0.0.1:4323';
const OUTPUT = 'C:/Users/Joshua/OneDrive/Documents/Law/outputs/galdino_partner/audit-artifacts/audit-home-profile.json';
const CHROME = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const cases = [
  ['id', '', 'desktop', 1440, 900],
  ['id', 'profile/', 'desktop', 1440, 900],
  ['id', '', 'tablet', 768, 1024],
  ['id', 'profile/', 'tablet', 768, 1024],
  ['id', '', 'mobile', 390, 844],
  ['id', 'profile/', 'mobile', 390, 844],
  ['id', '', 'small-mobile', 320, 568],
  ['id', 'profile/', 'small-mobile', 320, 568],
  ['en', '', 'desktop-en', 1440, 900],
  ['en', 'profile/', 'desktop-en', 1440, 900],
  ['en', '', 'mobile-en', 390, 844],
  ['en', 'profile/', 'mobile-en', 390, 844],
];

async function inspect(page, locale, route, label, width, height) {
  const consoleErrors = [];
  const pageErrors = [];
  page.removeAllListeners();
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.setViewportSize({ width, height });
  const response = await page.goto(`${BASE}/${locale}/${route}`, {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  });
  await page.waitForTimeout(300);
  const result = await page.evaluate(() => {
    const clean = (value) => (value || '').trim().replace(/\s+/g, ' ');
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    };
    const rect = (element) => {
      const value = element.getBoundingClientRect();
      return {
        x: Math.round(value.x),
        y: Math.round(value.y),
        width: Math.round(value.width),
        height: Math.round(value.height),
        right: Math.round(value.right),
      };
    };
    const type = (element) => {
      const style = getComputedStyle(element);
      return {
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        color: style.color,
      };
    };
    const h1 = document.querySelector('h1');
    const firstSection = document.querySelector('main > section');
    const header = document.querySelector('.site-header');
    const headerStyle = header ? getComputedStyle(header) : null;
    const h1Box = h1?.getBoundingClientRect();
    return {
      title: document.title,
      lang: document.documentElement.lang,
      document: {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        scrollHeight: document.documentElement.scrollHeight,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      },
      header: header ? {
        rect: rect(header),
        position: headerStyle.position,
        background: headerStyle.background,
        backgroundColor: headerStyle.backgroundColor,
        backdropFilter: headerStyle.backdropFilter,
        borderBottomColor: headerStyle.borderBottomColor,
      } : null,
      hero: firstSection ? {
        rect: rect(firstSection),
        h1LinesApprox: h1Box ? Math.round(h1Box.height / parseFloat(getComputedStyle(h1).lineHeight)) : null,
      } : null,
      headings: Array.from(document.querySelectorAll('h1,h2,h3'))
        .filter(visible)
        .map((element) => ({
          level: element.tagName.toLowerCase(),
          text: clean(element.textContent),
          rect: rect(element),
          type: type(element),
        })),
      longestParagraphs: Array.from(document.querySelectorAll('main p'))
        .filter(visible)
        .map((element) => {
          const text = clean(element.textContent);
          return {
            text,
            words: text ? text.split(/\s+/).length : 0,
            rect: rect(element),
            type: type(element),
          };
        })
        .sort((a, b) => b.words - a.words)
        .slice(0, 8),
      sections: Array.from(document.querySelectorAll('main > section'))
        .filter(visible)
        .map((element) => ({
          className: element.className,
          heading: clean(element.querySelector('h1,h2')?.textContent),
          rect: rect(element),
        })),
      outOfViewport: Array.from(document.querySelectorAll('body *'))
        .filter(visible)
        .map((element) => ({
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === 'string' ? element.className : '',
          text: clean(element.textContent).slice(0, 80),
          rect: rect(element),
        }))
        .filter((item) => item.rect.x < -1 || item.rect.right > innerWidth + 1)
        .slice(0, 20),
      smallTargets: Array.from(document.querySelectorAll('a,button'))
        .filter(visible)
        .map((element) => ({
          text: clean(element.textContent).slice(0, 70),
          ariaLabel: element.getAttribute('aria-label'),
          rect: rect(element),
        }))
        .filter((item) => item.rect.width < 44 || item.rect.height < 44)
        .slice(0, 30),
      missingAlt: Array.from(document.images)
        .filter(visible)
        .filter((image) => image.getAttribute('alt') === null)
        .map((image) => image.currentSrc || image.src),
      activeNav: clean(document.querySelector('.nav-link.active')?.textContent),
      languagePreservesScroll: document.querySelector('.language-link')?.hasAttribute('data-preserve-scroll') || false,
    };
  });
  await page.evaluate(() => window.scrollTo(0, Math.min(240, document.documentElement.scrollHeight - innerHeight)));
  await page.waitForTimeout(250);
  result.scrolledHeader = await page.evaluate(() => {
    const element = document.querySelector('.site-header');
    if (!element) return null;
    const style = getComputedStyle(element);
    return {
      className: element.className,
      dataset: { ...element.dataset },
      background: style.background,
      backgroundColor: style.backgroundColor,
      backdropFilter: style.backdropFilter,
      borderBottomColor: style.borderBottomColor,
    };
  });
  return {
    locale,
    route: route || 'home',
    label,
    viewport: { width, height },
    status: response?.status() || null,
    consoleErrors,
    pageErrors,
    ...result,
  };
}

async function interactions(page) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/id/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  const toggle = page.locator('.menu-toggle');
  await toggle.click();
  const open = {
    expanded: await toggle.getAttribute('aria-expanded'),
    visible: await page.locator('.nav-panel').isVisible(),
  };
  await page.keyboard.press('Escape');
  const closed = {
    expanded: await toggle.getAttribute('aria-expanded'),
    visible: await page.locator('.nav-panel').isVisible(),
    focusReturned: await page.evaluate(() => document.activeElement?.classList.contains('menu-toggle') || false),
  };

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE}/id/profile/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.evaluate(() => window.scrollTo(0, 900));
  const before = await page.evaluate(() => window.scrollY);
  await page.locator('.language-link').click();
  await page.waitForURL('**/en/profile/', { timeout: 15000 });
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => window.scrollY);
  return {
    menu: { open, closed },
    languageScroll: { before, after, preserved: Math.abs(before - after) <= 20 },
  };
}

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, executablePath: CHROME });
    const context = await browser.newContext({ reducedMotion: 'no-preference' });
    const page = await context.newPage();
    const layouts = [];
    for (const item of cases) layouts.push(await inspect(page, ...item));
    const interactionResults = await interactions(page);
    const report = {
      generatedAt: new Date().toISOString(),
      layouts,
      interactions: interactionResults,
    };
    await fs.writeFile(OUTPUT, JSON.stringify(report, null, 2));
    process.stdout.write(JSON.stringify({
      output: OUTPUT,
      layoutCount: layouts.length,
      interactions: interactionResults,
    }, null, 2));
  } finally {
    await browser?.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
