const { chromium } = require('playwright');
const { pathToFileURL } = require('url');

async function main() {
  const [inputPath, outputPath, widthArg = '1440', heightArg = '1000', fullPageArg = 'false'] = process.argv.slice(2);
  if (!inputPath || !outputPath) {
    throw new Error('Usage: render_mockups.cjs <input> <output> [width] [height] [fullPage]');
  }

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--allow-file-access-from-files', '--enable-webgl', '--ignore-gpu-blocklist', '--use-angle=swiftshader'],
  });

  const page = await browser.newPage({
    viewport: { width: Number(widthArg), height: Number(heightArg) },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'no-preference',
  });

  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(pathToFileURL(inputPath).href, { waitUntil: 'load' });
  await page.waitForFunction(() => document.readyState === 'complete');

  const stage = page.locator('[data-regulatory-stage]');
  if (await stage.count()) {
    await page.waitForFunction(() => {
      const node = document.querySelector('[data-regulatory-stage]');
      return node && node.dataset.webglState !== 'loading';
    }, null, { timeout: 5000 }).catch(() => {});
  }

  await page.screenshot({ path: outputPath, fullPage: fullPageArg === 'true' });
  const result = {
    title: await page.title(),
    url: page.url(),
    h1: await page.locator('h1').count(),
    main: await page.locator('main').count(),
    images: await page.locator('img').count(),
    webglState: await stage.count() ? await stage.getAttribute('data-webgl-state') : null,
    errors,
  };
  process.stdout.write(JSON.stringify(result));
  await browser.close();
}

main().catch((error) => {
  process.stderr.write(error.stack || error.message);
  process.exit(1);
});
