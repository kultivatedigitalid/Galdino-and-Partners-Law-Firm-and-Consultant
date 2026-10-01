import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const paths=['/id/','/id/profile/','/id/profile/hans-galdino/','/id/services/','/id/services/reklame/','/id/services/lingkungan/','/id/services/lingkungan/amdal/','/id/industries/','/id/industries/developer-properti/','/id/projects/','/id/projects/aruna-pangan/','/id/blog/','/id/blog/apa-itu-pbg/','/id/contact/','/id/privacy/','/en/services/','/en/contact/'];
const consent={version:1,analytics:false,time:Date.now()};
for(const width of [320,375,430,768,900,1024,1280,1440,1920]){
 test('responsive '+width,async({page},testInfo)=>{
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
   if([375,1440].includes(width)&&['/id/','/id/services/','/id/industries/','/id/projects/','/id/contact/','/id/profile/'].includes(path)){await page.locator('img').evaluateAll(async (images:HTMLImageElement[])=>{images.forEach(img=>img.loading='eager');await Promise.all(images.map(img=>img.decode()));});await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));await page.screenshot({path:testInfo.outputPath(path.split('/').filter(Boolean).join('-')+'-'+width+'.png'),fullPage:true,animations:'disabled'});}
  }
  expect(errors).toEqual([]);
 });
}
for(const path of ['/id/','/id/profile/','/id/profile/hans-galdino/','/id/projects/','/id/industries/','/id/services/','/id/services/lingkungan/amdal/','/id/industries/developer-properti/','/id/projects/aruna-pangan/','/id/blog/','/id/blog/apa-itu-pbg/','/id/contact/','/en/contact/']){
 test('accessibility '+path,async({page})=>{
  await page.goto(path);await page.evaluate(()=>document.fonts.ready);
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  expect(results.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
 });
}
test('nested navigation, language pair and mobile menu',async({page})=>{
 await page.setViewportSize({width:375,height:900});await page.goto('/id/services/lingkungan/amdal/');
 await page.locator('[data-consent-reject]').click();
 await expect(page.locator('.ed-breadcrumb')).toHaveCount(0);
 await page.locator('.menu-toggle').click();await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded','true');
 await page.getByRole('link',{name:'Switch to English'}).click();
 await expect(page).toHaveURL(/\/en\/services\/environmental-approvals\/environmental-impact-assessment\/$/);
 await page.locator('.menu-toggle').click();await page.keyboard.press('Escape');await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded','false');
});
test('insight search supports multiple terms and reset',async({page})=>{
 await page.goto('/id/blog/');await page.locator('[data-consent-reject]').click();
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


test('services show direct category links with search hidden and no numbering',async({page})=>{
 await page.goto('/id/services/');await page.locator('[data-consent-reject]').click();
 await expect(page.locator('#service-search')).toHaveCount(0);await expect(page.locator('.category-number,.service-number')).toHaveCount(0);
 await expect(page.locator('.category-services a')).toHaveCount(38);
 await page.setViewportSize({width:375,height:1000});const processCopy=await page.locator('.process-rail li>div').first().boundingBox();expect(processCopy!.width).toBeGreaterThan(280);
 await page.locator('.category-row').first().click();await expect(page).toHaveURL(/\/id\/services\/reklame\/$/);await expect(page.locator('[data-service-search]:visible')).toHaveCount(6);
 await expect(page.locator('.service-number')).toHaveCount(0);
});
test('case filters combine and reset without losing case links',async({page})=>{
 await page.goto('/id/projects/');await page.locator('[data-consent-reject]').click();
 await page.locator('#case-service').selectOption('lingkungan');await expect(page.locator('[data-case]:visible')).toHaveCount(1);
 await page.locator('#case-industry').selectOption('Teknologi');await expect(page.locator('#case-empty')).toBeVisible();
 await page.locator('.case-filters button[type=reset]').click();await expect(page.locator('[data-case]:visible')).toHaveCount(6);
 await page.locator('[data-case] h2 a').first().click();await expect(page.locator('.image-hero img')).toBeVisible();await expect(page.locator('.permit-pathway li')).toHaveCount(5);
});
test('logo keeps its intrinsic aspect ratio and gallery keyboard works',async({page})=>{
 await page.goto('/id/profile/');await page.locator('[data-consent-reject]').click();
 const logo=await page.locator('.brand-mark').evaluate((img:HTMLImageElement)=>({rendered:img.clientWidth/img.clientHeight,intrinsic:img.naturalWidth/img.naturalHeight}));expect(Math.abs(logo.rendered-logo.intrinsic)).toBeLessThan(.04);
 const gallery=page.locator('.company-gallery__viewport');await gallery.focus();await page.keyboard.press('ArrowRight');await expect(page.locator('.company-gallery__dot').nth(1)).toHaveAttribute('aria-pressed','true');
 await page.goto('/id/');await page.locator('[data-service-carousel] [data-carousel-track]').scrollIntoViewIfNeeded();await page.locator('[data-service-carousel] [data-carousel-next]').click();await expect(page.locator('[data-service-carousel] [data-carousel-status]')).toHaveText('2 / 6');await page.locator('[data-service-carousel] [data-carousel-track]').focus();await page.keyboard.press('ArrowLeft');await expect(page.locator('[data-service-carousel] [data-carousel-status]')).toHaveText('1 / 6');
});

test('service category photos have centered editorial crops',async({page})=>{
 await page.goto('/id/services/reklame/');await page.locator('[data-consent-reject]').click();
 const images=page.locator('.service-photo');await expect(images).toHaveCount(6);
 await images.evaluateAll(async(images:HTMLImageElement[])=>{for(const img of images){img.loading='eager';await img.decode();if(!img.naturalWidth||!img.alt)throw Error('Missing activity photo');if(getComputedStyle(img).objectFit!=='cover'||getComputedStyle(img).objectPosition!=='50% 50%')throw Error('Photo is not fully centered');}});
});
test('mega menu opens direct service links and supports keyboard and outside click',async({page},testInfo)=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.setViewportSize({width:1440,height:1000});await page.goto('/id/');await page.locator('[data-consent-reject]').click();
 const trigger=page.locator('.services-nav summary');await trigger.focus();await page.keyboard.press('Enter');
 await expect(page.locator('.service-mega')).toBeVisible();await expect(page.locator('.mega-category')).toHaveCount(6);await expect(page.locator('.mega-grid li a')).toHaveCount(38);
 expect(await page.locator('.service-mega').evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);
 expect((await page.locator('.service-mega').boundingBox())!.height).toBeLessThanOrEqual(500);
 await expect(page.locator('.nav-backdrop')).toHaveAttribute('data-open','true');expect(await page.locator('.nav-backdrop').evaluate(el=>getComputedStyle(el).backdropFilter)).toContain('blur');
 const arrow=await page.locator('.nav-chevron').boundingBox(),summary=await trigger.boundingBox();expect(Math.abs(arrow!.y+arrow!.height/2-summary!.y-summary!.height/2)).toBeLessThan(2);
 const scan=await new AxeBuilder({page}).include('.site-header').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(scan.violations).toEqual([]);
 await page.screenshot({path:testInfo.outputPath('mega-menu-1440.png')});
 await page.keyboard.press('Escape');await expect(page.locator('.nav-backdrop')).toHaveAttribute('data-open','false');await expect(page.locator('.service-mega')).not.toBeVisible();await expect(trigger).toBeFocused();
 await trigger.click();await page.mouse.click(20,150);await expect(page.locator('.service-mega')).not.toBeVisible();
 await trigger.click();await page.locator('.mega-grid a[href="/id/services/bangunan-konstruksi/slf/"]').click();await expect(page).toHaveURL(/\/id\/services\/bangunan-konstruksi\/slf\/$/);
 await page.setViewportSize({width:375,height:900});await page.goto('/id/');await page.locator('.menu-toggle').click();await trigger.click();
 await expect(page.locator('.service-mega')).toBeVisible();await page.locator('.mega-grid a[href="/id/services/lingkungan/amdal/"]').click();await expect(page).toHaveURL(/\/id\/services\/lingkungan\/amdal\/$/);
});
test('directory works without JavaScript and legacy environmental routes redirect',async({browser,request})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('/id/services/');
 await expect(page.locator('.category-block')).toHaveCount(6);await expect(page.locator('.category-services a')).toHaveCount(38);
 await expect(page.getByRole('heading',{name:'Bidang usaha',exact:true})).toBeVisible();
 await page.locator('.category-services a[href="/id/services/lingkungan/amdal/"]').click();await expect(page.locator('h1')).toHaveText('Jasa AMDAL');await context.close();
 for(const [old,target] of [
 ['/id/profile/how-we-work/','/id/#why-galdino-title'],
 ['/en/profile/how-we-work/','/en/#why-galdino-title'],
 ['/id/services/lingkungan/dokumen-lingkungan/amdal/','/id/services/lingkungan/amdal/'],
 ['/id/services/lingkungan/dokumen-lingkungan/','/id/services/lingkungan/#dokumen-lingkungan'],
 ['/en/services/environmental-approvals/environmental-documents/environmental-impact-assessment/','/en/services/environmental-approvals/environmental-impact-assessment/']
 ]){
 const response=await request.get(old+'?source=legacy',{maxRedirects:0});expect(response.status()).toBe(301);
 const expected=new URL(target,'https://galdino.co.id');expected.search='?source=legacy';
 expect(response.headers().location).toBe(expected.pathname+expected.search+expected.hash);expect((await request.get(response.headers().location)).status()).toBe(200);
 }
});
test('single-image banners meet the navbar and industries form an equal three-column grid',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.addInitScript(v=>localStorage.setItem('gp-consent-v1',JSON.stringify(v)),consent);
 for(const path of ['/id/services/','/id/industries/','/id/projects/','/id/blog/']){
 await page.goto(path);await expect(page.locator('.image-hero')).toHaveCount(1);await expect(page.locator('.image-hero img')).toHaveCount(1);
 expect((await page.locator('.image-hero').boundingBox())?.y).toBe(0);
 await expect(page.locator('.site-header')).toHaveClass(/site-header--immersive/);expect(await page.locator('.site-header').evaluate(el=>getComputedStyle(el).position)).toBe('fixed');
 }
 await page.goto('/id/industries/');const boxes=await page.locator('.industry-tile').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width}}));
 expect(boxes).toHaveLength(6);expect(boxes[0].y).toBe(boxes[1].y);expect(boxes[1].y).toBe(boxes[2].y);expect(boxes[3].y).toBe(boxes[4].y);expect(boxes[4].y).toBe(boxes[5].y);
 for(const b of boxes)expect(Math.abs(b.width-boxes[0].width)).toBeLessThan(1);
 await expect(page.locator('.regulatory-section')).toHaveCSS('background-color','rgb(11, 11, 12)');
 await expect(page.locator('.regulatory-section h2')).toHaveCSS('color','rgb(255, 255, 255)');
 await expect(page.locator('.regulatory-section .permit-pathway--dark h3').first()).toHaveCSS('color','rgb(255, 255, 255)');
 await expect(page.locator('main')).not.toContainText('Sorotan industri');await expect(page.locator('main .related-cases')).toHaveCount(0);await expect(page.locator('main')).not.toContainText('Insights');
 await page.goto('/id/services/');for(const removed of ['Enam bidang, satu konteks usaha.','Konteks industri','Insights'])await expect(page.locator('main')).not.toContainText(removed);
});

