import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.WB_PLAYWRIGHT_MODULE || 'playwright');
const library = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const output = path.join(library, 'qa/ai-assistance-20261019-v1634');
await fs.mkdir(output, {recursive:true});
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
const report={states:[], interactions:[],errors};
try {
const source=await fs.readFile(path.join(library,'index.html'),'utf8');
const sample=source.split('data-ai-assistance-example')[1].split(' </article></div>')[0];
assert(!sample.includes('data-assistance-filter'));
assert(!sample.includes('data-assistance-state="processed"'));
assert(!sample.includes('visit-approval'));
await page.goto(pathToFileURL(path.join(library,'index.html')).href+'#aipaas-information-list');
const card=page.locator('.wb-ai-assistance-card');
const count=card.locator('[data-assistance-count]');
assert.equal(await card.locator('[data-assistance-filters],[data-assistance-filter],.wb-filter-segmented,[role="tab"]').count(),0);
assert.equal(await card.locator('[data-assistance-state]').count(),2);
assert.equal(await card.locator('[data-assistance-state="pending"]').count(),2);
assert.equal(await count.count(),1);
assert.equal(await count.textContent(),'2');
assert.equal(await card.locator('.wb-ai-assistance-item-top .wb-status-tag').count(),0);
assert.equal(await card.locator('.wb-ai-assistance-pending-dot').count(),2);
assert.equal(await card.locator('.wb-ai-assistance-agent.wb-status-tag.is-neutral').count(),2);
assert.deepEqual(await card.locator('.wb-ai-assistance-origin:has(.wb-ai-assistance-agent)').allInnerTexts(),['销售助手','ERP集成助手']);
await card.locator('button').first().focus();await page.keyboard.press('Enter');assert(await page.locator('#library-toast').isVisible());
assert.equal(await card.locator('[data-assistance-state]').count(),2);
report.interactions.push('Source and DOM contain only two pending notifications, one title count and no filters/processed data; keyboard Handle reports the unconnected-service boundary without changing records.');
for (const size of [{width:1440,height:900},{width:1024,height:768},{width:658,height:800},{width:390,height:844}]) {
 await page.setViewportSize(size);
 for(const language of ['zh','en']) {
  await page.locator(`[data-language-choice="${language}"]`).click();
  assert.equal(await card.locator('[data-wb-field-key="conversation-title"]').first().getAttribute('data-wb-field-label'),language==='en'?'Conversation':'来源对话');
  assert.equal(await count.getAttribute('data-wb-field-label'),language==='en'?'Pending count':'待处理条数');
  assert.equal(await count.textContent(),'2');
  for(const theme of ['light','dark']) {
   await page.locator(`[data-theme-choice="${theme}"]`).click();
   for(const style of ['rich','minimal']) {
    await page.locator(`[data-style-choice="${style}"]`).click();
    for(const palette of ['classic','spruce','coral','iris','rose','graphite']) {
     await page.locator('[data-palette-trigger]').click();await page.locator(`[data-color-choice="${palette}"]`).click();
     const measured=await card.evaluate(e=>({overflow:document.documentElement.scrollWidth-innerWidth,bad:[e,...e.querySelectorAll('*')].filter(n=>n.getBoundingClientRect().width&&n.scrollWidth>n.clientWidth+1).map(n=>n.className),buttons:[...e.querySelectorAll('.wb-inline-action')].map(n=>n.getBoundingClientRect().height),bg:getComputedStyle(e).backgroundColor,
      actionColors:[...e.querySelectorAll('.wb-inline-action')].map(n=>({bg:getComputedStyle(n).backgroundColor,fg:getComputedStyle(n).color})),
      dividers:[...e.querySelectorAll('[data-assistance-state]')].map(n=>({width:getComputedStyle(n).borderBottomWidth,style:getComputedStyle(n).borderBottomStyle,color:getComputedStyle(n).borderBottomColor})),
      sharedDivider:getComputedStyle(document.querySelector('.wb-info-list-item')).borderBottomColor,
      header:(()=>{const head=e.querySelector('header'),title=head.querySelector('h2'),count=head.querySelector('[data-assistance-count]');return {titleBottom:title.getBoundingClientRect().bottom,countTop:count.getBoundingClientRect().top,countRight:count.getBoundingClientRect().right,headRight:head.getBoundingClientRect().right,weight:Number(getComputedStyle(count).fontWeight)};})()}));
     assert.equal(measured.overflow,0);assert.deepEqual(measured.bad,[]);assert(measured.buttons.every(h=>h===32));
     assert(measured.actionColors.every(c=>c.bg!=='rgba(0, 0, 0, 0)'&&c.bg!==measured.bg&&c.fg==='rgb(255, 255, 255)'));
     assert(measured.dividers.every(n=>n.width==='1px'&&n.style==='solid'&&n.color===measured.sharedDivider));
     assert(Math.abs(measured.header.countRight-measured.header.headRight)<1);
     assert(measured.header.countTop<measured.header.titleBottom&&measured.header.weight>=700);
     report.states.push({size,language,theme,style,palette,...measured});
    }
   }
  }
 }
 await page.locator('[data-language-choice="zh"]').click();await page.locator('[data-style-choice="rich"]').click();
 await page.locator('[data-palette-trigger]').click();await page.locator('[data-color-choice="classic"]').click();
 for(const theme of ['light','dark']) {
  await page.locator(`[data-theme-choice="${theme}"]`).click();
  await card.screenshot({path:path.join(output,`${size.width}-${theme}.png`)});
 }
}
await card.locator('[data-assistance-state]').first().evaluate(e=>e.dataset.assistanceState='processed');
await page.waitForFunction(()=>document.querySelector('[data-assistance-count]').dataset.wbValue==='1');
assert.equal(await card.locator('[data-assistance-state="processed"]').count(),0);
assert.equal(await card.locator('[data-assistance-state]').count(),1);
await card.locator('[data-assistance-state]').evaluateAll(es=>es.forEach(e=>e.remove()));
await page.waitForFunction(()=>document.querySelector('[data-assistance-count]').dataset.wbValue==='0');
assert(await count.isHidden());assert(await card.locator('[data-assistance-empty]').isVisible());
assert.equal(await card.locator('[data-assistance-empty]').textContent(),'暂无需要你处理的AI通知');
await page.locator('[data-language-choice="en"]').click();
assert.equal(await card.locator('[data-assistance-empty]').textContent(),'No AI notifications need your attention.');
assert(await count.isHidden());
report.interactions.push('Processed status removes the record from DOM and decrements the single count; empty queues hide count 0 and display the bilingual pending-only empty state. 192 layout states cover six palettes, both languages/themes/styles and four viewports.');
assert.deepEqual(errors,[]);
await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({states:report.states.length,interactions:report.interactions,errors}));
} finally {await browser.close();}
