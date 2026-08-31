(function () {
  "use strict";

  const T = (zh, en) => `<span data-customer-lang="zh">${zh}</span><span data-customer-lang="en" hidden>${en}</span>`;
  const icon = (name) => `<svg class="fx-svg" aria-hidden="true"><use href="#vg-${name}"></use></svg>`;
  const chevron = () => '<svg class="customer-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"></path></svg>';
  const action = (labelZh, labelEn, messageZh, messageEn, className = "") =>
    `<button class="wb-compact-action ${className}" type="button" data-customer-action data-message-zh="${messageZh}" data-message-en="${messageEn}">${T(labelZh, labelEn)}</button>`;

  const render = () => `
    <div class="customer-insight-page wb-inner" data-language-fixed>
      <header class="wb-header customer-page-header">
        <div class="wb-title-group"><h1>${T("客户经营洞察", "Customer Operating Insight")}</h1><p>${T("苏州精密注塑有限公司 · 基于 CRM 可核验事实", "Suzhou Precision Injection Molding Co., Ltd. · Based on verifiable CRM facts")}</p></div>
        <div class="customer-header-actions wb-compact-action-group">${action("刷新洞察", "Refresh insight", "已按当前客户刷新经营洞察", "Operating insight refreshed for this customer")}${action("打开 CRM", "Open CRM", "打开CRM原生客户详情", "Open the native CRM customer detail", "is-primary")}</div>
      </header>

      <section class="wb-card wb-flush-card customer-record-card" data-od-id="customer-insight-record">
        <div class="customer-breadcrumb"><b>CRM</b>${chevron()}<span>${T("客户列表", "Customer list")}</span>${chevron()}<strong>${T("苏州精密注塑有限公司", "Suzhou Precision Injection Molding Co., Ltd.")}</strong></div>
        <div class="customer-record-main">
          <div class="customer-record-identity"><span class="wb-icon" style="--wb-tone:var(--wb-blue)">${icon("users-three")}</span><div><small>${T("CRM原生客户详情", "Native CRM customer detail")}</small><h2>${T("苏州精密注塑有限公司", "Suzhou Precision Injection Molding Co., Ltd.")}</h2><p>${T("负责人：李经理 · 客户级别A · 华东", "Owner: Manager Li · Customer level A · East China")}</p></div></div>
          <div class="customer-record-actions">${action("编辑", "Edit", "打开CRM原生客户编辑页", "Open the native CRM customer edit page", "is-primary")}${action("销售记录", "Sales records", "打开该客户的销售记录", "Open sales records for this customer")}${action("更多", "More", "打开更多客户原生操作", "Open more native customer actions")}</div>
        </div>
        <nav class="customer-record-tabs" data-customer-aria-zh="CRM客户记录视图" data-customer-aria-en="CRM customer record views"><button type="button" data-customer-action data-message-zh="切换到基本信息" data-message-en="Switch to basic information">${T("基本信息", "Basic information")}</button><button type="button" data-customer-action data-message-zh="切换到销售记录" data-message-en="Switch to sales records">${T("销售记录", "Sales records")}</button><button type="button" data-customer-action data-message-zh="切换到相关信息" data-message-en="Switch to related information">${T("相关信息", "Related information")}</button><button class="active" type="button" aria-current="page">${T("客户经营洞察", "Customer operating insight")}</button></nav>
      </section>

      <section class="customer-metric-grid wb-summary-metric-grid wb-metric-grid" data-od-id="customer-insight-profile-metrics" data-customer-aria-zh="客户档案与经营指标" data-customer-aria-en="Customer profile and operating metrics">
        <button class="wb-metric is-blue" type="button" data-customer-action data-message-zh="打开客户档案中的客户级别" data-message-en="Open customer level in the customer profile"><span class="wb-metric-label"><span>${T("客户级别", "Customer level")}</span>${icon("users-three")}</span><strong>A</strong><small>${T("来自客户档案", "From customer profile")}</small></button>
        <button class="wb-metric is-green" type="button" data-customer-action data-message-zh="打开客户档案中的信用等级" data-message-en="Open credit rating in the customer profile"><span class="wb-metric-label"><span>${T("信用等级", "Credit rating")}</span>${icon("gauge")}</span><strong>A</strong><small>${T("来自客户档案", "From customer profile")}</small></button>
        <button class="wb-metric is-cyan" type="button" data-customer-action data-message-zh="打开该客户的3个有效项目" data-message-en="Open the customer's 3 active projects"><span class="wb-metric-label"><span>${T("有效项目", "Active projects")}</span>${icon("target")}</span><strong>3${T("个", "")}</strong><small>${T("预计金额680万元", "Expected amount CNY 6.8m")}</small></button>
        <button class="wb-metric is-green" type="button" data-customer-action data-message-zh="打开该客户的试料结果明细" data-message-en="Open trial result details for this customer"><span class="wb-metric-label"><span>${T("试料通过率", "Trial pass rate")}</span>${icon("heartbeat")}</span><strong>67%</strong><small>${T("4次通过 / 6次有结论", "4 passed / 6 concluded")}</small></button>
      </section>

      <section class="wb-card wb-flush-card customer-mainline-card" data-od-id="customer-insight-mainline">
        <header class="wb-flush-head customer-card-head"><div class="wb-title-group"><span class="wb-icon" style="--wb-tone:var(--wb-cyan)">${icon("chart-line-up")}</span><div><h2>${T("客户经营主线", "Customer Operating Mainline")}</h2><p>${T("客户 → 商机项目 → 多次试料 / 多轮报价", "Customer → opportunity projects → multiple trials / quote rounds")}</p></div></div><span class="wb-count-pill" style="--wb-tone:var(--wb-blue)">${T("当前客户事实", "Current customer facts")}</span></header>
        <div class="wb-flush-body customer-mainline-flow">
          <button type="button" data-customer-action data-message-zh="打开该客户的3个商机项目" data-message-en="Open the customer's 3 opportunity projects"><span>${T("商机项目", "Opportunity projects")}</span><b>3${T("个", "")}</b><small>${T("承载客户需求 · 预计金额680万元", "Carries customer needs · Expected CNY 6.8m")}</small></button>
          <span class="customer-flow-arrow">${chevron()}</span>
          <button class="is-risk" type="button" data-customer-action data-message-zh="打开该客户的6次试料申请" data-message-en="Open the customer's 6 trial requests"><span>${T("试料申请", "Trial requests")}</span><b>6${T("次", "")}</b><small>${T("全部关联商机项目 · 1次反馈逾期", "All linked to opportunity projects · 1 feedback overdue")}</small></button>
          <span class="customer-flow-arrow">${chevron()}</span>
          <button type="button" data-customer-action data-message-zh="打开该客户的4份报价单" data-message-en="Open the customer's 4 quotes"><span>${T("报价单", "Quotes")}</span><b>4${T("份", "")}</b><small>${T("全部关联商机项目 · 逐材料记录反馈", "All linked to opportunity projects · Feedback by material")}</small></button>
        </div>
      </section>

      <div class="customer-analysis-grid" data-od-id="customer-insight-analysis-shell">
        <section class="wb-card wb-flush-card customer-relation-card" data-od-id="customer-insight-industry-relation">
          <header class="wb-flush-head customer-card-head"><div class="wb-title-group"><span class="wb-icon" style="--wb-tone:var(--wb-blue)">${icon("target")}</span><div><h2>${T("产业链位置与上下游关系", "Industry Position and Upstream/Downstream Relations")}</h2><p>${T("通过商机项目中的交易客户与终端客户识别", "Identified from trading and end customers in opportunity projects")}</p></div></div>${action("关系明细", "Relation details", "打开客户产业链关系明细", "Open customer industry relation details", "customer-inline-action")}</header>
          <div class="wb-flush-body customer-relation-layout wb-relation-flow is-three-way"><div class="customer-relation-upstream wb-relation-tier" data-customer-aria-zh="上游" data-customer-aria-en="Upstream" aria-label="上游"><article class="customer-relation-focus wb-relation-node"><span>${T("当前客户产业链位置", "Current industry position")}</span><b>${T("终端客户 / 品牌商", "End customer / brand")}</b><small>${T("苏州精密注塑有限公司", "Suzhou Precision Injection Molding Co., Ltd.")}</small></article></div><div class="wb-relation-branch" aria-hidden="true"></div><div class="wb-relation-tier" data-customer-aria-zh="下游" data-customer-aria-en="Downstream" aria-label="下游"><div class="customer-relation-targets wb-relation-children"><article class="wb-relation-node"><b>${T("苏州精密注塑有限公司", "Suzhou Precision Injection Molding Co., Ltd.")}</b><span>${T("注塑厂 / 加工厂", "Injection molding / processor")}</span><em>${T("涉及2个商机项目", "Involved in 2 projects")}</em></article><article class="wb-relation-node"><b>${T("昆山精密成型有限公司", "Kunshan Precision Forming Co., Ltd.")}</b><span>${T("模具厂", "Mold maker")}</span><em>${T("涉及1个商机项目", "Involved in 1 project")}</em></article><article class="wb-relation-node"><b>${T("华东材料代理有限公司", "East China Material Agency Co., Ltd.")}</b><span>${T("经销商 / 代理商", "Distributor / agent")}</span><em>${T("涉及1个商机项目", "Involved in 1 project")}</em></article></div></div></div>
        </section>

        <section class="wb-card wb-flush-card customer-contact-card" data-od-id="customer-insight-contact-coverage">
          <header class="wb-flush-head customer-card-head"><div class="wb-title-group"><span class="wb-icon" style="--wb-tone:var(--wb-green)">${icon("users-three")}</span><div><h2>${T("联系人关系覆盖", "Contact Relationship Coverage")}</h2><p>${T("业务、技术、采购和决策层覆盖情况", "Coverage across business, technical, procurement, and decision roles")}</p></div></div>${action("联系人明细", "Contact details", "打开该客户联系人明细", "Open contact details for this customer", "customer-inline-action")}</header>
          <div class="wb-flush-body customer-contact-network"><div><article><b>${T("王总 · 事业部总经理", "Director Wang · BU General Manager")}</b><small>${T("最近跟进：18天前", "Last follow-up: 18 days ago")}</small></article><article><b>${T("陈经理 · 采购", "Manager Chen · Procurement")}</b><small>${T("最近跟进：08-01", "Last follow-up: Aug 1")}</small></article></div><span class="customer-contact-center">${icon("users-three")}<b>${T("客户团队", "Customer team")}</b></span><div><article><b>${T("刘工 · 研发", "Engineer Liu · R&D")}</b><small>${T("最近跟进：08-03", "Last follow-up: Aug 3")}</small></article><article><b>${T("赵工 · 质量", "Engineer Zhao · Quality")}</b><small>${T("最近跟进：07-29", "Last follow-up: Jul 29")}</small></article></div></div>
        </section>

        <section class="wb-card wb-flush-card customer-wallet-card" data-od-id="customer-insight-wallet-share">
          <header class="wb-flush-head customer-card-head"><div class="wb-title-group"><span class="wb-icon" style="--wb-tone:var(--wb-purple)">${icon("wallet")}</span><div><h2>${T("客户钱包份额（区间）", "Customer Wallet Share (Range)")}</h2><p>${T("以年度工程塑料采购规模选项值估算", "Estimated from annual engineering-plastics purchase scale")}</p></div></div>${action("份额依据", "Share basis", "打开客户钱包份额计算依据", "Open the customer wallet-share basis", "customer-inline-action")}</header>
          <div class="wb-flush-body customer-wallet-layout"><div class="wb-chart-frame"><div class="wb-donut-chart customer-wallet-donut" style="--wb-chart-size:132px"><svg viewBox="0 0 42 42" role="img" data-customer-aria-zh="客户钱包份额上限46%" data-customer-aria-en="Customer wallet-share upper bound 46 percent"><circle class="wb-donut-track" cx="21" cy="21" r="15.9155" stroke-width="8"></circle><circle class="wb-donut-segment wb-chart-interactive" cx="21" cy="21" r="15.9155" stroke-width="8" tabindex="0" style="--dash:46;--offset:0;--wb-tone:var(--wb-blue)" data-chart-title-zh="客户钱包份额（区间）" data-chart-title-en="Customer wallet share (range)" data-chart-detail-zh="当前份额上限：46%；按赢单年需求量、在途商机可取量与客户采购规模估算" data-chart-detail-en="Current upper bound: 46%; estimated from won annual demand, open opportunity potential, and customer purchase scale"></circle></svg><strong>≤46%</strong></div></div><div class="wb-fact-list"><div><span>${T("赢单年需求量", "Won annual demand")}</span><b>${T("约210吨/年", "Approx. 210 t/year")}</b></div><div><span>${T("在途商机可取量", "Open opportunity potential")}</span><b>${T("约250吨/年", "Approx. 250 t/year")}</b></div><div><span>${T("客户采购规模", "Customer purchase scale")}</span><b>${T("1000吨以上", "Over 1,000 t")}</b></div></div></div>
        </section>

        <section class="wb-card wb-flush-card customer-trial-card" data-od-id="customer-insight-trial-results">
          <header class="wb-flush-head customer-card-head"><div class="wb-title-group"><span class="wb-icon" style="--wb-tone:var(--wb-cyan)">${icon("heartbeat")}</span><div><h2>${T("客户试料结果结构", "Customer Trial Result Mix")}</h2><p>${T("按客户反馈结果统计，不复制到全部料号", "Counted by customer feedback result, without copying to all part numbers")}</p></div></div>${action("试料明细", "Trial details", "打开该客户试料结果明细", "Open trial result details for this customer", "customer-inline-action")}</header>
          <div class="wb-flush-body customer-trial-results"><button class="is-pass" type="button" data-customer-action data-message-zh="查看4次试料成功记录" data-message-en="View 4 successful trial records"><span>${T("试料成功", "Successful trials")}</span><b>4${T("次", "")}</b><small>${T("进入通过率分子", "Included in pass-rate numerator")}</small></button><button class="is-fail" type="button" data-customer-action data-message-zh="查看2次试料失败记录" data-message-en="View 2 failed trial records"><span>${T("试料失败", "Failed trials")}</span><b>2${T("次", "")}</b><small>${T("进入通过率分母", "Included in pass-rate denominator")}</small></button><button type="button" data-customer-action data-message-zh="查看1次测试中或无结论记录" data-message-en="View 1 testing or inconclusive record"><span>${T("测试中 / 无结论", "Testing / inconclusive")}</span><b>1${T("次", "")}</b><small>${T("不进入通过率分母", "Excluded from pass-rate denominator")}</small></button></div>
        </section>

        <section class="wb-card wb-flush-card customer-project-card" data-od-id="customer-insight-project-momentum">
          <header class="wb-flush-head customer-card-head"><div class="wb-title-group"><span class="wb-icon" style="--wb-tone:var(--wb-orange)">${icon("chart-line-up")}</span><div><h2>${T("重点项目动量", "Priority Project Momentum")}</h2><p>${T("当前客户的重点在途商机", "Priority open opportunities for this customer")}</p></div></div>${action("全部项目", "All projects", "打开该客户全部商机项目", "Open all opportunity projects for this customer", "customer-inline-action")}</header>
          <div class="wb-flush-body wb-inline-action-list customer-list"><article class="wb-inline-action-item"><span class="customer-list-icon is-risk">${icon("shield-warning")}</span><div class="wb-inline-action-copy"><b>${T("扫地机耐划伤结构件", "Scratch-resistant robot vacuum structural part")}</b><small>${T("试样阶段 · 420万元", "Trial stage · CNY 4.2m")}</small></div>${action("反馈逾期", "Feedback overdue", "打开扫地机耐划伤结构件经营洞察", "Open operating insight for the scratch-resistant robot vacuum project", "wb-inline-action")}</article><article class="wb-inline-action-item"><span class="customer-list-icon">${icon("target")}</span><div class="wb-inline-action-copy"><b>${T("高速电机绝缘支架", "High-speed motor insulation bracket")}</b><small>${T("商务接触 · 180万元", "Business contact · CNY 1.8m")}</small></div>${action("商务接触", "Business contact", "打开高速电机绝缘支架商机项目", "Open the high-speed motor insulation bracket project", "wb-inline-action")}</article><article class="wb-inline-action-item"><span class="customer-list-icon is-success">${icon("target")}</span><div class="wb-inline-action-copy"><b>${T("洗地机透明视窗", "Floor scrubber transparent window")}</b><small>${T("导入阶段 · 80万元", "Introduction stage · CNY 0.8m")}</small></div>${action("推进正常", "On track", "打开洗地机透明视窗商机项目", "Open the floor scrubber transparent window project", "wb-inline-action")}</article></div>
        </section>

        <section class="wb-card wb-flush-card customer-activity-card" data-od-id="customer-insight-recent-activity">
          <header class="wb-flush-head customer-card-head"><div class="wb-title-group"><span class="wb-icon" style="--wb-tone:var(--wb-green)">${icon("article")}</span><div><h2>${T("近期客户互动", "Recent Customer Interactions")}</h2><p>${T("来自销售记录", "From sales records")}</p></div></div>${action("销售记录", "Sales records", "打开该客户全部销售记录", "Open all sales records for this customer", "customer-inline-action")}</header>
          <div class="wb-flush-body customer-activity-list"><button type="button" data-customer-action data-message-zh="打开刘工08-03销售记录" data-message-en="Open Engineer Liu's Aug 3 sales record"><span><b>${T("刘工 · 技术", "Engineer Liu · Technical")}</b><small>${T("耐划伤复测完成，等待质量部门确认", "Scratch-resistance retest completed; awaiting quality confirmation")}</small></span><em>08-03</em></button><button type="button" data-customer-action data-message-zh="打开陈经理08-01销售记录" data-message-en="Open Manager Chen's Aug 1 sales record"><span><b>${T("陈经理 · 采购", "Manager Chen · Procurement")}</b><small>${T("希望本周确认阶梯价格", "Requests tiered pricing confirmation this week")}</small></span><em>08-01</em></button><button type="button" data-customer-action data-message-zh="打开赵工07-29销售记录" data-message-en="Open Engineer Zhao's Jul 29 sales record"><span><b>${T("赵工 · 质量", "Engineer Zhao · Quality")}</b><small>${T("尺寸通过，性能数据待补充", "Dimensions passed; performance data pending")}</small></span><em>07-29</em></button></div>
        </section>
      </div>
    </div>`;

  const alignActiveRecordTab = (host) => {
    requestAnimationFrame(() => {
      const tabList = host?.querySelector?.(".customer-record-tabs");
      const activeTab = tabList?.querySelector?.(".active");
      if (!tabList || !activeTab || tabList.scrollWidth <= tabList.clientWidth) return;
      const listRect = tabList.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      if (tabRect.left < listRect.left) tabList.scrollLeft -= listRect.left - tabRect.left + 4;
      if (tabRect.right > listRect.right) tabList.scrollLeft += tabRect.right - listRect.right + 4;
    });
  };

  const applyLanguage = (root, language) => {
    const host = root?.querySelector?.(".customer-insight-page") || root;
    if (!host) return;
    host.querySelectorAll("[data-customer-lang]").forEach((element) => { element.hidden = element.dataset.customerLang !== language; });
    host.querySelectorAll("[data-customer-aria-zh]").forEach((element) => {
      element.setAttribute("aria-label", language === "en" ? element.dataset.customerAriaEn : element.dataset.customerAriaZh);
    });
    alignActiveRecordTab(host);
  };

  const mount = (root, options = {}) => {
    const host = root?.querySelector?.(".customer-insight-page") || root;
    if (!host || host.dataset.customerMounted === "true") return;
    host.dataset.customerMounted = "true";
    const showToast = options.showToast || (() => {});
    host.addEventListener("click", (event) => {
      const button = event.target.closest("[data-customer-action]");
      if (!button) return;
      const english = document.documentElement.lang === "en";
      showToast(english ? button.dataset.messageEn : button.dataset.messageZh);
    });
    applyLanguage(host, document.documentElement.lang === "en" ? "en" : "zh");
  };

  window.WorkbenchCustomerInsight = { render, mount, applyLanguage };
})();