test('brand headings, image framing, navigation and featured sections stay consistent',async({page},testInfo)=>{
 await page.setViewportSize({width:1440,height:1000});await page.addInitScript(v=>localStorage.setItem('gp-consent-v1',JSON.stringify(v)),consent);
 const headings:string[]=[];
 for(const locale of ['id','en']){
 for(const route of ['', 'profile/', 'services/', 'industries/', 'projects/', 'blog/']){
  await page.goto('/'+locale+'/'+route);
  const hero=page.locator('.home-hero,.profile-hero,.image-hero');expect((await hero.boundingBox())!.height).toBeGreaterThanOrEqual(route===''?903:route==='profile/'?815:999);
  const heroImg=hero.locator('img').first();expect(await heroImg.evaluate(el=>getComputedStyle(el).objectFit)).toBe(route===''?'contain':'cover');const unfilled=await page.locator('.case-photo img,.related-cases img,.ed-figure img,.company-gallery__slide img,.work-collage img').evaluateAll(images=>images.filter(img=>getComputedStyle(img).objectFit!=='cover').length);expect(unfilled).toBe(0);
  const menu=await page.locator('.nav-menu').boundingBox();expect(Math.abs(menu!.x+menu!.width/2-720)).toBeLessThan(2);await expect(page.locator('.nav-cta')).toHaveCSS('border-top-left-radius','4px');
  if(route===''){await expect(hero).toHaveCSS('background-color','rgb(244, 243, 241)');await expect(page.locator('.home-hero__copy')).toHaveCSS('text-align','center');await expect(page.locator('.home-hero__actions a')).toHaveCount(1);await expect(page.locator('.home-hero__actions a')).toHaveAttribute('href','/'+locale+'/contact/');await expect(page.locator('.home-hero__portrait')).toHaveCount(4);await expect(page.locator('.client-register')).toHaveCount(0);await expect(page.locator('.site-header')).not.toHaveClass(/site-header--immersive/);}
  if(route===''){await hero.locator('img').evaluateAll(async(images:HTMLImageElement[])=>Promise.all(images.map(img=>img.decode())));await page.screenshot({path:testInfo.outputPath(locale+'-home-hero-1440.png'),animations:'disabled'});}
  if(!['','profile/'].includes(route)){await expect(heroImg).toHaveAttribute('src',/hero-/);expect(await heroImg.evaluate(el=>getComputedStyle(el).objectPosition)).toBe('50% 50%');}
  headings.push(await page.locator('h1').evaluate(el=>{const c=getComputedStyle(el);return [c.fontFamily,c.fontSize,c.fontWeight,c.letterSpacing,c.lineHeight].join('|')}));
  await expect(page.locator('.nav-link[href="/'+locale+'/projects/"]')).toHaveText('Our Experiences');
  await expect(page.locator('.nav-link[href="/'+locale+'/profile/"]')).toHaveText('About Us');
  await expect(page.locator('.nav-link[href="/'+locale+'/contact/"]')).toHaveCount(0);
  await expect(page.locator('a[href*="profile/how-we-work"]')).toHaveCount(0);
  const badImages=await page.locator('main img:not(.home-hero img):not(.profile-hero img):not(.image-hero img)').evaluateAll(images=>images.filter(img=>{const c=getComputedStyle(img);return c.objectPosition!=='50% 50%'}).length);expect(badImages).toBe(0);
 }
 }
 expect(new Set(headings).size).toBe(1);
 await page.setViewportSize({width:375,height:900});
 for(const locale of ['id','en']){await page.goto('/'+locale+'/');await page.locator('.home-hero img').evaluateAll(async(images:HTMLImageElement[])=>Promise.all(images.map(img=>img.decode())));await page.screenshot({path:testInfo.outputPath(locale+'-home-hero-375.png'),animations:'disabled'});}
 await page.setViewportSize({width:375,height:1000});
 for(const route of ['projects/']){await page.goto('/id/'+route);await page.locator('.image-hero img').evaluate((img:HTMLImageElement)=>img.decode());expect(await page.locator('.image-hero img').evaluate((img:HTMLImageElement)=>img.currentSrc)).toContain('hero-experiences-user-v2');}
 await page.setViewportSize({width:1440,height:1000});
 await page.goto('/id/');await expect(page.locator('#why-galdino-title')).toHaveText('Kenapa Galdino & Partner');
 await expect(page.locator('.why-section')).toHaveCSS('background-color','rgb(11, 11, 12)');
 await expect(page.locator('.why-point')).toHaveCount(4);
 for(const route of ['services/','projects/']){
  await page.goto('/id/'+route);expect(await page.locator('.process-section').evaluate(el=>getComputedStyle(el).backgroundColor)).toBe('rgb(11, 11, 12)');
  expect(await page.locator('.process-section .home-kicker').evaluate(el=>getComputedStyle(el,'::before').content)).toBe('""');
 }
 await page.goto('/id/projects/');await expect(page.locator('main')).not.toContainText('Jelajahi konteksnya');
 const cards=await page.locator('.case-entry:not(.featured)').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {y:r.y,width:r.width}}));
 expect(cards[0].y).toBe(cards[1].y);expect(cards[1].y).toBe(cards[2].y);for(const card of cards)expect(Math.abs(card.width-cards[0].width)).toBeLessThan(1);
 expect((await page.locator('.featured .case-photo').boundingBox())!.height).toBeLessThanOrEqual(353);
 expect(await page.locator('.case-entry.featured').evaluate(el=>getComputedStyle(el).backgroundColor)).toBe('rgb(236, 235, 234)');
 await page.goto('/id/blog/');expect(await page.locator('.featured-insight').evaluate(el=>getComputedStyle(el).backgroundColor)).toBe('rgb(236, 235, 234)');
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.services-nav summary').click();await expect(page.locator('.service-mega')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('.service-mega')).not.toBeVisible();
});

