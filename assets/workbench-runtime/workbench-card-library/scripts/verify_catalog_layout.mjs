#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.WB_PLAYWRIGHT_MODULE || 'playwright');
const library = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(process.argv[2] || path.join(library,'qa/catalog-aipaas-20260911'));
await fs.mkdir(output,{recursive:true});
const browser = await chromium.launch({headless:true});
const context = await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const page = await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const report={states:[],compositeCardStates:[],themeConfigStates:[],aipaasStates:[],interactions:[],errors};
try {
await page.goto(pathToFileURL(path.join(library,'index.html')).href);
assert.equal(await page.locator('.wb-library-item').count(),5);
assert.equal(await page.locator('[data-library-catalog-view] .wb-library-item').count(),2);
assert.equal(await page.locator('[data-composite-cards-grid] .wb-library-item').count(),3);
assert.equal(await page.locator('.wb-composite-card').count(),3);
assert.equal(await page.locator('.wb-composite-card > .wb-composite-body').count(),3);
assert(await page.locator('#metric-card-example').evaluate(element=>element.classList.contains('is-wide')));
assert(await page.locator('#analysis-card-example').evaluate(element=>element.classList.contains('is-wide')));
assert.equal(await page.locator('[data-aipaas-target]').count(),9);
assert.equal(await page.locator('[data-aipaas-page]').count(),9);
assert.equal(await page.locator('[data-aipaas-target="object-entry"] + [data-aipaas-target="information-list"]').count(),1);
assert.equal(await page.locator('[data-aipaas-page="information-list"] .wb-info-list-card').count(),4);
assert.equal(await page.locator('[data-aipaas-page="information-list"] [data-info-list-variant]').count(),3);
assert.equal(await page.locator('[data-aipaas-page="information-list"] [role="tablist"],[data-aipaas-page="information-list"] [role="tab"]').count(),0);
assert.equal(await page.locator('[data-composite-cards-grid] .wb-composite-card > .wb-card-head > .wb-title-group > .wb-icon').count(),0);
assert.equal(await page.locator('[data-aipaas-page="object-list"] .wb-aipaas-table-card > .wb-card-head > .wb-title-group > .wb-icon').count(),0);
assert.equal(await page.locator('[data-aipaas-page="object-entry"] [data-object-entry-variant]').count(),3);
assert.equal(await page.locator('[data-aipaas-page="object-entry"] [data-object-entry-mobile-showcase]').count(),1);
assert.equal(await page.locator('[data-aipaas-page="object-entry"] [data-object-entry-mobile-demo]').count(),2);
assert.equal(await page.locator('[data-aipaas-page="object-entry"] .wb-object-entry-card:has([data-copy-zh="报价管理"]) use[href="#icon-clipboard"]').count(),5);
assert.equal(await page.locator('[data-library-filter="workflow"]').count(),0);
assert.equal(await page.locator('div[data-library-catalog-view]').count(),0);
assert.equal(await page.locator('section[data-library-catalog-view]').count(),1);
assert.equal(await page.locator('[data-theme-config-link]').count(),1);
assert.equal(await page.locator('.wb-library-sidebar-group').count(),2);
assert.equal(await page.locator('[data-library-filter="foundation"]').count(),0);
assert.equal(await page.locator('.wb-library-catalog-view > .wb-library-intro + .wb-library-industry-examples').count(),1);
assert.equal(await page.locator('#library-search,#library-empty,#workspace-tabs-example,#select-control-example,#ai-search-example').count(),0);
assert.equal(await page.locator('[data-theme-config-view] .wb-library-industry-examples').count(),0);
assert.deepEqual(await page.locator('.wb-library-sidebar-group').first().locator('.wb-library-nav > *').allTextContents(),['介绍5','主题色配置','指标与分析1']);
assert.deepEqual(await page.locator('.wb-library-sidebar-group').nth(1).locator('.wb-library-nav > *').allTextContents(),['欢迎卡片','AI 洞察','对象入口','信息列表卡片','对象列表','文本','按钮','图片','AI Agent','复合卡片3']);
assert.equal(await page.locator('[data-composite-cards-link][aria-current="page"]').count(),0);
for(const size of (process.env.WB_SKIP_MATRIX?[]:[{width:1440,height:900},{width:1024,height:768},{width:390,height:844}])) {
  await page.setViewportSize(size);
  for(const language of ['zh','en']) {
    await page.locator(`[data-language-choice="${language}"]`).click();
    for(const theme of ['light','dark']) {
      await page.locator(`[data-theme-choice="${theme}"]`).click();
      for(const style of ['rich','minimal']) {
        await page.locator(`[data-style-choice="${style}"]`).click();
        for(const palette of ['classic','spruce','coral','iris','rose','graphite']) {
          await page.locator('[data-palette-trigger]').click();
          await page.locator(`[data-color-choice="${palette}"]`).click();
          const measured=await page.evaluate(()=>({
            overflow:document.documentElement.scrollWidth-innerWidth,
            bad:[...document.querySelectorAll('.wb-library-item,[data-wb-grid-key],.wb-library-preview,.wb-card,.wb-composite-body,.wb-composite-split,.wb-composite-grid,.wb-metric,.catalog-density-grid')].filter(e=>e.getBoundingClientRect().width&&e.scrollWidth>e.clientWidth+1).map(e=>e.id||e.className),
            semantics:[...document.querySelectorAll('[data-wb-semantic]')].filter(e=>!e.dataset.wbComponent||!(e.getAttribute('aria-label')||e.getAttribute('aria-labelledby'))).length,
            controls:[...document.querySelectorAll('[data-library-catalog-view] .wb-page-period,[data-library-catalog-view] .wb-select.wb-page-filter')].map(e=>e.getBoundingClientRect().height),
            quick:[...document.querySelectorAll('.wb-quick-card')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.getBoundingClientRect().height),
            rows:[...document.querySelectorAll('.wb-compact-row')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.getBoundingClientRect().height),
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
for(const size of (process.env.WB_SKIP_MATRIX?[]:[{width:1440,height:900},{width:1024,height:768},{width:390,height:844}])) {
  await page.setViewportSize(size);
  for(const language of ['zh','en']) {
    await page.locator(`[data-language-choice="${language}"]`).click();
    for(const theme of ['light','dark']) {
      await page.locator(`[data-theme-choice="${theme}"]`).click();
      for(const style of ['rich','minimal']) {
        await page.locator(`[data-style-choice="${style}"]`).click();
        for(const palette of ['classic','spruce','coral','iris','rose','graphite']) {
          await page.locator('[data-palette-trigger]').click();
          await page.locator(`[data-color-choice="${palette}"]`).click();
          await page.locator('[data-composite-cards-link]').click();
          const measured=await page.evaluate(()=>({
            overflow:document.documentElement.scrollWidth-innerWidth,
            bad:[...document.querySelectorAll('[data-composite-cards-view]:not([hidden]),[data-composite-cards-grid],.wb-library-item,.wb-library-preview,.wb-card,.wb-composite-body,.wb-composite-split,.wb-composite-grid')].filter(e=>e.getBoundingClientRect().width&&e.scrollWidth>e.clientWidth+1).map(e=>e.id||e.className),
            visibleViews:[...document.querySelectorAll('[data-library-catalog-view],[data-composite-cards-view],[data-theme-config-view],[data-aipaas-view]')].filter(e=>!e.hidden).length,
            items:[...document.querySelectorAll('[data-composite-cards-grid] .wb-library-item')].filter(e=>e.getBoundingClientRect().width>0).length,
            bodies:[...document.querySelectorAll('[data-composite-cards-grid] .wb-composite-body')].filter(e=>e.getBoundingClientRect().width>0).length,
            quick:[...document.querySelectorAll('[data-composite-cards-grid] .wb-quick-card')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.getBoundingClientRect().height),
            rows:[...document.querySelectorAll('[data-composite-cards-grid] .wb-compact-row')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.getBoundingClientRect().height),
            current:document.querySelector('[data-composite-cards-link]').getAttribute('aria-current')
          }));
          report.compositeCardStates.push({size,language,theme,style,palette,...measured});
          assert.equal(measured.overflow,0,JSON.stringify(report.compositeCardStates.at(-1)));
          assert.deepEqual(measured.bad,[],JSON.stringify(report.compositeCardStates.at(-1)));
          assert.equal(measured.visibleViews,1);assert.equal(measured.items,3);assert.equal(measured.bodies,3);assert.equal(measured.current,'page');
          assert(measured.quick.every(h=>h===64));assert(measured.rows.every(h=>h===32));
        }
      }
    }
  }
}
report.interactions.push(`${report.compositeCardStates.length} composite-card states keep one view, three complete examples, 64px quick cards, 32px compact rows, and no overflow`);
for(const size of (process.env.WB_SKIP_MATRIX?[]:[{width:1440,height:900},{width:1024,height:768},{width:390,height:844}])) {
  await page.setViewportSize(size);
  for(const language of ['zh','en']) {
    await page.locator(`[data-language-choice="${language}"]`).click();
    for(const theme of ['light','dark']) {
      await page.locator(`[data-theme-choice="${theme}"]`).click();
      for(const style of ['rich','minimal']) {
        await page.locator(`[data-style-choice="${style}"]`).click();
        for(const palette of ['classic','spruce','coral','iris','rose','graphite']) {
          await page.locator('[data-palette-trigger]').click();
          await page.locator(`[data-color-choice="${palette}"]`).click();
          await page.locator('[data-theme-config-link]').click();
          const measured=await page.evaluate(()=>({
            overflow:document.documentElement.scrollWidth-innerWidth,
            bad:[...document.querySelectorAll('[data-theme-config-view]:not([hidden]),.wb-aipaas-theme-card,.wb-aipaas-theme-option,.wb-aipaas-industry-recommend,.wb-aipaas-industry-row')].filter(e=>e.getBoundingClientRect().width&&e.scrollWidth>e.clientWidth+1).map(e=>e.id||e.className),
            visibleViews:[...document.querySelectorAll('[data-library-catalog-view],[data-composite-cards-view],[data-theme-config-view],[data-aipaas-view]')].filter(e=>!e.hidden).length,
            title:document.getElementById('themeConfigTitle')?.textContent,
            industryExamplesVisible:[...document.querySelectorAll('.wb-library-industry-examples')].filter(element=>element.getBoundingClientRect().width>0).length
          }));
          report.themeConfigStates.push({size,language,theme,style,palette,...measured});
          assert.equal(measured.overflow,0,JSON.stringify(report.themeConfigStates.at(-1)));
          assert.deepEqual(measured.bad,[],JSON.stringify(report.themeConfigStates.at(-1)));
          assert.equal(measured.visibleViews,1);
          assert.equal(measured.title,language==='zh'?'主题色配置':'Theme color configuration');
          assert.equal(measured.industryExamplesVisible,0);
          await page.locator('[data-library-filter="all"]').click();
        }
      }
    }
  }
}
report.interactions.push(`${report.themeConfigStates.length} theme-configuration states keep one theme view, hide homepage industry links, and have no overflow`);
const aipaasTargets=['welcome-card','ai-insight','object-entry','information-list','object-list','text','button','image','agent'];
await page.locator('[data-aipaas-target="welcome-card"]').click();
assert(await page.locator('[data-aipaas-page="welcome-card"]').isVisible());
assert.equal(await page.locator('[data-aipaas-page="welcome-card"] .wb-aipaas-welcome-card').count(),4);
for(const size of (process.env.WB_SKIP_MATRIX?[]:[{width:1440,height:900},{width:1024,height:768},{width:390,height:844}])) {
  await page.setViewportSize(size);
  for(const language of ['zh','en']) {
    await page.locator(`[data-language-choice="${language}"]`).click();
    for(const theme of ['light','dark']) {
      await page.locator(`[data-theme-choice="${theme}"]`).click();
      for(const style of ['rich','minimal']) {
        await page.locator(`[data-style-choice="${style}"]`).click();
        for(const palette of ['classic','spruce','coral','iris','rose','graphite']) {
          await page.locator('[data-palette-trigger]').click();
          await page.locator(`[data-color-choice="${palette}"]`).click();
          for(const target of aipaasTargets) {
            await page.locator(`[data-aipaas-target="${target}"]`).click();
            const measured=await page.evaluate(()=>({
              overflow:document.documentElement.scrollWidth-innerWidth,
              bad:[...document.querySelectorAll('.wb-aipaas-page:not([hidden]),.wb-aipaas-preview,.wb-aipaas-welcome-card,.wb-aipaas-insight-brief,.wb-aipaas-recognition,.wb-ai-generation-meta,.wb-aipaas-entry-grid,.wb-object-entry-card,.wb-object-entry-mobile-stage,.wb-object-entry-mobile-modes,.wb-object-entry-mobile-mode,.wb-object-entry-mobile-frame,.wb-aipaas-type-card,.wb-aipaas-button-card,.wb-aipaas-image-card,.wb-aipaas-theme-card,.wb-aipaas-agent-card,.wb-info-list-card,.wb-info-list-panel,.wb-info-list-item,.wb-ai-assistance-card,.wb-ai-assistance-item')].filter(e=>e.getBoundingClientRect().width&&e.scrollWidth>e.clientWidth+1).map(e=>e.id||e.className),
              controls:[...document.querySelectorAll('.wb-aipaas-page:not([hidden]) .wb-page-period,.wb-aipaas-page:not([hidden]) .wb-select.wb-page-filter')].map(e=>e.getBoundingClientRect().height),
              visiblePages:[...document.querySelectorAll('[data-aipaas-page]')].filter(e=>!e.hidden).length,
              semantics:[...document.querySelectorAll('.wb-aipaas-page:not([hidden]) [data-wb-semantic]')].filter(e=>!e.dataset.wbComponent||!(e.getAttribute('aria-label')||e.getAttribute('aria-labelledby'))).length,
              agentGreetingSize:document.querySelector('.wb-aipaas-page:not([hidden]) .wb-aipaas-agent-welcome h2')?getComputedStyle(document.querySelector('.wb-aipaas-page:not([hidden]) .wb-aipaas-agent-welcome h2')).fontSize:null,
              agentGreetingWeight:document.querySelector('.wb-aipaas-page:not([hidden]) .wb-aipaas-agent-welcome h2')?getComputedStyle(document.querySelector('.wb-aipaas-page:not([hidden]) .wb-aipaas-agent-welcome h2')).fontWeight:null,
              agentMobile:(()=>{const preview=document.querySelector('.wb-aipaas-agent-mobile-preview');const card=preview.querySelector('.wb-aipaas-agent-card');const composer=card.querySelector('form');const input=composer.querySelector('input');const buttons=[...composer.querySelectorAll('button')];const greeting=card.querySelector('h2');const logo=card.querySelector('.wb-aipaas-agent-logo');const welcome=card.querySelector('.wb-aipaas-agent-welcome');const imageRect=logo.querySelector('img').getBoundingClientRect();const greetingRect=greeting.getBoundingClientRect();const rect=composer.getBoundingClientRect();return{avatarImageWidth:imageRect.width,avatarImageHeight:imageRect.height,imageTextGap:greetingRect.left-imageRect.right,avatarCenterOffset:imageRect.top+imageRect.height/2-greetingRect.top-greetingRect.height/2,previewWidth:preview.getBoundingClientRect().width,height:rect.height,padding:getComputedStyle(composer).padding,radius:getComputedStyle(composer).borderRadius,overflow:composer.scrollWidth-composer.clientWidth,cardPadding:getComputedStyle(card).padding,avatarSize:getComputedStyle(logo).width,welcomeGap:getComputedStyle(welcome).columnGap,welcomeAlign:getComputedStyle(welcome).alignItems,composerMargin:getComputedStyle(composer).marginTop,greetingSize:getComputedStyle(greeting).fontSize,greetingLineHeight:getComputedStyle(greeting).lineHeight,greetingWeight:getComputedStyle(greeting).fontWeight,greetingText:greeting.textContent,desktopGreetingText:document.getElementById('aipaasAgentWelcome').textContent,inputWidth:input.getBoundingClientRect().width,placeholder:input.placeholder,fieldKey:input.dataset.wbFieldKey,fieldLabel:input.dataset.wbFieldLabel,buttonLabels:buttons.map(b=>b.getAttribute('aria-label')),buttons:buttons.map(b=>({width:b.getBoundingClientRect().width,height:b.getBoundingClientRect().height,center:b.getBoundingClientRect().top+b.getBoundingClientRect().height/2})),selectorCount:composer.querySelectorAll('.wb-agent-selector').length,sendDisabled:composer.querySelector('[type="submit"]').disabled};})(),
              objectEntryNameOnly:document.querySelector('[data-object-entry-layout="vertical"][data-object-entry-content="name-only"]')?(()=>{const grid=document.querySelector('[data-object-entry-layout="vertical"][data-object-entry-content="name-only"]');const cards=[...grid.querySelectorAll('.wb-object-entry-card')];return {columns:getComputedStyle(grid).gridTemplateColumns.split(' ').length,rows:new Set(cards.map(card=>Math.round(card.getBoundingClientRect().top))).size};})():null,
              objectEntryMobile:[...document.querySelectorAll('[data-object-entry-mobile-demo]')].map(grid=>{const frame=grid.closest('.wb-object-entry-mobile-frame');const cards=[...grid.querySelectorAll('.wb-object-entry-card')];const quote=grid.querySelector('[data-copy-zh="报价管理"]')?.closest('.wb-object-entry-card');const icon=quote?.querySelector('svg');return {mode:grid.dataset.objectEntryMobileDemo,layout:grid.dataset.objectEntryLayout,content:grid.dataset.objectEntryContent,frameWidth:frame.getBoundingClientRect().width,columns:getComputedStyle(grid).gridTemplateColumns.split(' ').length,rows:new Set(cards.map(card=>Math.round(card.getBoundingClientRect().top))).size,columnGap:getComputedStyle(grid).columnGap,itemDetailCount:grid.querySelectorAll('.wb-object-entry-copy small,.wb-object-entry-value').length,itemCoreCount:cards.filter(card=>card.querySelectorAll('.wb-quick-icon svg,.wb-object-entry-copy strong').length===2).length,itemVerticalCount:cards.filter(card=>card.classList.contains('is-vertical')).length,itemBareCount:cards.filter(card=>card.classList.contains('is-bare')).length,identityColorClassCount:cards.filter(card=>card.matches('.is-green,.is-orange,.is-purple,.is-blue')).length,minItemHeight:Math.min(...cards.map(card=>card.getBoundingClientRect().height)),itemBackgrounds:[...new Set(cards.map(card=>getComputedStyle(card).backgroundColor))],itemBorderWidths:[...new Set(cards.map(card=>getComputedStyle(card).borderTopWidth))],iconBackgrounds:[...new Set(cards.map(card=>getComputedStyle(card.querySelector('.wb-quick-icon')).backgroundColor))],iconColors:[...new Set(cards.map(card=>getComputedStyle(card.querySelector('.wb-quick-icon')).color))],quoteIconHref:quote?.querySelector('use')?.getAttribute('href'),quoteIconWidth:icon?.getBoundingClientRect().width};}),
              aiDiagnosis:document.querySelector('.wb-aipaas-page:not([hidden]) .wb-aipaas-diagnosis')?(()=>{const element=document.querySelector('.wb-aipaas-page:not([hidden]) .wb-aipaas-diagnosis');const styles=getComputedStyle(element);return {backgroundImage:styles.backgroundImage,backgroundToken:styles.getPropertyValue('--wb-ai-insight-surface').trim(),borderWidth:styles.borderTopWidth,borderStyle:styles.borderTopStyle,borderColor:styles.borderTopColor,borderToken:styles.getPropertyValue('--wb-ai-insight-border').trim()};})():null,
              aiGeneration:[...document.querySelectorAll('.wb-aipaas-page:not([hidden]) .wb-ai-generation-meta')].map(meta=>{const button=meta.querySelector('.wb-ai-regenerate');const time=meta.querySelector('.wb-ai-generation-time');const svg=button.querySelector('svg');const rect=button.getBoundingClientRect();const svgRect=svg.getBoundingClientRect();const metaRect=meta.getBoundingClientRect();const card=meta.closest('.wb-aipaas-insight-brief,.wb-aipaas-recognition');const cardRect=card.getBoundingClientRect();const footer=meta.closest('.wb-ai-generation-row');const actions=card.querySelector('.wb-aipaas-insight-actions');const actionsRect=actions?.getBoundingClientRect();const timeStyle=getComputedStyle(time);const buttonStyle=getComputedStyle(button);return {text:time.textContent.trim(),dateTime:time.getAttribute('datetime'),fieldKey:time.dataset.wbFieldKey,fieldType:time.dataset.wbFieldType,label:button.getAttribute('aria-label'),viewBox:svg.getAttribute('viewBox'),paths:[...svg.querySelectorAll('path')].map(path=>path.getAttribute('d')),width:rect.width,height:rect.height,iconWidth:svgRect.width,iconHeight:svgRect.height,timeColor:timeStyle.color,fontFamily:timeStyle.fontFamily,fontSize:timeStyle.fontSize,fontStyle:timeStyle.fontStyle,fontWeight:timeStyle.fontWeight,lineHeight:timeStyle.lineHeight,fontFeatures:timeStyle.fontFeatureSettings,buttonColor:buttonStyle.color,buttonBackground:buttonStyle.backgroundColor,buttonBorder:buttonStyle.borderTopWidth,buttonShadow:buttonStyle.boxShadow,isBrief:card.classList.contains('wb-aipaas-insight-brief'),footerLastInCard:footer===card.lastElementChild,metaFirstInFooter:meta===footer?.firstElementChild,actionsLastInFooter:actions===footer?.lastElementChild,footerDirection:footer?getComputedStyle(footer).flexDirection:null,rowCenterOffset:actionsRect?Math.abs((metaRect.top+metaRect.height/2)-(actionsRect.top+actionsRect.height/2)):null,leftOffset:Math.round(metaRect.left-cardRect.left),bottomOffset:Math.round(cardRect.bottom-metaRect.bottom)};})
            }));
            report.aipaasStates.push({size,language,theme,style,palette,target,...measured});
            assert.equal(measured.overflow,0,JSON.stringify(report.aipaasStates.at(-1)));
            assert.deepEqual(measured.bad,[],JSON.stringify(report.aipaasStates.at(-1)));assert.equal(measured.visiblePages,1);assert.equal(measured.semantics,0);
            assert(measured.controls.every(h=>h===32));
            if(target==='object-entry'){
              const horizontal = await page.locator('[data-object-entry-variant] [data-object-entry-layout="horizontal"]').evaluateAll(grids=>grids.map(grid=>({width:grid.clientWidth,columns:getComputedStyle(grid).gridTemplateColumns.split(' ').length,gap:getComputedStyle(grid).gap,cards:[...grid.children].map(card=>{const s=getComputedStyle(card),icon=getComputedStyle(card.querySelector('.wb-quick-icon'));return{height:card.getBoundingClientRect().height,border:s.borderTopWidth,radius:s.borderRadius,shadow:s.boxShadow,background:s.backgroundColor,iconShadow:icon.boxShadow,iconBackground:icon.backgroundColor};})})));
              assert.equal(horizontal.length,2);
              assert.equal(await page.locator('[data-aipaas-page="object-entry"] .wb-object-entry-card .wb-quick-icon').evaluateAll(icons=>icons.every(icon=>{const s=getComputedStyle(icon);return s.boxShadow==='none'&&s.backgroundImage==='none'&&s.borderTopWidth==='0px';})),true);

              assert.equal(horizontal[0].columns,horizontal[1].columns);
              for(const grid of horizontal){assert.equal(grid.gap,'16px');assert.equal(grid.columns,Math.min(5,Math.max(1,Math.floor((grid.width+16)/236))));for(const card of grid.cards){assert.equal(card.height,64);assert.equal(card.border,'0px');assert.equal(card.radius,'16px');assert.notEqual(card.background,'rgba(0, 0, 0, 0)');assert.equal(card.shadow==='none',style==='minimal');assert.equal(card.iconShadow,'none');assert.notEqual(card.iconBackground,'rgba(0, 0, 0, 0)');}}

              assert.equal(measured.objectEntryNameOnly.columns,size.width>=1024?5:2);
              assert.equal(measured.objectEntryNameOnly.rows,size.width>=1024?1:3);
              assert.deepEqual(measured.objectEntryMobile.map(item=>item.mode),['full','compact']);
              for(const mobile of measured.objectEntryMobile){assert(mobile.frameWidth<=390);assert.equal(mobile.itemCoreCount,5);assert(mobile.minItemHeight>=44);assert.equal(mobile.quoteIconHref,'#icon-clipboard');assert(mobile.quoteIconWidth>0);}
              const [mobileFull,mobileCompact]=measured.objectEntryMobile;
              assert.equal(mobileFull.layout,'horizontal');assert.equal(mobileFull.content,'full');assert.equal(mobileFull.columns,1);assert.equal(mobileFull.rows,5);assert.equal(mobileFull.itemDetailCount,10);
              assert.equal(mobileCompact.layout,'vertical');assert.equal(mobileCompact.content,'name-only');assert.equal(mobileCompact.columns,5);assert.equal(mobileCompact.rows,1);assert.equal(mobileCompact.columnGap,'0px');assert.equal(mobileCompact.itemDetailCount,0);assert.equal(mobileCompact.itemVerticalCount,5);assert.equal(mobileCompact.itemBareCount,5);assert.equal(mobileCompact.identityColorClassCount,5);assert.deepEqual(mobileCompact.itemBackgrounds,['rgba(0, 0, 0, 0)']);assert.deepEqual(mobileCompact.itemBorderWidths,['0px']);assert(mobileCompact.iconBackgrounds.every(value=>value!=='rgba(0, 0, 0, 0)'));assert.deepEqual(mobileCompact.iconColors,mobileFull.iconColors);assert.deepEqual(mobileCompact.iconBackgrounds,mobileFull.iconBackgrounds);
            }
            if(target==='agent'){
              assert.equal(measured.agentGreetingSize,'24px');assert.equal(measured.agentGreetingWeight,'400');
              const mobile=measured.agentMobile;
              assert(mobile.previewWidth<=390);assert.equal(mobile.height,56);assert.equal(mobile.padding,'5px 4px');assert.equal(mobile.radius,'20px');assert.equal(mobile.overflow,0);assert.equal(mobile.cardPadding,'12px');assert.equal(mobile.avatarSize,'32px');assert.equal(mobile.avatarImageWidth,32);assert.equal(mobile.avatarImageHeight,32);assert.equal(mobile.imageTextGap,12);assert.equal(mobile.avatarCenterOffset,0);assert.equal(mobile.welcomeGap,'12px');assert.equal(mobile.welcomeAlign,'center');assert.equal(mobile.composerMargin,'12px');assert.equal(mobile.greetingSize,'18px');assert.equal(mobile.greetingLineHeight,'26px');assert.equal(mobile.greetingWeight,'400');assert.equal(mobile.greetingText,mobile.desktopGreetingText);assert(mobile.inputWidth>100);assert.equal(mobile.fieldKey,'message');assert.equal(mobile.fieldLabel,language==='zh'?'消息':'Message');assert.equal(mobile.placeholder,language==='zh'?'发消息或按住说话':'Message or hold to talk');assert.equal(mobile.selectorCount,0);assert.equal(mobile.sendDisabled,true);assert.equal(mobile.buttons.length,4);assert(mobile.buttons.every(b=>b.width>=44&&b.height>=44));assert.equal(new Set(mobile.buttons.map(b=>b.center)).size,1);assert.deepEqual(mobile.buttonLabels,language==='zh'?['语音输入模式','语音输入','添加附件','发送消息']:['Voice input mode','Voice input','Add attachment','Send message']);
            }
            if(target==='ai-insight'&&theme==='light'){
              assert.match(measured.aiDiagnosis.backgroundImage,/linear-gradient\(96deg/);
              assert.equal(measured.aiDiagnosis.backgroundToken,'linear-gradient(96deg, #ffffff 0.58%, #ebf2ff 102.07%)');
              assert.equal(measured.aiDiagnosis.borderWidth,'1px');
              assert.equal(measured.aiDiagnosis.borderStyle,'solid');
              assert.equal(measured.aiDiagnosis.borderColor,'rgba(79, 104, 255, 0.2)');
              assert.equal(measured.aiDiagnosis.borderToken,'rgba(79, 104, 255, 0.2)');
            }
            if(target==='ai-insight'){
              assert.equal(measured.aiGeneration.length,2);
              assert(measured.aiGeneration.every(item=>/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(item.text)));
              assert(measured.aiGeneration.every(item=>/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:00\+08:00$/.test(item.dateTime)));
              assert(measured.aiGeneration.every(item=>item.fieldKey==='generated-at'&&item.fieldType==='datetime'));
              assert(measured.aiGeneration.every(item=>item.label===(language==='zh'?'重新生成':'Regenerate')));
              assert(measured.aiGeneration.every(item=>item.viewBox==='0 0 16 16'&&item.width===32&&item.height===32));
              assert(measured.aiGeneration.every(item=>item.iconWidth===16&&item.iconHeight===16));
              assert(measured.aiGeneration.every(item=>item.fontFamily.startsWith('"Source Han Sans CN"')&&item.fontSize==='12px'&&item.fontStyle==='normal'&&item.fontWeight==='400'&&item.lineHeight==='18px'));
              assert(measured.aiGeneration.every(item=>item.fontFeatures.includes('"liga" 0')&&item.fontFeatures.includes('"clig" 0')));
              assert(measured.aiGeneration.every(item=>item.timeColor===(theme==='light'?'rgb(115, 124, 140)':'rgb(168, 177, 191)')));
              assert(measured.aiGeneration.every(item=>item.buttonColor===(theme==='light'?'rgb(24, 28, 37)':'rgb(243, 245, 248)')));
              assert(measured.aiGeneration.every(item=>item.buttonBackground==='rgba(0, 0, 0, 0)'&&item.buttonBorder==='0px'&&item.buttonShadow==='none'));
              assert(measured.aiGeneration.every(item=>JSON.stringify(item.paths)===JSON.stringify(['M15.7462 6C14.8581 2.54955 11.7259 0 7.99821 0C4.27053 0 1.13833 2.54955 0.250244 6H1.28809C2.14864 3.10851 4.82719 1 7.99821 1C10.2461 1 12.2465 2.05955 13.5272 3.70647L11.9982 6H15.7462Z','M15.7462 10H14.7083C13.8478 12.8915 11.1692 15 7.99821 15C5.75034 15 3.74994 13.9405 2.46919 12.2935L3.99821 10H0.250244C1.13833 13.4505 4.27053 16 7.99821 16C11.7259 16 14.8581 13.4505 15.7462 10Z'])));
              const briefGeneration=measured.aiGeneration.find(item=>item.isBrief);
              assert(briefGeneration.footerLastInCard);assert(briefGeneration.metaFirstInFooter);assert(briefGeneration.actionsLastInFooter);assert(briefGeneration.leftOffset>=20&&briefGeneration.leftOffset<=22);assert(briefGeneration.bottomOffset>=20&&briefGeneration.bottomOffset<=22);
              if(size.width>=1024){assert.equal(briefGeneration.footerDirection,'row');assert(briefGeneration.rowCenterOffset<=1);}
              if(size.width===390){assert.equal(briefGeneration.footerDirection,'column-reverse');}
            }
          }
        }
      }
    }
  }
}
report.interactions.push(`${report.aipaasStates.length} AIPaaS page states: nine complete pages, six palettes, bilingual light/dark rich/minimal modes, 32px controls, and no page/component overflow`);
await page.locator('[data-aipaas-target="ai-insight"]').click();
assert.equal(await page.locator('.wb-ai-generation-meta').count(),2);assert.equal(await page.locator('.wb-aipaas-ai-kicker').count(),0);assert.equal(await page.locator('#icon-refresh').count(),0);assert.equal(await page.locator('.wb-title-meta').filter({hasText:/全部 6 个事件|6 events/}).count(),0);
await page.locator('.wb-ai-regenerate').first().click();assert(await page.locator('#library-toast').isVisible());
report.interactions.push('Both AI insight patterns expose 12px/18px regular timestamps and the approved 16px refresh artwork in transparent, borderless, shadowless 32px regenerate hit targets; the brief card aligns its generation metadata left and its three actions right in one bottom row at desktop/tablet widths, then stacks safely on narrow containers; its old kicker is absent, and the diagnosis header no longer shows the replaced total-event pill');
await page.locator('[data-aipaas-target="information-list"]').click();
await page.locator('[data-language-choice="zh"]').click();
assert.equal(await page.locator('.wb-info-list-card').count(),4);
assert.deepEqual(await page.locator('[data-info-list-variant] .wb-aipaas-variant-index').allTextContents(),['01','02','03']);
assert.deepEqual(await page.locator('.wb-info-list-card .wb-info-list-head h2').allTextContents(),['我的待办','我的提醒','我的关注','我的待办']);
assert.deepEqual(await page.locator('.wb-info-list-card .wb-info-list-count').allTextContents(),['6','5']);
assert.equal(await page.locator('.wb-info-list-item').count(),9);
assert.equal(await page.locator('[data-info-list-empty-example]').count(),1);
assert.equal(await page.locator('[data-info-list-type="empty"] button,[data-info-list-type="empty"] .wb-info-list-count').count(),0);
assert.equal(await page.locator('[data-info-list-type="empty"] [role="status"]').getAttribute('data-wb-value'),'0');
assert.equal(await page.locator('.wb-info-list-empty p').textContent(),'暂无数据');
assert.deepEqual(await page.locator('.wb-info-list-item-top > .wb-status-tag').allTextContents(),['今天','明天','08-23','偏移','8 天','偏移','客户','商机','合同']);
assert.equal(await page.locator('.wb-info-list-item-top > .wb-status-tag.is-attention').count(),1);
assert.equal(await page.locator('.wb-info-list-item-top > .wb-status-tag.is-risk').count(),3);
assert.equal(await page.locator('.wb-info-list-item-top > .wb-status-tag.is-neutral').count(),5);
assert(await page.locator('.wb-info-list-item-top > .wb-status-tag').evaluateAll(tags=>tags.every(tag=>Math.round(tag.getBoundingClientRect().height)===22&&getComputedStyle(tag).borderRadius==='999px')));
assert.equal(await page.locator('[data-info-list-type="todo"] .wb-info-list-item:first-child .is-attention').textContent(),'今天');
assert.deepEqual(await page.locator('[data-info-list-type="reminder"] .wb-info-list-item-top > .is-risk').allTextContents(),['偏移','8 天','偏移']);
assert.equal(await page.locator('[data-info-list-type="follow"] .wb-info-list-count').count(),0);
assert.equal(await page.locator('[data-info-list-variant] [role="tablist"],[data-info-list-variant] [role="tab"]').count(),0);
assert(await page.locator('.wb-library-footer').evaluate(element=>parseFloat(getComputedStyle(element).marginTop)>=24));
await page.locator('[data-language-choice="en"]').click();
assert.deepEqual(await page.locator('.wb-info-list-card .wb-info-list-head h2').allTextContents(),['My tasks','My reminders','Following','My tasks']);
assert.deepEqual(await page.locator('.wb-info-list-item-top > .wb-status-tag').allTextContents(),['Today','Tomorrow','08-23','Drift','8 days','Drift','Customer','Opportunity','Contract']);
assert.equal(await page.locator('[data-info-list-type="follow"] .wb-info-list-foot button').textContent(),'View all followed records');
await page.locator('[data-info-list-type="follow"] .wb-info-list-item').first().click();
assert(await page.locator('#library-toast').isVisible());
report.interactions.push('One shared information-list structure appears as three numbered examples without tabs; all nine right-side values use shared capsules, Today is accent-highlighted, stage drift and quote expiry use risk emphasis, other values stay neutral, source totals 6/5 remain, following has no inferred total, English labels update, business actions show the existing demo toast, and the page footer divider has a 24px gap');
await page.locator('[data-aipaas-target="welcome-card"]').click();
await page.setViewportSize({width:390,height:844});await page.locator('[data-language-choice="en"]').click();
const aipaasRegion=page.locator('[data-aipaas-page="welcome-card"] [data-wb-field-key="aipaas-standard-region"]').locator('..');
await page.evaluate(()=>{window.aipaasRegionChanges=0;document.querySelector('[data-wb-field-key="aipaas-standard-region"]').addEventListener('change',()=>window.aipaasRegionChanges++);});
await aipaasRegion.locator('[data-wb-select-trigger]').click();
const aipaasMenu=page.locator('#aipaasStandardRegionMenu:visible,.wb-select-portal:visible').first();
await aipaasMenu.locator('[data-value="east"]').click();
assert.equal(await aipaasRegion.locator('select').inputValue(),'east');assert.equal(await page.evaluate(()=>window.aipaasRegionChanges),1);
report.interactions.push('AIPaaS standard welcome-card composite select is clickable on mobile and preserves native value/change');
for(const link of await page.locator('[data-aipaas-target]').all()) {
  const target=await link.getAttribute('data-aipaas-target');await link.click();
  assert(await page.locator(`[data-aipaas-page="${target}"]`).isVisible());
  assert.equal(await page.locator('[data-aipaas-page]:visible').count(),1);
  assert.equal(await link.getAttribute('aria-current'),'page');
}
report.interactions.push('Nine AIPaaS foundation links open one stable component page each and expose the active page');
await page.locator('[data-aipaas-target="object-entry"]').click();
assert.equal(await page.locator('[data-aipaas-page="object-entry"] .wb-card-head button').count(),0);
const previousEntryViewport=page.viewportSize();
await page.setViewportSize({width:1920,height:1080});
const wideEntries=await page.locator('[data-object-entry-variant] [data-object-entry-layout="horizontal"]').evaluateAll(grids=>grids.map(grid=>({width:grid.clientWidth,columns:getComputedStyle(grid).gridTemplateColumns.split(' ').length,rows:new Set([...grid.children].map(card=>Math.round(card.getBoundingClientRect().top))).size,overflow:grid.scrollWidth-grid.clientWidth})));
assert.equal(wideEntries.length,2);
for(const grid of wideEntries){assert(grid.width>=1164);assert.equal(grid.columns,5);assert.equal(grid.rows,1);assert.equal(grid.overflow,0);}
await page.screenshot({path:path.join(output,'1920-object-entry-five-columns.png'),fullPage:true});
report.interactions.push('Both horizontal object-entry variants show five entries in one equal-width row at 1920px; actual grid width >=1164px, no overflow, and responsive maximum is five columns');
await page.setViewportSize(previousEntryViewport);
const objectEntryVariants=page.locator('[data-object-entry-variant]');
assert.equal(await objectEntryVariants.count(),3);
assert.deepEqual(await objectEntryVariants.evaluateAll(items=>items.map(item=>item.dataset.objectEntryVariant)),['horizontal-full','horizontal-name-only','vertical-name-only']);
assert.equal(await objectEntryVariants.locator('.wb-object-entry-card').count(),15);
assert.equal(await page.locator('[data-object-entry-mobile-demo]').count(),2);
assert.equal(await page.locator('[data-object-entry-mobile-demo] .wb-object-entry-card').count(),10);
assert.equal(await page.locator('[data-object-entry-mobile-demo="full"] .wb-object-entry-card').count(),5);
assert.equal(await page.locator('[data-object-entry-mobile-demo="compact"] .wb-object-entry-card').count(),5);
assert.equal(await page.locator('[data-object-entry-mobile-demo="compact"] :is(.wb-object-entry-copy small,.wb-object-entry-value)').count(),0);
assert.equal(await page.locator('[data-object-entry-mobile-demo="compact"] .wb-object-entry-card').evaluateAll(items=>items.every(item=>item.querySelectorAll('.wb-quick-icon svg,.wb-object-entry-copy strong').length===2)),true);
assert.equal(await page.locator('[data-object-entry-mobile-demo="compact"][data-object-entry-layout="vertical"] .wb-object-entry-card.is-vertical.is-name-only.is-bare').count(),5);
assert.equal(await page.locator('[data-object-entry-mobile-demo="compact"] .wb-object-entry-card:is(.is-green,.is-orange,.is-purple,.is-blue)').count(),5);
assert.deepEqual(await page.locator('[data-object-entry-mobile-demo="compact"]').evaluate(grid=>{const cards=[...grid.querySelectorAll('.wb-object-entry-card')];return{columns:getComputedStyle(grid).gridTemplateColumns.split(' ').length,rows:new Set(cards.map(card=>Math.round(card.getBoundingClientRect().top))).size,gap:getComputedStyle(grid).columnGap,backgrounds:[...new Set(cards.map(card=>getComputedStyle(card).backgroundColor))],borders:[...new Set(cards.map(card=>getComputedStyle(card).borderTopWidth))],transparentIcons:cards.filter(card=>getComputedStyle(card.querySelector('.wb-quick-icon')).backgroundColor==='rgba(0, 0, 0, 0)').length};}),{columns:5,rows:1,gap:'0px',backgrounds:['rgba(0, 0, 0, 0)'],borders:['0px'],transparentIcons:0});
assert.deepEqual(await page.locator('[data-object-entry-mobile-demo]').evaluateAll(grids=>grids.map(grid=>[...grid.querySelectorAll('.wb-object-entry-card')].map(card=>({color:getComputedStyle(card.querySelector('.wb-quick-icon')).color,background:getComputedStyle(card.querySelector('.wb-quick-icon')).backgroundColor})))).then(values=>{const [full,compact]=values;return {sameColors:JSON.stringify(full.map(item=>item.color))===JSON.stringify(compact.map(item=>item.color)),sameBackgrounds:JSON.stringify(full.map(item=>item.background))===JSON.stringify(compact.map(item=>item.background))};}),{sameColors:true,sameBackgrounds:true});
for(const variant of await objectEntryVariants.all())assert.equal(await variant.locator('.wb-object-entry-card').count(),5);
assert.equal(await objectEntryVariants.locator('[data-object-entry-layout="horizontal"] .wb-object-entry-card').evaluateAll(items=>items.every(item=>item.getBoundingClientRect().height===64)),true);
assert.equal(await objectEntryVariants.locator('[data-object-entry-layout="vertical"] .wb-object-entry-card').evaluateAll(items=>items.every(item=>item.getBoundingClientRect().height>=128)),true);
assert.equal(await objectEntryVariants.locator('[data-object-entry-content="full"] .wb-object-entry-copy small').count(),5);
assert.equal(await objectEntryVariants.locator('[data-object-entry-content="full"] .wb-object-entry-value[data-wb-field-key][data-wb-field-type="number"][data-wb-value]').count(),5);
assert.equal(await objectEntryVariants.locator('[data-object-entry-content="name-only"] :is(.wb-object-entry-copy small,.wb-object-entry-value)').count(),0);
assert.equal(await objectEntryVariants.locator('[data-object-entry-content="name-only"] .wb-object-entry-card').evaluateAll(items=>items.every(item=>item.querySelectorAll('.wb-quick-icon svg,.wb-object-entry-copy strong').length===2)),true);
assert.equal(await page.locator('[data-object-entry-variant="vertical-full"]').count(),0);
report.interactions.push('Three approved object-entry patterns remain; the 390px compact mobile mode presents five bare vertical icon/name entries in one gapless row, keeps full-mode icon identity colors, preserves routes and focus, and quote management uses the clipboard icon');
await page.locator('[data-aipaas-target="object-list"]').click();
assert.equal(await page.locator('.wb-aipaas-table-card').count(),4);
await page.locator('[data-aipaas-segmented] button').nth(1).click();assert.equal(await page.locator('[data-aipaas-segmented] button').nth(1).getAttribute('aria-selected'),'true');
await page.locator('[data-aipaas-target="image"]').click();assert.equal(await page.locator('.wb-aipaas-role-grid img').count(),8);
assert.equal(await page.locator('.wb-aipaas-role-grid img').evaluateAll(images=>images.filter(image=>image.complete&&image.naturalWidth>0).length),8);
await page.locator('[data-theme-config-link]').click();
assert(await page.locator('[data-theme-config-view]').isVisible());assert(await page.locator('#theme-config').isVisible());
assert.match(await page.locator('#themeConfigTitle').textContent(),/主题色配置|Theme color configuration/);
assert.equal(await page.locator('[data-theme-config-link]').getAttribute('aria-pressed'),'true');
const industryColorSource=page.locator('#theme-config > .wb-aipaas-page-head .wb-entity-link');
assert.equal(await industryColorSource.getAttribute('href'),'https://my.feishu.cn/docx/ZizxdOsAEomSBhxKMr6cFkMRnAE');
assert.equal(await industryColorSource.getAttribute('target'),'_blank');
assert.equal(await industryColorSource.getAttribute('rel'),'noopener noreferrer');
const sourcePopupPromise=page.waitForEvent('popup');
await industryColorSource.click();
const sourcePopup=await sourcePopupPromise;
await sourcePopup.close();
await page.bringToFront();
assert.equal(await page.locator('.wb-library-industry-link').count(),2);
assert.equal(await page.locator('.wb-library-industry-examples').isVisible(),false);
assert.equal(await page.locator('[data-industry-link="canvas"]').getAttribute('href'),'../fxiaoke-workbench-canvas.html');
assert.equal(await page.locator('[data-industry-link="canvas"]').getAttribute('target'),'_blank');
assert.equal(await page.locator('[data-industry-link="crm"]').getAttribute('href'),'../fxiaoke-crm-shell.html');
assert.equal(await page.locator('[data-industry-link="crm"]').getAttribute('target'),'_blank');
assert.match((await page.locator('.wb-aipaas-industry-recommend > strong').textContent()).trim(),/行业配色建议|Industry palette recommendations/);
assert.equal(await page.locator('.wb-aipaas-industry-header [role="columnheader"]').count(),3);
assert.equal(await page.locator('.wb-aipaas-industry-row').count(),6);
assert.equal(await page.locator('.wb-aipaas-industry-reason').count(),6);
assert.equal(await page.locator('.wb-palette-chip').count(),7);
const recommendRows=await page.locator('.wb-aipaas-industry-row').evaluateAll(rows=>rows.map(row=>Math.round(row.getBoundingClientRect().top)));
assert.equal(new Set(recommendRows).size,6);
assert(recommendRows.every((top,index)=>index===0||top>recommendRows[index-1]));
const swatches=await page.locator('.wb-palette-chip').evaluateAll(chips=>chips.map(chip=>({color:getComputedStyle(chip,'::before').backgroundColor,width:getComputedStyle(chip,'::before').width,height:getComputedStyle(chip,'::before').height})));
assert(swatches.every(swatch=>swatch.color!=='rgba(0, 0, 0, 0)'&&swatch.width==='10px'&&swatch.height==='10px'));
await page.locator('[data-theme-preview="iris"]').click();
assert.equal(await page.locator('html').getAttribute('data-color-theme'),'iris');assert.equal(await page.locator('[data-theme-preview="iris"]').getAttribute('aria-pressed'),'true');
await page.locator('[data-language-choice="zh"]').click();await page.locator('[data-aipaas-target="text"]').click();
const typeIcon=await page.locator('#aipaas-text .wb-icon svg').evaluate(svg=>{const rect=svg.getBoundingClientRect();const box=svg.getBBox();return{width:rect.width,height:rect.height,artworkWidth:box.width,artworkHeight:box.height,fill:getComputedStyle(svg).fill};});
assert.deepEqual([typeIcon.width,typeIcon.height],[21,21]);
assert(typeIcon.artworkWidth>0&&typeIcon.artworkHeight>0);
assert.notEqual(typeIcon.fill,'none');
await page.locator('[data-aipaas-target="agent"]').click();
const desktopAgent=page.locator('.wb-aipaas-agent-card').filter({has:page.locator('.wb-agent-composer:not(.is-mobile)')});
const agentAvatar=desktopAgent.locator('.wb-aipaas-agent-logo img');assert.equal(await agentAvatar.getAttribute('src'),'./fx-avatar.png');assert.equal(await agentAvatar.evaluate(image=>image.complete&&image.naturalWidth),200);assert.equal(await desktopAgent.locator('.wb-aipaas-agent-welcome h2').evaluate(element=>getComputedStyle(element).fontSize),'24px');
assert.equal(await desktopAgent.locator('.wb-aipaas-agent-welcome h2').evaluate(element=>getComputedStyle(element).fontWeight),'400');
const agentSpacing=await page.evaluate(()=>{const card=document.querySelector('.wb-aipaas-agent-card');const composer=document.querySelector('.wb-aipaas-agent-composer');const welcome=document.querySelector('.wb-aipaas-agent-welcome');const toolbar=composer.querySelector('.wb-aipaas-agent-toolbar');const groups=toolbar.querySelectorAll(':scope > div');const modelLabel=composer.querySelector('.wb-aipaas-agent-model span');return{cardPadding:getComputedStyle(card).padding,welcomeGap:getComputedStyle(welcome).gap,composerMargin:getComputedStyle(composer).marginTop,composerPadding:getComputedStyle(composer).padding,composerHeight:composer.getBoundingClientRect().height,composerRadius:getComputedStyle(composer).borderRadius,suggestionCount:document.querySelectorAll('.wb-aipaas-agent-suggestions').length,selectorLabels:[...composer.querySelectorAll('.wb-agent-selector span:first-of-type')].map(element=>element.textContent.trim()),placeholder:composer.querySelector('textarea').placeholder,sendDisabled:composer.querySelector('[type="submit"]').disabled,modelLabelWidth:modelLabel.getBoundingClientRect().width,selectorsTop:groups[0].getBoundingClientRect().top,actionsTop:groups[1].getBoundingClientRect().top};});
assert.equal(agentSpacing.cardPadding,'20px');assert.equal(agentSpacing.welcomeGap,'20px');assert.equal(agentSpacing.composerMargin,'20px');assert.equal(agentSpacing.composerPadding,'18px 16px 12px');assert(agentSpacing.composerHeight>=160);assert.equal(agentSpacing.composerRadius,'20px');assert.equal(agentSpacing.suggestionCount,0);assert.deepEqual(agentSpacing.selectorLabels,['智能体','Deepseek-V4-Flash']);assert.equal(agentSpacing.placeholder,'发送消息');assert.equal(agentSpacing.sendDisabled,true);assert(agentSpacing.modelLabelWidth>100);assert(agentSpacing.actionsTop>agentSpacing.selectorsTop);
const agentTextarea=page.locator('[data-aipaas-agent-form] textarea');await agentTextarea.click();await page.waitForTimeout(30);const agentFocus=await page.evaluate(()=>{const composer=document.querySelector('.wb-agent-composer');const marker=document.createElement('i');marker.style.color='var(--wb-accent)';document.body.append(marker);const result={borderColor:getComputedStyle(composer).borderTopColor,accentColor:getComputedStyle(marker).color};marker.remove();return result;});assert.equal(agentFocus.borderColor,agentFocus.accentColor);
await agentTextarea.fill('诊断本月重点商机风险');assert.equal(await desktopAgent.locator('button[type="submit"]').isEnabled(),true);await desktopAgent.locator('button[type="submit"]').click();assert(await page.locator('#library-toast').isVisible());
const mobileAgent=page.locator('[data-agent-mobile-showcase]');
const mobileInput=mobileAgent.locator('input');
const mobileSend=mobileAgent.locator('[type="submit"]');
assert.equal(await mobileAgent.locator('.wb-aipaas-agent-logo img').getAttribute('src'),'./fx-avatar.png');
assert.equal(await mobileAgent.locator('.wb-aipaas-agent-logo img').evaluate(image=>image.complete&&image.naturalWidth),200);
assert.equal(await mobileAgent.locator('.wb-agent-send svg').evaluate(svg=>svg.getBoundingClientRect().width),32);
assert(await mobileSend.isDisabled());await mobileInput.fill('   ');assert(await mobileSend.isDisabled());
await mobileInput.fill('查看本周重点商机');assert(await mobileSend.isEnabled());
await page.evaluate(()=>{window.agentMobileSubmits=0;document.querySelector('.wb-agent-composer.is-mobile').addEventListener('submit',()=>window.agentMobileSubmits++);});
await mobileInput.evaluate(input=>input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',isComposing:true,bubbles:true,cancelable:true})));
assert.equal(await page.evaluate(()=>window.agentMobileSubmits),0);
const composingAllowed=await mobileInput.evaluate(input=>input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',isComposing:true,bubbles:true,cancelable:true})));assert.equal(composingAllowed,false);
await mobileInput.press('Enter');assert.equal(await page.evaluate(()=>window.agentMobileSubmits),1);assert(await page.locator('#library-toast').isVisible());
await mobileInput.fill('a'.repeat(600));assert.equal(await mobileAgent.locator('form').evaluate(form=>form.scrollWidth-form.clientWidth),0);
await mobileInput.focus();assert.equal(await mobileInput.evaluate(input=>getComputedStyle(input.closest('form')).borderTopColor),agentFocus.accentColor);
await mobileInput.press('Tab');assert(await mobileAgent.locator('[aria-label="语音输入"]').evaluate(button=>button===document.activeElement));
await page.locator('[data-language-choice="en"]').click();assert.equal(await mobileInput.inputValue(),'a'.repeat(600));assert.equal(await mobileInput.getAttribute('data-wb-field-label'),'Message');assert.equal(await mobileInput.getAttribute('placeholder'),'Message or hold to talk');assert.equal(await mobileAgent.locator('form').getAttribute('aria-label'),'Mobile AI input');
for(const button of await mobileAgent.locator('[type="button"]').all()){await page.locator('#library-toast').evaluate(toast=>toast.hidden=true);await button.click();assert(await page.locator('#library-toast').isVisible());}
await mobileInput.fill('');assert(await mobileSend.isDisabled());await page.locator('[data-language-choice="zh"]').click();
const inputOnly=page.locator('[data-agent-mobile-inputonly-showcase] .wb-aipaas-preview');
const inputOnlyForm=inputOnly.locator('form');
assert.equal(await inputOnly.locator('.wb-aipaas-agent-card').count(),0);
assert.equal(await inputOnly.locator('.wb-aipaas-agent-logo').count(),0);
assert.equal(await inputOnly.locator('h2').count(),0);
assert.equal(await inputOnlyForm.getAttribute('data-wb-semantic'),'ai-entry');
assert.equal(await inputOnlyForm.getAttribute('data-wb-component'),'ai-composer');
assert.equal(await inputOnlyForm.evaluate(form=>Math.round(form.getBoundingClientRect().height)),56);
assert.equal(await inputOnlyForm.evaluate(form=>getComputedStyle(form).borderRadius),'20px');
assert.equal(await inputOnlyForm.evaluate(form=>form.scrollWidth-form.clientWidth),0);
assert.equal(await inputOnlyForm.locator('button').count(),4);
for(const button of await inputOnlyForm.locator('button').all()){assert(await button.evaluate(b=>b.getBoundingClientRect().width>=44&&b.getBoundingClientRect().height>=44));}
const inputOnlyInput=inputOnlyForm.locator('input');const inputOnlySend=inputOnlyForm.locator('[type="submit"]');
assert.equal(await inputOnlyInput.getAttribute('data-wb-field-key'),'message');
assert.equal(await inputOnlyInput.getAttribute('placeholder'),'发消息或按住说话');
assert(await inputOnlySend.isDisabled());await inputOnlyInput.fill('   ');assert(await inputOnlySend.isDisabled());
await inputOnlyInput.fill('仅输入框发送测试');assert(await inputOnlySend.isEnabled());await inputOnlySend.click();assert(await page.locator('#library-toast').isVisible());
await inputOnlyInput.fill('');assert(await inputOnlySend.isDisabled());
report.interactions.push('Composer-only mobile Agent variant drops the card, avatar, and greeting while keeping the shared 56px single-line composer, ai-entry/ai-composer semantics, message field metadata, 44px targets, whitespace-disabled send, and unconnected-service feedback');
report.interactions.push('Independent mobile Agent: preserved avatar and greeting, 44px targets/32px send artwork, whitespace-disabled send, Enter submission, IME protection, 600-character containment, keyboard focus, bilingual state preservation, and unconnected-service feedback for all three utility buttons');
report.interactions.push('Three approved object-entry patterns each preserve five entries; vertical full is absent, horizontal cards stay 64px, vertical name-only stays at least 128px, and name-only patterns contain no scenario/value nodes. Four source-faithful list structures, working segmented dimension, eight loaded role images, industry workbench links, Iris theme application, visible typography icon, 20px Agent outer rhythm, 160px shared composer, 200px fx-avatar asset, 24px/400 Agent greeting, no prompt suggestions, stateful send, and AI Agent submit feedback');
await page.locator('[data-library-filter="all"]').click();await page.locator('[data-style-choice="rich"]').click();
const roleSwitcher=page.locator('[data-rich-header-role-switcher]');const roleTabs=roleSwitcher.locator('[data-wb-role-tab]');assert.equal(await roleTabs.count(),8);
await roleSwitcher.locator('[data-role-image="销售.png"]').click();
assert.equal(await page.locator('#catalogRichHeaderDemo').getAttribute('data-wb-role-image'),'销售.png');assert((await page.locator('#catalogRichHeaderDemo .wb-rich-header-role img').getAttribute('src')).endsWith('/销售.png')||(await page.locator('#catalogRichHeaderDemo .wb-rich-header-role img').getAttribute('src')).endsWith('销售.png'));assert.equal(await roleSwitcher.locator('[data-wb-role-tab][aria-selected="true"]').count(),1);
const salesGradient=await page.locator('#catalogRichHeaderDemo').evaluate(element=>({from:getComputedStyle(element).getPropertyValue('--wb-rich-header-role-gradient-from').trim(),to:getComputedStyle(element).getPropertyValue('--wb-rich-header-role-gradient-to').trim()}));assert.equal(salesGradient.from,'rgba(255, 231, 244, 0.20)');assert.equal(salesGradient.to,'rgba(242, 132, 191, 0.20)');
await roleSwitcher.locator('[data-wb-role-tab][aria-selected="true"]').press('Home');assert.equal(await page.locator('#catalogRichHeaderDemo').getAttribute('data-wb-role-image'),'分析师-女.png');await roleSwitcher.locator('[data-wb-role-tab][aria-selected="true"]').press('End');assert.equal(await page.locator('#catalogRichHeaderDemo').getAttribute('data-wb-role-image'),'销售.png');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);
report.interactions.push('Eight Rich Header role tabs switch the role asset, exact clothing-color gradient and render calibration by click and keyboard without page overflow');
await page.locator('[data-aipaas-target="welcome-card"]').click();
await page.locator('[data-language-choice="en"]').click();
report.interactions.push(`${report.states.length} viewport/language/theme/style/palette states: no page, card or registered-grid overflow; 32px controls and semantic metadata valid`);
await page.setViewportSize({width:1440,height:900});
await page.locator('[data-library-filter="insights"]').click();assert.equal(await page.locator('.wb-library-item:visible').count(),1);assert(await page.locator('#metric-card-example').isVisible());
assert.equal(await page.locator('.wb-library-intro').isVisible(),false);
assert.equal(await page.locator('.wb-library-industry-examples').isVisible(),false);
const metricSpan=await page.evaluate(()=>{const item=document.getElementById('metric-card-example');const grid=item.parentElement;return{item:Math.round(item.getBoundingClientRect().width),grid:Math.round(grid.getBoundingClientRect().width)};});
assert.equal(metricSpan.item,metricSpan.grid);
await page.locator('[data-library-filter="all"]').click();
assert.equal(await page.locator('.wb-library-item:visible').count(),1);
assert.equal(await page.locator('.wb-library-intro').isVisible(),true);
assert.equal(await page.locator('.wb-library-industry-examples').isVisible(),true);
assert.equal(await page.locator('[data-library-section="insights"]').isVisible(),false);
assert.equal(await page.locator('#library-search,#library-empty').count(),0);
await page.locator('[data-library-filter="insights"]').click();
await page.locator('#metric-card-example summary').click();assert(await page.locator('#metric-card-example pre').isVisible());
const copiedSource=await page.locator('#metric-card-example pre code').textContent();assert(copiedSource.includes('data-wb-value="6703.5"'));assert(copiedSource.includes('data-wb-semantic="kpi-card"'));
// Exercise the browser clipboard when file:// allows it, otherwise verify the explicit selectable-source fallback.
await page.locator('#metric-card-example [data-contract-body] button').click();
await page.waitForFunction(()=>/Copied|Select and copy/.test(document.querySelector('#metric-card-example [data-contract-body] button').textContent));
await page.locator('#metric-card-example summary').click();
await page.locator('[data-composite-cards-link]').click();
const analysisSpan=await page.evaluate(()=>{const item=document.getElementById('analysis-card-example');const grid=item.parentElement;return{item:Math.round(item.getBoundingClientRect().width),grid:Math.round(grid.getBoundingClientRect().width)};});
assert.equal(analysisSpan.item,analysisSpan.grid);
report.interactions.push('Introduction omits the repeated metrics group; dedicated metric and composite-analysis examples span the full content column, while semantic mapping plus copy/source fallback remain available');
await page.locator('[data-library-filter="all"]').click();
await page.setViewportSize({width:390,height:844});
await page.locator('[data-language-choice="en"]').click();await page.locator('[data-style-choice="rich"]').click();
await page.locator('#rich-header-card-example .wb-page-period button').first().click();assert.equal(await page.locator('#rich-header-card-example .wb-page-period button').first().getAttribute('aria-pressed'),'true');
await page.locator('[data-composite-cards-link]').click();assert.equal(await page.locator('[data-composite-cards-grid] .wb-library-item:visible').count(),3);assert.equal(await page.locator('[data-composite-cards-grid] .wb-composite-card').count(),3);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);
const chart=page.locator('#analysis-card-example .wb-chart-interactive').first();await chart.focus();assert(await page.locator('.wb-chart-tooltip').isVisible());
report.interactions.push('Mobile English composite navigation exposes three complete examples without overflow; reporting-period selection and chart focus tooltip remain functional');
await page.locator('[data-palette-trigger]').click();await page.locator('[data-color-choice="spruce"]').click();await page.locator('[data-theme-choice="dark"]').click();await page.reload();
assert.equal(await page.locator('html').getAttribute('data-color-theme'),'spruce');assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');assert.equal(await page.locator('html').getAttribute('lang'),'en');
report.interactions.push('Palette, appearance, style and language preferences survive a physical file reload');
for(const size of [{width:1440,height:900},{width:1024,height:768},{width:390,height:844}]) {
 await page.setViewportSize(size);
 await page.locator('[data-language-choice="zh"]').click();await page.locator('[data-theme-choice="light"]').click();await page.locator('[data-palette-trigger]').click();await page.locator('[data-color-choice="classic"]').click();
 for(const group of ['insights']) {
  await page.locator(`[data-library-filter="${group}"]`).click();await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:path.join(output,`${size.width}-${group}.png`),fullPage:true});
 }
 await page.locator('[data-composite-cards-link]').click();await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:path.join(output,`${size.width}-composite-cards.png`),fullPage:true});
 await page.locator('[data-theme-config-link]').click();await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:path.join(output,`${size.width}-theme-config.png`),fullPage:true});
 await page.locator('[data-library-filter="all"]').click();await page.locator('[data-language-choice="en"]').click();await page.locator('[data-theme-choice="dark"]').click();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(output,`${size.width}-dark-en.png`),fullPage:true});
 for(const target of aipaasTargets) { await page.locator(`[data-aipaas-target="${target}"]`).click();await page.locator('[data-language-choice="zh"]').click();await page.locator('[data-theme-choice="light"]').click();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(output,`${size.width}-aipaas-${target}.png`),fullPage:true}); }
}
assert.deepEqual(errors,[]);
await fs.writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({states:report.states.length,compositeCardStates:report.compositeCardStates.length,interactions:report.interactions,errors,output},null,2));
} finally { await browser.close(); }
