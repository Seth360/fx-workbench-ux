(function () {
  'use strict';
  const root = document.documentElement;
  const allItems = [...document.querySelectorAll('.wb-library-item')];
  const filters = [...document.querySelectorAll('[data-library-filter]')];
  const catalogView = document.querySelector('[data-library-catalog-view]');
  const compositeView = document.querySelector('[data-composite-cards-view]');
  const compositeLink = document.querySelector('[data-composite-cards-link]');
  const compositeGrid = document.querySelector('[data-composite-cards-grid]');
  const compositeItems = ['analysis-card-example','composite-hierarchy-example','density-components-example'].map(id => document.getElementById(id)).filter(Boolean);
  compositeItems.forEach(item => compositeGrid.append(item));
  const items = [...catalogView.querySelectorAll('.wb-library-item')];
  const themeView = document.querySelector('[data-theme-config-view]');
  const themeLink = document.querySelector('[data-theme-config-link]');
  const aipaasView = document.querySelector('[data-aipaas-view]');
  const aipaasLinks = [...document.querySelectorAll('[data-aipaas-target]')];
  const aipaasPages = [...document.querySelectorAll('[data-aipaas-page]')];
  const catalogIntro = document.querySelector('.wb-library-intro');
  const industryExamples = document.querySelector('.wb-library-industry-examples');
  let group = 'all';
  const dictionary = () => window.CatalogMessages[root.lang === 'en' ? 'en' : 'zh'];
  const t = key => dictionary()[key] || key;
  const originals = new Map();
  const fieldLabels = new Map();
  document.querySelectorAll('[data-wb-field-label]').forEach(node => fieldLabels.set(node, node.dataset.wbFieldLabel));
  allItems.forEach(item => {
    const preview = item.querySelector('.wb-library-preview');
    const clone = preview.cloneNode(true);
    // Copy a portable shared-component source, without initialized animation state or catalog chrome.
    clone.querySelectorAll('[data-wb-select]').forEach(select => {
      select.removeAttribute('data-wb-select-ready');
      select.classList.remove('is-ready', 'is-open');
      select.querySelector('[data-wb-select-trigger]').hidden = true;
      select.querySelector('[data-wb-select-menu]').hidden = true;
    });
    originals.set(item, clone.innerHTML.trim());
  });
  function filter() {
    const showOverview = group === 'all';
    catalogIntro.hidden = !showOverview;
    industryExamples.hidden = !showOverview;
    items.forEach(item => {
      const visible = group === 'all' ? item.dataset.libraryGroup === 'foundation' : item.dataset.libraryGroup === group;
      item.hidden = !visible;
    });
    document.querySelectorAll('[data-library-section]').forEach(section => {
      const visibleCount = [...section.querySelectorAll('.wb-library-item')].filter(item => !item.hidden).length;
      section.hidden = !visibleCount;
      section.querySelector('[data-group-count]').textContent = visibleCount;
    });
    filters.forEach(button => button.setAttribute('aria-pressed',String(!catalogView.hidden && button.dataset.libraryFilter === group)));
    themeLink.setAttribute('aria-pressed','false');
    compositeLink.removeAttribute('aria-current');
  }
  function showCatalog() {
    catalogView.hidden = false;
    themeView.hidden = true;
    aipaasView.hidden = true;
    compositeView.hidden = true;
    themeLink.setAttribute('aria-pressed','false');
    aipaasLinks.forEach(link => link.removeAttribute('aria-current'));
    compositeLink.removeAttribute('aria-current');
  }
  function showThemeConfig(focusPage = false) {
    catalogView.hidden = true;
    themeView.hidden = false;
    aipaasView.hidden = true;
    compositeView.hidden = true;
    filters.forEach(button => button.setAttribute('aria-pressed','false'));
    themeLink.setAttribute('aria-pressed','true');
    aipaasLinks.forEach(link => link.removeAttribute('aria-current'));
    compositeLink.removeAttribute('aria-current');
    if (focusPage) requestAnimationFrame(() => {
      const heading = document.getElementById('themeConfigTitle');
      heading?.scrollIntoView({block:'start'});
      if (heading) { heading.tabIndex=-1;heading.focus({preventScroll:true}); }
    });
    return true;
  }
  function showAipaas(target, focusPage = false) {
    const page = aipaasPages.find(item => item.dataset.aipaasPage === target);
    if (!page) return false;
    catalogView.hidden = true;
    themeView.hidden = true;
    aipaasView.hidden = false;
    compositeView.hidden = true;
    aipaasPages.forEach(item => { item.hidden = item !== page; });
    aipaasLinks.forEach(link => {
      if (link.dataset.aipaasTarget === target) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
    filters.forEach(button => button.setAttribute('aria-pressed','false'));
    themeLink.setAttribute('aria-pressed','false');
    compositeLink.removeAttribute('aria-current');
    if (focusPage) requestAnimationFrame(() => { page.scrollIntoView({block:'start'});page.tabIndex=-1;page.focus({preventScroll:true}); });
    return true;
  }
  function showCompositeCards(focusPage = false) {
    catalogView.hidden = true;
    themeView.hidden = true;
    aipaasView.hidden = true;
    compositeView.hidden = false;
    filters.forEach(button => button.setAttribute('aria-pressed','false'));
    themeLink.setAttribute('aria-pressed','false');
    aipaasLinks.forEach(link => link.removeAttribute('aria-current'));
    compositeLink.setAttribute('aria-current','page');
    if (focusPage) requestAnimationFrame(() => {
      const page = document.getElementById('composite-cards');
      page?.scrollIntoView({block:'start'});
      if (page) { page.tabIndex=-1;page.focus({preventScroll:true}); }
    });
    return true;
  }
  filters.forEach(button => button.addEventListener('click', () => { showCatalog();group=button.dataset.libraryFilter;filter(); }));
  themeLink.addEventListener('click', () => {
    history.pushState(null,'','#theme-config');
    showThemeConfig(true);
  });
  aipaasLinks.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const target=link.dataset.aipaasTarget;
    history.pushState(null,'','#aipaas-'+target);
    showAipaas(target,true);
  }));
  compositeLink.addEventListener('click', event => {
    event.preventDefault();
    history.pushState(null,'','#composite-cards');
    showCompositeCards(true);
  });
  function showHash() {
    if (location.hash.startsWith('#aipaas-') && showAipaas(location.hash.slice(8))) return;
    if (location.hash === '#theme-config') { showThemeConfig(true);return; }
    if (location.hash === '#composite-cards') { showCompositeCards(true);return; }
    const item=allItems.find(item => '#'+item.id===location.hash);
    if (!item) return;
    if (compositeItems.includes(item)) showCompositeCards();
    else { showCatalog();group=item.dataset.libraryGroup === 'insights' ? 'insights' : 'all';filter(); }
    requestAnimationFrame(() => item.scrollIntoView({block:'start'}));
  }
  window.addEventListener('hashchange',showHash);
  window.addEventListener('popstate',showHash);
  function renderContracts() {
    document.querySelectorAll('.wb-aipaas-table-card .wb-table').forEach(table=>{
      const headers=new Map([...table.querySelectorAll('th[id][data-wb-field-key]')].map(th=>[th.id,th.dataset.wbFieldKey]));
      table.querySelectorAll('td[headers]').forEach(cell=>{const key=headers.get(cell.getAttribute('headers'));if(key)cell.dataset.wbFieldKey=key;});
    });
    allItems.forEach(item => {
      const body=item.querySelector('[data-contract-body]');
      const preview=item.querySelector('.wb-library-preview');
      const mappings=[...new Set([...preview.querySelectorAll('[data-wb-semantic]')].map(el=>el.dataset.wbSemantic+' → '+el.dataset.wbComponent))];
      const p=document.createElement('p');p.textContent=mappings.length?t('mapping'):t('noSemantic');
      const list=document.createElement('div');list.className='wb-library-mapping';
      (mappings.length?mappings:[item.querySelector('summary code').textContent]).forEach(mapping => {const code=document.createElement('code');code.textContent=mapping;list.append(code);});
      const meta=document.createElement('p');meta.textContent=preview.querySelectorAll('[data-wb-field-key]').length+' '+t('fieldCount');
      const button=document.createElement('button');button.type='button';button.className='wb-compact-action';button.textContent=t('copySnippet');
      const source=document.createElement('pre');const code=document.createElement('code');code.textContent=originals.get(item);source.append(code);source.tabIndex=0;
      button.addEventListener('click',async()=>{
        try { await navigator.clipboard.writeText(originals.get(item));button.textContent=t('copied'); }
        catch { const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(code);selection.removeAllRanges();selection.addRange(range);button.textContent=t('copyFailed');source.focus(); }
      });
      const link=document.createElement('a');link.href='./SEMANTIC_COMPONENTS.md';link.textContent=t('readSemantic');
      body.replaceChildren(p,list,meta,button,source,link);
    });
    const english=root.lang==='en';
    const labels={
      '重点商机推进':'Priority opportunities','管理范围经营对比':'Management scope comparison','今日需要处理':'Actions for today','销售线索明细':'Sales lead details','CRM 快捷入口':'CRM quick entries','洞察计数':'Insight counts','AI 输入区域':'AI input','移动端 AI 输入区域':'Mobile AI input','移动端 AI 输入区域（仅输入框）':'Mobile AI input (composer only)','重新生成':'Regenerate','语音输入模式':'Voice input mode','向 AI Agent 发送消息':'Send a message to AI Agent','智能体类型':'Agent type','模型选择':'Model selection','添加附件':'Add attachment','语音输入':'Voice input','发送消息':'Send message','搜索销售线索':'Search sales leads','经营对比维度':'Comparison dimension','搜索':'Search','筛选':'Filter','上一页':'Previous page','下一页':'Next page'
    };
    document.querySelectorAll('.wb-aipaas-page [aria-label]:not([data-copy-aria-zh])').forEach(node=>{if(!node.dataset.aipaasAriaZh)node.dataset.aipaasAriaZh=node.getAttribute('aria-label');const original=node.dataset.aipaasAriaZh;node.setAttribute('aria-label',english?(labels[original]||original):original);});
    // Keep field labels synchronized without changing their stable field keys or original values.
    const reverse=new Map(Object.entries(window.CatalogMessages.zh).map(([key,value])=>[value,key]));
    fieldLabels.forEach((original,node)=>{if(node.closest('.wb-info-list-card,.wb-ai-assistance-card'))return;node.dataset.wbFieldLabel=root.lang==='en'?(window.CatalogMessages.en[reverse.get(original)]||({数量:'Count',预计金额:'Expected amount',区域:'Region',消息:'Message',全局搜索关键词:'Global search query',列表搜索关键词:'List search query'}[original])||original):original;});
    filter();
  }
  let toastTimer;
  function notifySample() { const toast=document.getElementById('library-toast');toast.textContent=t('sampleResult');toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.hidden=true,3500); }
  document.querySelectorAll('[data-aipaas-agent-form]').forEach(form=>{
    const input=form.querySelector('textarea,input');
    const submit=form.querySelector('[type="submit"]');
    const syncSubmit=()=>{ submit.disabled=!input.value.trim(); };
    input.addEventListener('input',syncSubmit);
    form.addEventListener('submit',event=>{event.preventDefault();if(submit.disabled)return;notifySample();});
    if(form.classList.contains('is-mobile')) {
      input.addEventListener('keydown',event=>{if(event.key==='Enter'&&(event.isComposing||event.keyCode===229))event.preventDefault();});
      form.querySelectorAll('[type="button"]').forEach(button=>button.addEventListener('click',notifySample));
    }
    syncSubmit();
  });
  const roleVisuals=Object.freeze({
    '分析师-女.png':{from:'rgba(255, 235, 232, 0.20)',to:'rgba(255, 150, 137, 0.20)',renderSize:261},
    '分析师-男.png':{from:'rgba(255, 242, 224, 0.20)',to:'rgba(255, 174, 94, 0.20)',renderSize:262},
    '客服.png':{from:'rgba(241, 235, 255, 0.20)',to:'rgba(154, 129, 255, 0.20)',renderSize:273},
    '总监.png':{from:'rgba(229, 238, 255, 0.20)',to:'rgba(144, 181, 255, 0.20)',renderSize:261},
    '服务工程师.png':{from:'rgba(255, 248, 219, 0.20)',to:'rgba(255, 199, 73, 0.20)',renderSize:255},
    '服务总监.png':{from:'rgba(239, 255, 220, 0.20)',to:'rgba(164, 225, 89, 0.20)',renderSize:255},
    '用户.png':{from:'rgba(255, 231, 244, 0.20)',to:'rgba(242, 132, 191, 0.20)',renderSize:279},
    '销售.png':{from:'rgba(255, 231, 244, 0.20)',to:'rgba(242, 132, 191, 0.20)',renderSize:269}
  });
  document.querySelectorAll('[data-rich-header-role-switcher]').forEach(switcher=>{
    const tabs=[...switcher.querySelectorAll('[data-wb-role-tab]')];
    const header=document.getElementById(tabs[0]?.getAttribute('aria-controls'));
    const roleImage=header?.querySelector('.wb-rich-header-role img');
    if(!header||!roleImage||!tabs.length)return;
    tabs.forEach(tab=>{
      const visual=roleVisuals[tab.dataset.roleImage];
      if(!visual)return;
      const avatar=tab.querySelector('.wb-role-switcher-avatar');
      avatar?.style.setProperty('--wb-role-tab-gradient-from',visual.from);
      avatar?.style.setProperty('--wb-role-tab-gradient-to',visual.to);
    });
    function selectRole(tab,focus=false){
      const visual=roleVisuals[tab.dataset.roleImage];
      if(!visual)return;
      tabs.forEach(item=>{const selected=item===tab;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;});
      header.dataset.wbRoleImage=tab.dataset.roleImage;
      header.style.setProperty('--wb-rich-header-role-gradient-from',visual.from);
      header.style.setProperty('--wb-rich-header-role-gradient-to',visual.to);
      header.style.setProperty('--wb-rich-header-role-render-size',visual.renderSize+'px');
      roleImage.setAttribute('src','./role-image/'+tab.dataset.roleImage);
      if(focus){tab.focus();tab.scrollIntoView({block:'nearest',inline:'nearest'});}
    }
    tabs.forEach(tab=>tab.addEventListener('click',()=>selectRole(tab)));
    switcher.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();
      const current=Math.max(0,tabs.indexOf(document.activeElement));
      const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(current+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
      selectRole(tabs[next],true);
    });
    selectRole(tabs.find(tab=>tab.getAttribute('aria-selected')==='true')||tabs[0]);
  });
  // Samples retain all commands and clearly report their unconnected business-service boundary.
  document.querySelectorAll('.wb-library-preview button,.wb-aipaas-preview button').forEach(button=>{
    if(button.closest('.wb-select,.wb-segmented,.wb-filter-segmented,.wb-workspace-tab-list,.wb-role-switcher,.wb-ai-composer,[data-aipaas-agent-form]')) return;
    button.addEventListener('click',notifySample);
  });
  document.querySelectorAll('.wb-library-actions [role="group"]').forEach(container=>{
    const buttons=[...container.querySelectorAll('button')];
    buttons.forEach(button=>button.setAttribute('aria-pressed',button.getAttribute('aria-selected')||'false'));
    container.addEventListener('click',()=>buttons.forEach(button=>button.setAttribute('aria-pressed',button.getAttribute('aria-selected'))));
    container.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();const i=buttons.indexOf(document.activeElement);const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(i+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[next].click();buttons[next].focus();
    });
  });
  document.querySelectorAll('.wb-library-preview .wb-page-period, .wb-library-preview .wb-filter-segmented, .wb-aipaas-preview .wb-page-period, .wb-aipaas-preview .wb-filter-segmented, [data-aipaas-segmented]').forEach(container=>{
    if(container.hasAttribute('data-assistance-filters')) return;
    const buttons=[...container.querySelectorAll('button')];
    const attr=container.classList.contains('wb-page-period')?'aria-pressed':'aria-selected';
    function select(button) { buttons.forEach(item=>item.setAttribute(attr,String(item===button))); }
    buttons.forEach(button=>button.addEventListener('click',()=>select(button)));
    container.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();const i=buttons.indexOf(document.activeElement);const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(i+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[next].click();buttons[next].focus();
    });
  });
  const paletteMenu=document.querySelector('[data-palette-menu]');
  document.querySelector('[data-palette-trigger]').addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();if(paletteMenu.hidden)event.currentTarget.click();paletteMenu.querySelector('[aria-checked="true"]').focus();}});
  paletteMenu.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;event.preventDefault();const buttons=[...paletteMenu.querySelectorAll('button')];const i=buttons.indexOf(document.activeElement);const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(i+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[next].focus();});
  const themeOptions=[...document.querySelectorAll('[data-theme-preview]')];
  function syncThemeOptions() { themeOptions.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themePreview===root.dataset.colorTheme))); }
  themeOptions.forEach(button=>button.addEventListener('click',()=>{const choice=document.querySelector(`[data-color-choice="${button.dataset.themePreview}"]`);if(choice)choice.click();syncThemeOptions();}));
  document.querySelectorAll('[data-color-choice]').forEach(button=>button.addEventListener('click',syncThemeOptions));
  document.addEventListener('catalog:language',renderContracts);
  renderContracts();syncThemeOptions();showHash();
}());
