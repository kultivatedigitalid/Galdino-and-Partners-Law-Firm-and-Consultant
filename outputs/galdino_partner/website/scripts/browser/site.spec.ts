import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const paths=['/id/','/id/profile/','/id/profile/hans-galdino/','/id/profile/how-we-work/','/id/services/','/id/services/reklame/','/id/services/lingkungan/dokumen-lingkungan/','/id/services/lingkungan/dokumen-lingkungan/amdal/','/id/industries/','/id/industries/developer-properti/','/id/projects/','/id/projects/aruna-pangan/','/id/blog/','/id/blog/apa-itu-pbg/','/id/contact/','/id/privacy/','/en/services/','/en/contact/'];
const consent={version:1,analytics:false,time:Date.now()};
for(const width of [320,375,430,768,900,1024,1280,1440,1920]){
 test('responsive '+width,async({page})=>{
  await page.setViewportSize({width,height:1000});
  await page.addInitScript(v=>localStorage.setItem('gp-consent-v1',JSON.stringify(v)),consent);
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  for(const path of paths){
   const response=await page.goto(path);expect(response?.status(),path).toBe(200);
   await page.evaluate(()=>document.fonts.ready);
   const overflow=await page.evaluate(()=>({body:document.body.scrollWidth,root:document.documentElement.scrollWidth,view:innerWidth}));
   expect(overflow.root,path+' document overflow').toBeLessThanOrEqual(width+1);
   expect(overflow.body,path+' body overflow').toBeLessThanOrEqual(width+1);
   await expect(page.locator('h1'),path).toBeVisible();
   if([375,1440].includes(width)&&['/id/','/id/services/','/id/industries/','/id/projects/','/id/contact/','/id/profile/'].includes(path)){await page.locator('img').evaluateAll(async (images:HTMLImageElement[])=>{images.forEach(img=>img.loading='eager');await Promise.all(images.map(img=>img.decode()));});await page.screenshot({path:'reports/screenshots/'+path.split('/').filter(Boolean).join('-')+'-'+width+'.png',fullPage:true});}
  }
  expect(errors).toEqual([]);
 });
}
for(const path of ['/id/','/id/profile/','/id/profile/hans-galdino/','/id/projects/','/id/industries/','/id/services/','/id/services/lingkungan/dokumen-lingkungan/amdal/','/id/industries/developer-properti/','/id/projects/aruna-pangan/','/id/blog/','/id/blog/apa-itu-pbg/','/id/contact/','/en/contact/']){
 test('accessibility '+path,async({page})=>{
  await page.goto(path);await page.evaluate(()=>document.fonts.ready);
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  expect(results.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
 });
}
test('nested navigation, language pair and mobile menu',async({page})=>{
 await page.setViewportSize({width:375,height:900});await page.goto('/id/services/lingkungan/dokumen-lingkungan/amdal/');
 await page.locator('[data-consent-reject]').click();
 await expect(page.locator('.ed-breadcrumb')).toContainText('Dokumen Lingkungan');
 await page.locator('.menu-toggle').click();await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded','true');
 await page.getByRole('link',{name:'Switch to English'}).click();
 await expect(page).toHaveURL(/\/en\/services\/environmental-approvals\/environmental-documents\/environmental-impact-assessment\/$/);
 await page.locator('.menu-toggle').click();await page.keyboard.press('Escape');await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded','false');
});
test('service and insight searches support multiple terms and reset',async({page})=>{
 await page.goto('/id/services/');await page.locator('[data-consent-reject]').click();
 await page.locator('#service-search').fill('iso 9001');await expect(page.locator('[data-service-search]:visible')).toHaveCount(1);
 await page.locator('#service-search').fill('zzznomatch');await expect(page.locator('#service-empty')).toBeVisible();
 await page.locator('[data-reset-service]').click();await expect(page.locator('[data-service-search]:visible')).toHaveCount(0);
 await page.goto('/id/blog/');await page.locator('#insight-search').fill('pbg imb');expect(await page.locator('[data-insight]:visible').count()).toBeGreaterThan(0);
 await page.locator('#insight-search').fill('zzznomatch');await expect(page.locator('#insight-empty')).toBeVisible();await page.locator('#insight-reset').click();await expect(page.locator('[data-insight]:visible')).toHaveCount(14);
 const value=await page.locator('#insight-category option').nth(1).getAttribute('value');await page.locator('#insight-category').selectOption(value!);
 expect(await page.locator('[data-insight]:visible').count()).toBeLessThan(14);
});
test('cookie consent persists, preferences keyboard and withdrawal',async({page})=>{
 const google:string[]=[];page.on('request',r=>{if(/google-analytics|googletagmanager/.test(r.url()))google.push(r.url())});
 await page.goto('/id/');await expect(page.locator('[data-cookie-banner]')).toBeVisible();expect(google).toEqual([]);
 await page.locator('[data-cookie-banner] [data-cookie-preferences]').click();await expect(page.locator('#cookie-preferences')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.locator('#cookie-preferences')).not.toBeVisible();
 await page.locator('[data-consent-accept]').click();await page.reload();await expect(page.locator('[data-cookie-banner]')).not.toBeVisible();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('gp-consent-v1')||'null').analytics)).toBe(true);
 await page.locator('footer [data-cookie-preferences]').click();await page.locator('#analytics-choice').uncheck();await page.locator('[data-consent-save]').click();
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('gp-consent-v1')||'null').analytics)).toBe(false);expect(google).toEqual([]);
});
async function fillForm(page:Page){
 await page.locator('[name=name]').fill('QA Example');await page.locator('[name=company]').fill('QA Test Company');
 await page.locator('[name=email]').fill('qa@example.com');await page.locator('[name=whatsapp]').fill('+628123456789');
 await page.locator('[name=location]').fill('Tangerang');await page.locator('[name=message]').fill('Permintaan pengujian lokal, tanpa pengiriman email.');
 await page.locator('[name=consent]').check();
}
test('form prefill, validation, local SMTP success, focus and cooldown',async({page})=>{
 await page.goto('/id/contact/?service=amdal');await page.locator('[data-consent-reject]').click();
 await expect(page.locator('[name=service]')).toHaveValue('amdal');
 const submit=page.locator('#contact-form button[type=submit]');
 await submit.click();expect(await page.locator('[name=name]').evaluate(el=>(el as HTMLInputElement).validity.valid)).toBe(false);
 await fillForm(page);
 const response=page.waitForResponse(r=>r.url().endsWith('/api/contact/')&&r.request().method()==='POST');await submit.click();expect((await response).status()).toBe(200);
 await expect(page.locator('#contact-success')).toBeVisible();await expect(page.locator('[name=name]')).toHaveValue('');
 await page.keyboard.press('Tab');expect(await page.evaluate(()=>document.querySelector('#contact-success')!.contains(document.activeElement))).toBe(true);
 await page.keyboard.press('Escape');await expect(submit).toBeFocused();
 await fillForm(page);await page.locator('[name=service]').selectOption('amdal');await submit.click();await expect(page.locator('#form-status')).toContainText('Tunggu sebentar');
});
test('form failure preserves values and permits retry',async({page})=>{
 await page.route('**/api/contact/',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({message:'Email belum tersedia. Silakan coba lagi.'})}));
 await page.goto('/id/contact/?service=kkpr');await page.locator('[data-consent-reject]').click();await fillForm(page);await page.locator('#contact-form button[type=submit]').click();
 await expect(page.locator('#form-status')).toContainText('Email belum tersedia');await expect(page.locator('[name=name]')).toHaveValue('QA Example');await expect(page.locator('#contact-form button[type=submit]')).toBeEnabled();
});
test('404 locale and indexing block',async({page,request})=>{
 for(const locale of ['id','en']){const r=await page.goto('/'+locale+'/not-a-real-page/');expect(r?.status()).toBe(404);await expect(page.locator('html')).toHaveAttribute('lang',locale);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex,nofollow');}
 expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
});

test('analytics loads only after consent and excludes form/query data',async({page})=>{
 const google:string[]=[];
 await page.route('https://www.googletagmanager.com/**',route=>{google.push(route.request().url());return route.fulfill({status:200,contentType:'application/javascript',body:''});});
 await page.goto('/id/contact/?service=amdal&email=private-query@example.com');
 expect(google).toEqual([]);
 await page.locator('[data-gtm]').evaluate(el=>(el as HTMLElement).dataset.gtm='GTM-QATEST123');
 await page.locator('[data-consent-accept]').click();
 await expect.poll(()=>google.length).toBe(1);
 await fillForm(page);
 const layer=await page.evaluate(()=>((window as Window&{dataLayer?:unknown[]}).dataLayer||[]));
 expect(JSON.stringify(layer)).not.toMatch(/qa@example|private-query|QA Example|QA Test Company|628123456789|Permintaan pengujian/);
 expect(JSON.stringify(layer)).toContain('contact_form_start');
 const events=layer.filter((v):v is Record<string,unknown>=>!!v&&typeof v==='object');
 for(const event of events)if(event.page_path)expect(event.page_path).toBe('/id/contact/');
});


test('service intent, scenario selection and category navigation',async({page})=>{
 await page.goto('/id/services/');await page.locator('[data-consent-reject]').click();
 await expect(page.locator('[data-service-search]:visible')).toHaveCount(0);
 await page.locator('#service-search').fill('saya mau bangun gudang');await expect(page.locator('[data-service-id="pbg-imb"]')).toBeVisible();await expect(page.locator('[data-service-id="slf"]')).toBeVisible();
 await page.locator('#service-search').fill('KBLI gudang 52101');await expect(page.locator('[data-service-id="slf"]')).toBeVisible();await page.locator('#service-search').fill('klinik');await expect(page.locator('[data-service-id="slf"]')).toBeVisible();
 await page.locator('[data-service-query="papan toko"]').click();await expect(page.locator('#service-search')).toHaveValue('papan toko');await expect(page.locator('[data-service-id="izin-reklame"]')).toBeVisible();
 await page.locator('.category-row').first().click();await expect(page).toHaveURL(/\/id\/services\/reklame\/$/);await expect(page.locator('[data-service-search]:visible')).toHaveCount(6);
});
test('case filters combine and reset without losing case links',async({page})=>{
 await page.goto('/id/projects/');await page.locator('[data-consent-reject]').click();
 await page.locator('#case-service').selectOption('lingkungan');await expect(page.locator('[data-case]:visible')).toHaveCount(1);
 await page.locator('#case-industry').selectOption('Teknologi');await expect(page.locator('#case-empty')).toBeVisible();
 await page.locator('.case-filters button[type=reset]').click();await expect(page.locator('[data-case]:visible')).toHaveCount(6);
 await page.locator('[data-case] h2 a').first().click();await expect(page.locator('.case-hero-image img')).toBeVisible();await expect(page.locator('.permit-pathway li')).toHaveCount(5);
});
test('logo keeps its intrinsic aspect ratio and gallery keyboard works',async({page})=>{
 await page.goto('/id/profile/');await page.locator('[data-consent-reject]').click();
 const logo=await page.locator('.brand-mark').evaluate((img:HTMLImageElement)=>({rendered:img.clientWidth/img.clientHeight,intrinsic:img.naturalWidth/img.naturalHeight}));expect(Math.abs(logo.rendered-logo.intrinsic)).toBeLessThan(.04);
 const gallery=page.locator('.company-gallery__viewport');await gallery.focus();await page.keyboard.press('ArrowRight');await expect(page.locator('.company-gallery__dot').nth(1)).toHaveAttribute('aria-pressed','true');
 await page.goto('/id/');await page.locator('[data-service-carousel] [data-carousel-track]').scrollIntoViewIfNeeded();await page.locator('[data-service-carousel] [data-carousel-next]').click();await expect(page.locator('[data-service-carousel] [data-carousel-status]')).toHaveText('2 / 6');await page.locator('[data-service-carousel] [data-carousel-track]').focus();await page.keyboard.press('ArrowLeft');await expect(page.locator('[data-service-carousel] [data-carousel-status]')).toHaveText('1 / 6');
});
