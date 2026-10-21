import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.WB_PLAYWRIGHT_MODULE||'playwright');
const output=new URL('../qa/information-list-empty-20261019-v1635/',import.meta.url);
await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
const errors=[],states=[];
page.on('pageerror',e=>errors.push(e.message));
try {
 await page.goto(new URL('../index.html#aipaas-information-list',import.meta.url).href);
 for(const [width,height] of [[1440,900],[1024,768],[658,800],[390,844]]) {
  await page.setViewportSize({width,height});
  for(const language of ['zh','en']) {
   await page.locator(`[data-language-choice="${language}"]`).click();
   for(const theme of ['light','dark']) {
    await page.locator(`[data-theme-choice="${theme}"]`).click();
    for(const style of ['rich','minimal']) {
     await page.locator(`[data-style-choice="${style}"]`).click();
     for(const palette of ['classic','spruce','coral','iris','rose','graphite']) {
      await page.locator('[data-palette-trigger]').click();
      await page.locator(`[data-color-choice="${palette}"]`).click();
      const card=page.locator('[data-info-list-type="empty"]');
      assert.equal(await card.locator('p').textContent(),language==='zh'?'暂无数据':'No data yet');
      assert.equal(await card.locator('[role="status"]').getAttribute('data-wb-field-label'),language==='zh'?'记录数':'Record count');
      assert.equal(await card.locator('button,.wb-info-list-count,.wb-info-list-item').count(),0);
      const measured=await card.evaluate(card=>{
       const icon=card.querySelector('svg'),s=getComputedStyle(icon);
       return {overflow:document.documentElement.scrollWidth-innerWidth,bad:[card,...card.querySelectorAll('*')].filter(e=>e.clientWidth&&e.scrollWidth>e.clientWidth+1).length,icon:[icon.getBoundingClientRect().width,icon.getBoundingClientRect().height],fill:s.fill,hidden:icon.getAttribute('aria-hidden')};
      });
      assert(measured.overflow<=1);assert.equal(measured.bad,0);assert.deepEqual(measured.icon,[40,40]);assert.equal(measured.fill,'none');assert.equal(measured.hidden,'true');
      states.push({width,language,theme,style,palette,...measured});
      if(language==='zh'&&style==='rich'&&palette==='classic') await page.locator('[data-info-list-empty-example]').screenshot({path:fileURLToPath(new URL(`${width}-${theme}.png`,output))});
     }
    }
   }
  }
 }
 assert.deepEqual(errors,[]);
 await fs.writeFile(new URL('report.json',output),JSON.stringify({states,errors},null,2));
 console.log(JSON.stringify({states:states.length,errors}));
} finally {await browser.close();}
