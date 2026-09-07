(function () {
  'use strict';
  const root = document.documentElement;
  const items = [...document.querySelectorAll('.wb-library-item')];
  const search = document.getElementById('library-search');
  const clear = document.getElementById('library-clear');
  const filters = [...document.querySelectorAll('[data-library-filter]')];
  let group = 'all';
  const dictionary = () => window.CatalogMessages[root.lang === 'en' ? 'en' : 'zh'];
  const t = key => dictionary()[key] || key;
  const originals = new Map();
  const searchable = new Map();
  const fieldLabels = new Map();
  document.querySelectorAll('[data-wb-field-label]').forEach(node => fieldLabels.set(node, node.dataset.wbFieldLabel));
  items.forEach(item => {
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
    const keys = [...item.querySelectorAll('[data-i18n]')].map(el => el.dataset.i18n);
    searchable.set(item, [item.id, item.textContent, ...keys.flatMap(key => [window.CatalogMessages.zh[key],window.CatalogMessages.en[key]]), ...[...item.querySelectorAll('[data-wb-semantic]')].flatMap(el => [el.dataset.wbSemantic,el.dataset.wbComponent]), ...[...item.querySelectorAll('[data-wb-field-key]')].map(el => el.dataset.wbFieldKey)].join(' ').toLowerCase());
  });
  function filter() {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    items.forEach(item => {
      const visible = (group === 'all' || item.dataset.libraryGroup === group) && (!query || searchable.get(item).includes(query));
      item.hidden = !visible;
      if (visible) count++;
    });
    document.querySelectorAll('[data-library-section]').forEach(section => {
      const visibleCount = [...section.querySelectorAll('.wb-library-item')].filter(item => !item.hidden).length;
      section.hidden = !visibleCount;
      section.querySelector('[data-group-count]').textContent = visibleCount;
    });
    filters.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.libraryFilter === group)));
    document.getElementById('library-result-count').textContent = count;
    document.getElementById('library-empty').hidden = count > 0;
    clear.hidden = !search.value;
  }
  filters.forEach(button => button.addEventListener('click', () => { group=button.dataset.libraryFilter; filter(); }));
  search.addEventListener('input',filter);
  function reset() { group='all'; search.value=''; filter(); search.focus(); }
  clear.addEventListener('click',reset);
  document.getElementById('library-reset').addEventListener('click',reset);
  search.addEventListener('keydown',event => { if(event.key==='Escape') {event.preventDefault();reset();} });
  function showHash() {
    const item=items.find(item => '#'+item.id===location.hash);
    if (!item) return;
    group='all';search.value='';filter();
    requestAnimationFrame(() => item.scrollIntoView({block:'start'}));
  }
  window.addEventListener('hashchange',showHash);
  function renderContracts() {
    items.forEach(item => {
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
    document.querySelector('.wb-ai-composer textarea').placeholder=t('sendPlaceholder');
    // Keep field labels synchronized without changing their stable field keys or original values.
    const reverse=new Map(Object.entries(window.CatalogMessages.zh).map(([key,value])=>[value,key]));
    fieldLabels.forEach((original,node)=>{node.dataset.wbFieldLabel=root.lang==='en'?(window.CatalogMessages.en[reverse.get(original)]||({数量:'Count',预计金额:'Expected amount',全局搜索关键词:'Global search query',列表搜索关键词:'List search query'}[original])||original):original;});
    filter();
  }
  let toastTimer;
  function notifySample() { const toast=document.getElementById('library-toast');toast.textContent=t('sampleResult');toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.hidden=true,3500); }
  document.querySelector('.wb-ai-composer').addEventListener('submit',event=>{event.preventDefault();notifySample();});
  // Samples retain all commands and clearly report their unconnected business-service boundary.
  document.querySelectorAll('.wb-library-preview button').forEach(button=>{
    if(button.closest('.wb-select,.wb-segmented,.wb-filter-segmented,.wb-workspace-tab-list,.wb-ai-composer')) return;
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
  document.querySelectorAll('.wb-library-preview .wb-page-period, .wb-library-preview .wb-filter-segmented').forEach(container=>{
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
  document.addEventListener('catalog:language',renderContracts);
  renderContracts();showHash();
}());