test('main hero consultation paths and complete category cards',async({page})=>{
 for(const locale of ['id','en']){
  for(const route of ['services/','industries/','projects/','blog/']){
   await page.goto('/'+locale+'/'+route);await expect(page.locator('.image-hero__kicker')).toBeVisible();await expect(page.locator('.image-hero__cta')).toHaveAttribute('href','/'+locale+'/contact/');await expect(page.locator('.ed-breadcrumb')).toHaveCount(0);
  }
  for(const route of locale==='id'?['reklame','tata-ruang','bangunan-konstruksi','lingkungan','lalu-lintas-akses','iso']:['advertising-permits','spatial-planning','buildings-construction','environmental-approvals','traffic-road-access','iso-management-systems']){
   await page.goto('/'+locale+'/services/'+route+'/');await expect(page.locator('.category-process .permit-pathway li')).toHaveCount(4);await expect(page.locator('.category-process')).toHaveCSS('background-color','rgb(11, 11, 12)');await expect(page.locator('.related-cases')).toHaveCount(0);
   await page.setViewportSize({width:1440,height:1000});const boxes=await page.locator('.service-entry').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().y));expect(boxes[0]).toBe(boxes[1]);expect(new Set(boxes).size).toBe(Math.ceil(boxes.length/2));await expect(page.locator('.service-entry .service-copy p').first()).toBeVisible();await expect(page.locator('.service-entry .service-bottom strong').first()).toBeVisible();await expect(page.locator('.split-hero .ed-button')).toHaveAttribute('href','#services-in-category');
   const faq=page.locator('.ed-details').first();await faq.locator('summary').click();await expect(faq).toHaveAttribute('open','');await faq.locator('summary').click();await expect(faq).not.toHaveAttribute('open','');
  }
 }
});

