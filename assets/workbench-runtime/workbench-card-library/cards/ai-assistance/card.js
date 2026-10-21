(function () {
  'use strict';
  const labels = {'待办事项':'Required action','状态':'Status','来源对话':'Conversation','触发 Agent':'Triggered by','协助类型':'Request type','待处理条数':'Pending count'};
  document.querySelectorAll('.wb-ai-assistance-card').forEach(card => {
    const fields = [...card.querySelectorAll('[data-wb-field-key]')];
    fields.forEach(field => { field.dataset.assistanceLabelZh = field.dataset.wbFieldLabel; });
    const list = card.querySelector('.wb-ai-assistance-items');
    const count = card.querySelector('[data-assistance-count]');
    function refresh() {
      list.querySelectorAll('[data-assistance-state]').forEach(row => {
        if (row.dataset.assistanceState !== 'pending') row.remove();
      });
      const total = list.querySelectorAll('[data-assistance-state="pending"]').length;
      count.textContent = total ? String(total) : '';
      count.dataset.wbValue = String(total);
      count.hidden = total === 0;
      card.querySelector('[data-assistance-empty]').hidden = total > 0;
    }
    function syncLabels() {
      fields.forEach(field => { const original = field.dataset.assistanceLabelZh; field.dataset.wbFieldLabel = document.documentElement.lang === 'en' ? labels[original] || original : original; });
    }
    new MutationObserver(refresh).observe(list, {childList:true, subtree:true, attributes:true, attributeFilter:['data-assistance-state']});
    document.addEventListener('catalog:language', syncLabels);
    syncLabels();
    refresh();
  });
}());
