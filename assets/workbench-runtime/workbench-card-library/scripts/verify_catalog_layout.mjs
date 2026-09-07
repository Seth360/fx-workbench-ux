#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.WB_PLAYWRIGHT_MODULE || 'playwright');
const library = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(process.argv[2] || path.join(library,'qa/catalog-layout-20260907'));
await fs.mkdir(output,{recursive:true});
const browser = await chromium.launch({headless:true});
const context = await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const page = await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const report={states:[],interactions:[],errors};
try {
await page.goto(pathToFileURL(path.join(library,'index.html')).href);
assert.equal(await page.locator('.wb-library-item').count(),9);
for(const size of (process.env.WB_SKIP_MATRIX?[]:[{width:1440,height:900},{width:1024,height:768},{width:390,height:844}])) {
  await page.setViewportSize(size);
  for(const language of ['zh','en']) {
    await page.locator(`[data-language-choice="${language}"]`).click();
    for(const theme of ['light','dark']) {
      await page.locator(`[data-theme-choice="${theme}"]`).click();
      for(const style of ['rich','minimal']) {
        await page.locator(`[data-style-choice="${style}"]`).click();
        for(const palette of ['classic','spruce','coral','indigo','rose','graphite']) {
          await page.locator('[data-palette-trigger]').click();
          await page.locator(`[data-color-choice="${palette}"]`).click();
          const measured=await page.evaluate(()=>({
            overflow:document.documentElement.scrollWidth-innerWidth,
            bad:[...document.querySelectorAll('.wb-library-item,[data-wb-grid-key],.wb-library-preview,.wb-card,.wb-metric,.catalog-density-grid')].filter(e=>e.getBoundingClientRect().width&&e.scrollWidth>e.clientWidth+1).map(e=>e.id||e.className),
            semantics:[...document.querySelectorAll('[data-wb-semantic]')].filter(e=>!e.dataset.wbComponent||!(e.getAttribute('aria-label')||e.getAttribute('aria-labelledby'))).length,
            controls:[...document.querySelectorAll('.wb-page-period,.wb-select.wb-page-filter')].map(e=>e.getBoundingClientRect().height),
            quick:[...document.querySelectorAll('.wb-quick-card')].map(e=>e.getBoundingClientRect().height),
            rows:[...document.querySelectorAll('.wb-compact-row')].map(e=>e.getBoundingClientRect().height),
            tone:getComputedStyle(document.querySelector('.wb-metric.is-orange')).getPropertyValue('--wb-tone').trim(),
            orange:getComputedStyle(document.documentElement).getPropertyValue('--wb-orange').trim()
          }));
          report.states.push({size,language,theme,style,palette,...measured});
          assert.equal(measured.overflow,0,JSON.stringify(report.states.at(-1)));
          assert.deepEqual(measured.bad,[]);assert.equal(measured.semantics,0);
          assert(measured.controls.every(h=>h===32));assert(measured.quick.every(h=>h===64));assert(measured.rows.every(h=>h===32));assert.equal(measured.tone,measured.orange);
        }
      }
    }
  }
}
await page.locator('[data-language-choice="en"]').click();
report.interactions.push(`${report.states.length} viewport/language/theme/style/palette states: no page, card or registered-grid overflow; 32px controls and semantic metadata valid`);
await page.setViewportSize({width:1440,height:900});
await page.locator('[data-library-filter="insights"]').click();assert.equal(await page.locator('.wb-library-item:visible').count(),3);
const bottoms=await page.locator('#metric-card-example > .wb-library-preview,#analysis-card-example > .wb-library-preview').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().bottom));assert(Math.abs(bottoms[0]-bottoms[1])<1);
await page.locator('[data-library-filter="all"]').click();
await page.locator('#library-search').fill('data-table');assert.equal(await page.locator('.wb-library-item:visible').count(),1);assert(await page.locator('#risk-table-example').isVisible());
await page.locator('#library-search').fill('does-not-exist-4585');assert(await page.locator('#library-empty').isVisible());
await page.locator('#library-reset').click();assert.equal(await page.locator('.wb-library-item:visible').count(),9);
await page.locator('#library-search').fill('指标');assert((await page.locator('.wb-library-item:visible').count())>0);await page.locator('#library-clear').click();
await page.locator('#metric-card-example summary').click();assert(await page.locator('#metric-card-example pre').isVisible());
const copiedSource=await page.locator('#metric-card-example pre code').textContent();assert(copiedSource.includes('data-wb-value="6703.5"'));assert(copiedSource.includes('data-wb-semantic="kpi-card"'));
// Exercise the browser clipboard when file:// allows it, otherwise verify the explicit selectable-source fallback.
await page.locator('#metric-card-example [data-contract-body] button').click();
await page.waitForFunction(()=>/Copied|Select and copy/.test(document.querySelector('#metric-card-example [data-contract-body] button').textContent));
await page.locator('#metric-card-example summary').click();
report.interactions.push('Category counts, bilingual search, no-results/reset, natural equal heights, semantic mapping and copy/source fallback');
await page.setViewportSize({width:390,height:844});
await page.locator('[data-language-choice="en"]').click();await page.locator('[data-style-choice="rich"]').click();
const scope=page.locator('#select-control-example [data-wb-semantic="people-scope"]');
await page.evaluate(()=>{window.catalogChanges=0;document.querySelector('#select-control-example [data-wb-semantic="people-scope"] select').addEventListener('change',()=>window.catalogChanges++);});
await scope.locator('[data-wb-select-trigger]').click();
const menu=page.locator('#catalogManagementUnitMenu');
// The menu id is source-defined; locate the active portal instead of depending on translated text.
const active=page.locator('.wb-select-portal');assert(await active.isVisible());
await page.waitForFunction(()=>{const r=document.querySelector(".wb-select-portal").getBoundingClientRect();return r.x>=0&&r.right<=innerWidth&&r.y>=0&&r.bottom<=innerHeight;});
let bounds=await active.evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});assert(bounds.x>=0&&bounds.x+bounds.width<=390&&bounds.y>=0&&bounds.y+bounds.height<=844,JSON.stringify({bounds,root:await scope.locator("[data-wb-select-trigger]").boundingBox(),style:await active.getAttribute("style")}));
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);
await active.locator('[data-value="aviation"]').click();assert.equal(await scope.locator('select').inputValue(),'aviation');assert.equal(await page.evaluate(()=>window.catalogChanges),1);
await scope.locator('[data-wb-select-trigger]').press('ArrowDown');await page.keyboard.press('End');await page.keyboard.press('Enter');assert.equal(await scope.locator('select').inputValue(),'pcr');
await scope.locator('[data-wb-select-trigger]').press('ArrowDown');await page.keyboard.press('Escape');assert(await scope.locator('[data-wb-select-trigger]').evaluate(e=>e===document.activeElement));
await scope.locator('[data-wb-select-trigger]').press('ArrowDown');await page.keyboard.press('Tab');assert.equal(await page.locator('.wb-select-portal').count(),0);
await scope.locator('[data-wb-select-trigger]').click();await page.locator('#library-search').click();assert.equal(await page.locator('.wb-select-portal').count(),0);
await page.locator('#rich-header-card-example .wb-page-period button').first().click();assert.equal(await page.locator('#rich-header-card-example .wb-page-period button').first().getAttribute('aria-pressed'),'true');
const chart=page.locator('#analysis-card-example .wb-chart-interactive').first();await chart.focus();assert(await page.locator('.wb-chart-tooltip').isVisible());
await page.locator('.wb-ai-composer textarea').fill('test');await page.locator('.wb-ai-composer button').click();assert(await page.locator('#library-toast').isVisible());
report.interactions.push('Mobile English portal bounds, native change event, Arrow/End/Enter/Escape/Tab, outside close, reporting-period selection, chart focus tooltip and AI sample boundary');
await page.locator('[data-palette-trigger]').click();await page.locator('[data-color-choice="spruce"]').click();await page.locator('[data-theme-choice="dark"]').click();await page.reload();
assert.equal(await page.locator('html').getAttribute('data-color-theme'),'spruce');assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');assert.equal(await page.locator('html').getAttribute('lang'),'en');
report.interactions.push('Palette, appearance, style and language preferences survive a physical file reload');
for(const size of [{width:1440,height:900},{width:1024,height:768},{width:390,height:844}]) {
 await page.setViewportSize(size);
 await page.locator('[data-language-choice="zh"]').click();await page.locator('[data-theme-choice="light"]').click();await page.locator('[data-palette-trigger]').click();await page.locator('[data-color-choice="classic"]').click();
 for(const group of ['foundation','insights','workflow']) {
  await page.locator(`[data-library-filter="${group}"]`).click();await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:path.join(output,`${size.width}-${group}.png`),fullPage:true});
 }
 await page.locator('[data-library-filter="all"]').click();await page.locator('[data-language-choice="en"]').click();await page.locator('[data-theme-choice="dark"]').click();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(output,`${size.width}-dark-en.png`),fullPage:true});
}
assert.deepEqual(errors,[]);
await fs.writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({states:report.states.length,interactions:report.interactions,errors,output},null,2));
} finally { await browser.close(); }
