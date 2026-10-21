(function () {
  'use strict';
  const englishLabels = {
    '总数': 'Total', '事项': 'Item', '时间': 'Time', '说明': 'Details',
    '状态': 'Status', '剩余时间': 'Time remaining', '关注对象': 'Followed record',
    '对象类型': 'Record type', '记录数': 'Record count'
  };
  const fields = [...document.querySelectorAll('.wb-info-list-card [data-wb-field-key]')];
  fields.forEach(field => {
    field.dataset.infoFieldLabelZh = field.dataset.wbFieldLabel;
    if (!field.hasAttribute('data-wb-value')) field.dataset.wbValue = field.dataset.copyZh || field.textContent.trim();
  });
  function syncFieldLabels() {
    const english = document.documentElement.lang === 'en';
    fields.forEach(field => {
      const label = field.dataset.infoFieldLabelZh;
      field.dataset.wbFieldLabel = english ? englishLabels[label] || label : label;
      if (field.hasAttribute('data-wb-unit')) field.dataset.wbUnit = english ? 'days' : '天';
    });
  }
  document.addEventListener('catalog:language', syncFieldLabels);
  syncFieldLabels();
}());