test('split detail heroes, compact profiles and contact follow the revised structure',async({page},testInfo)=>{
 await page.addInitScript(v=>localStorage.setItem('gp-consent-v1',JSON.stringify(v)),consent);
 for(const locale of ['id','en']){
  for(const route of locale==='id'?['services/reklame/','services/reklame/pajak-reklame/','industries/developer-properti/']:['services/advertising-permits/','services/advertising-permits/advertising-tax/','industries/property-developers/']){
   await page.goto('/'+locale+'/'+route);await expect(page.locator('.split-hero img')).toBeVisible();await expect(page.locator('.split-hero')).toHaveCSS('background-color','rgb(255, 255, 255)');await expect(page.locator('.site-header')).not.toHaveClass(/site-header--immersive/);await expect(page.locator('.context-section .ed-button')).toHaveAttribute('href',new RegExp('/'+locale+'/contact/'));const href=await page.locator('.split-hero .ed-button').getAttribute('href');await page.locator('.split-hero .ed-button').click();await expect(page.locator(href!)).toBeInViewport();
   if(route.includes('pajak-reklame/')||route.includes('advertising-tax/')){const sections=await page.locator('.context-section,#service-estimates,#service-scope').evaluateAll(els=>els.map(el=>el.id||'context'));expect(sections).toEqual(['context','service-estimates','service-scope']);await expect(page.locator('#service-estimates>.ed-note')).toHaveCount(1);const list=page.locator('#service-scope .ed-list').first();await expect(list).toHaveCSS('list-style-type','disc');await page.locator('#service-estimates').screenshot({path:testInfo.outputPath(locale+'-service-estimates-1440.png')});}
   if(route.startsWith('industries/')){await expect(page.locator('main')).not.toContainText(locale==='id'?'Mulai percakapan':'Start a conversation');await expect(page.locator('.dark-map')).toHaveCSS('background-color','rgb(11, 11, 12)');await expect(page.locator('.related-cases,.related-insights')).toHaveCount(0);}
  }
  await page.goto('/'+locale+'/contact/');await expect(page.locator('.image-hero')).toHaveCount(0);await expect(page.locator('.site-header')).toBeVisible();await expect(page.locator('#contact-form')).toBeVisible();const copy=await page.locator('.contact-copy').boundingBox(),form=await page.locator('#contact-form').boundingBox();expect(copy!.x).toBeLessThan(form!.x);await expect(page.locator('.contact-next-steps li')).toHaveCount(6);await expect(page.locator('#contact-next-title')).toHaveText(locale==='id'?'Apa yang Selanjutnya Terjadi?':'What Happens Next?');
  await page.goto('/'+locale+'/profile/hans-galdino/');await expect(page.locator('h1')).toHaveText('Hans Galdino');await expect(page.locator('.image-hero')).toHaveCount(0);await expect(page.locator('.related-insights')).toHaveCount(0);const header=await page.locator('.site-header').boundingBox(),intro=await page.locator('.person-hero__copy').boundingBox();expect(intro!.y-header!.height).toBeLessThan(100);
  await page.goto('/'+locale+'/profile/');await expect(page.locator('.principles li')).toHaveCount(4);await expect(page.locator('.profile-company__registry')).toHaveCount(0);await expect(page.locator('.related-cases article')).toHaveCount(2);await expect(page.locator('.work-collage figure')).toHaveCount(8);expect((await page.locator('.founder-note').boundingBox())!.height).toBeLessThan(900);await page.locator('.founder-note img,.work-collage img').evaluateAll(async(images:HTMLImageElement[])=>{images.forEach(img=>img.loading='eager');await Promise.all(images.map(img=>img.decode()));});await page.locator('.founder-note').screenshot({path:testInfo.outputPath(locale+'-founder-note-1440.png')});await page.locator('.inside-work').screenshot({path:testInfo.outputPath(locale+'-work-collage-1440.png')});await page.setViewportSize({width:375,height:900});await page.goto('/'+locale+'/profile/');expect((await page.locator('.founder-note').boundingBox())!.height).toBeLessThan(820);await page.locator('.founder-note img').evaluate((img:HTMLImageElement)=>img.decode());await page.locator('.founder-note').screenshot({path:testInfo.outputPath(locale+'-founder-note-375.png')});await page.locator('.work-collage img').evaluateAll(async(images:HTMLImageElement[])=>{images.forEach(img=>img.loading='eager');await Promise.all(images.map(img=>img.decode()));});await page.locator('.inside-work').screenshot({path:testInfo.outputPath(locale+'-work-collage-375.png')});await page.setViewportSize({width:1440,height:1000});
 }
 for(const route of ['services/iso/','industries/developer-properti/','profile/hans-galdino/','blog/apa-itu-pbg/']){await page.goto('/id/'+route);await page.locator('img').evaluateAll(async(images:HTMLImageElement[])=>{images.forEach(img=>img.loading='eager');await Promise.all(images.map(img=>img.decode()));});await page.screenshot({path:testInfo.outputPath('id-'+route.replaceAll('/','-')+'1440.png'),fullPage:true,animations:'disabled'});}
 await page.goto('/id/blog/apa-itu-pbg/');await expect(page.locator('.article-header h1')).toBeVisible();await expect(page.locator('main')).not.toContainText('menit baca');await expect(page.locator('.article-body .ed-toc')).toBeVisible();
 await page.goto('/id/industries/');await expect(page.locator('.sector-index,.tile-image span')).toHaveCount(0);
 await page.goto('/id/services/');await expect(page.locator('.photo-number,.category-photo figcaption')).toHaveCount(0);
 await page.emulateMedia({reducedMotion:'no-preference'});const link=page.locator('.category-all').first();await link.hover();await expect(link).toHaveCSS('transform','matrix(1, 0, 0, 1, 0, -2)');
});

test('experience details describe the actual challenge without an insights segment',async({page})=>{
 for(const locale of ['id','en']){
  for(const slug of ['aruna-pangan','nusa-teknologi','prima-distribusi','vertex-konstruksi','lintas-logistik','karya-properti']){
   await page.goto('/'+locale+'/projects/'+slug+'/');
   await expect(page.locator('.related-insights')).toHaveCount(0);
   await expect(page.getByRole('heading',{name:locale==='id'?'Lihat Kasus Lainnya':'View Other Cases',exact:true})).toBeVisible();
   await expect(page.locator('main')).not.toContainText(locale==='id'?'Membaca kebutuhan sebelum menentukan langkah.':'Understand the need before deciding the next step.');
   if(slug==='nusa-teknologi')await expect(page.getByRole('heading',{name:locale==='id'?'Dokumen Keamanan Informasi Tersebar.':'Information Security Records Were Scattered.',exact:true})).toBeVisible();
  }
 }
});
