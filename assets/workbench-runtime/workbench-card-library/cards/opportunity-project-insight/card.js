(function () {
  "use strict";

  const T = (zh, en) => `<span data-opp-lang="zh">${zh}</span><span data-opp-lang="en" hidden>${en}</span>`;
  const icon = (name) => `<svg class="fx-svg wb-semantic-icon" aria-hidden="true"><use href="#vg-${name}"></use></svg>`;
  const action = (labelZh, labelEn, messageZh, messageEn, className = "") =>
    `<button class="wb-compact-action ${className}" type="button" data-opp-action data-message-zh="${messageZh}" data-message-en="${messageEn}">${T(labelZh, labelEn)}</button>`;
  const ruleButton = (key) => `<button class="opp-rule-button" type="button" data-opp-rule="${key}" data-opp-aria-zh="查看取数规则" data-opp-aria-en="View data rule" aria-label="查看取数规则">${icon("article")}</button>`;

  const rules = {
    stage: {
      titleZh: "项目判断与当前动作 · 取数规则",
      titleEn: "Project Judgment and Current Action · Data Rule",
      bodyZh: "当前阶段直接读取商机项目需求的商机阶段。停留天数按阶段变更时间计算；最近跟进取商机最近有效销售推进时间。系统只在确定性规则命中时生成当前动作，正式任务完成或相关字段、跟进记录、阶段发生变化后提醒消失。",
      bodyEn: "The current stage comes directly from the opportunity project requirement. Stage duration uses the stage-change time, and the latest follow-up uses the most recent valid sales activity. The current action appears only when a deterministic rule is triggered and disappears when the task, field, follow-up, or stage changes."
    },
    evidence: {
      titleZh: "关键证据 · 取数规则",
      titleEn: "Key Evidence · Data Rule",
      bodyZh: "E01-E10读取当前商机唯一记录；E11与E12采用同一条有效且审批通过的试料；E13按料号选择最新有效正式报价明细；E14取正式任务或确定性规则合并后的首要动作。证据完整度只衡量可追溯事实是否形成，不等于项目健康度或赢单概率。",
      bodyEn: "E01-E10 use the current opportunity record. E11 and E12 use the same valid approved trial. E13 selects the latest valid formal quote line by part number. E14 uses the highest-priority action across formal tasks and deterministic rules. Evidence completeness measures traceability, not project health or win probability."
    },
    trial: {
      titleZh: "试料申请 · 取数规则",
      titleEn: "Trial Requests · Data Rule",
      bodyZh: "只保留当前商机下有效且审批通过的试料申请，按实际试料日期倒序；料号合并已建立产品和未建立料号文本并去重。客户反馈完整要求反馈日期、测试状态和反馈内容均有有效值。",
      bodyEn: "Only valid approved trial requests for this opportunity are retained and sorted by actual trial date descending. Registered products and unregistered part-number text are merged and deduplicated. Feedback is complete only when date, test status, and feedback content are all present."
    },
    quote: {
      titleZh: "报价申请 · 取数规则",
      titleEn: "Quote Requests · Data Rule",
      bodyZh: "保留当前商机下有效且审批通过的报价单，按报价日期倒序。材料明细按报价单明细ID去重；客户价格反馈或反馈说明至少一项有效时计为已反馈。估价不计入有效正式报价闭环。",
      bodyEn: "Valid approved quotes for this opportunity are sorted by quote date descending. Material lines are deduplicated by quote-line ID. A line counts as having feedback when either price feedback or feedback notes are present. Estimates do not count toward formal quote closure."
    },
    competitor: {
      titleZh: "竞争情况 · 取数规则",
      titleEn: "Competition · Data Rule",
      bodyZh: "竞争对手、竞争产品和竞争报价均显示原始业务值。只有币种、计价单位和含税口径一致时才能计算价差；字段覆盖率只说明信息是否维护，不代表竞争胜率。",
      bodyEn: "Competitors, products, and quoted amounts are shown as raw business values. Price differences require matching currency, pricing unit, and tax basis. Field coverage shows data maintenance only and does not represent win probability."
    },
    contacts: {
      titleZh: "联系人覆盖 · 取数规则",
      titleEn: "Contact Coverage · Data Rule",
      bodyZh: "联系人池按交易客户与终端客户的有效联系人去重，本项目关联人数按商机联系人关系去重。姓名、部门、职位和最后跟进只作身份事实，不自动推断决策权、影响力或支持态度。",
      bodyEn: "The contact pool deduplicates valid contacts across trading and end customers. Project-linked contacts are deduplicated through opportunity-contact relations. Name, department, title, and last follow-up are identity facts only and do not infer decision power, influence, or support."
    }
  };

  const stages = [
    {
      key: "business",
      labelZh: "商务接触",
      labelEn: "Business contact",
      tone: "blue",
      summary: [["阶段已停留", "28天", "按阶段变更时间计算", "Stage duration", "28 days", "Calculated from stage change"], ["最后跟进", "26天前", "距30天无推进阈值4天", "Last follow-up", "26 days ago", "4 days before the 30-day threshold"], ["预计项目金额", "420万元", "商机项目需求 · 预计项目金额", "Expected amount", "CNY 4.2m", "Opportunity project requirement"], ["规则状态", "接近风险阈值", "尚未正式命中", "Rule status", "Near risk threshold", "Not triggered yet"]],
      decisions: [["客户与需求", "已明确", "客户主体、产品和需求概述均已维护", "Customer and need", "Confirmed", "Customer, product, and requirement summary are maintained"], ["技术与验证", "待确认", "技术可行性与验证安排仍需补充", "Technology and validation", "To confirm", "Technical feasibility and validation plan need completion"], ["商务与价值", "金额已维护", "预计金额420万元，价值分级阈值待确认", "Commercial and value", "Amount maintained", "Expected CNY 4.2m; value threshold pending"]],
      primary: ["补充本次客户沟通，并确认下一步验证安排", "Add this customer interaction and confirm the next validation step", "当前客户与需求已建立，但最近销售推进接近30天阈值；应先形成一条可核验的销售记录，再确认是否具备试样安排。", "The customer and need are established, but progress is nearing the 30-day threshold. Add a verifiable sales record, then confirm the trial plan.", "建议优先", "Recommended"],
      secondary: [["推动客户产品需求评审", "截止08-29", "Complete the customer product requirement review", "Due Aug 29"], ["技术可行性待评估", "字段待补", "Technical feasibility needs assessment", "Field missing"]]
    },
    {
      key: "trial",
      labelZh: "试样阶段",
      labelEn: "Trial stage",
      tone: "cyan",
      summary: [["阶段已停留", "12天", "按阶段变更时间计算", "Stage duration", "12 days", "Calculated from stage change"], ["最后跟进", "8天前", "来自商机项目需求", "Last follow-up", "8 days ago", "From opportunity project requirement"], ["预计项目金额", "420万元", "商机项目需求 · 预计项目金额", "Expected amount", "CNY 4.2m", "Opportunity project requirement"], ["规则状态", "已超过7天阈值", "且最近7天无销售推进", "Rule status", "7-day threshold exceeded", "No sales progress in the last 7 days"]],
      decisions: [["客户与需求", "已明确", "交易客户、终端客户及产品需求均已维护", "Customer and need", "Confirmed", "Trading customer, end customer, and product need are maintained"], ["技术与验证", "待闭环", "现场结论已形成，客户长期测试反馈待补", "Technology and validation", "Closure pending", "On-site conclusion exists; long-term test feedback is missing"], ["商务与价值", "部分闭环", "预计金额已维护，1条材料报价反馈待补", "Commercial and value", "Partially closed", "Expected amount is maintained; one material quote feedback is missing"]],
      primary: ["补充第3次试料的客户测试反馈", "Complete customer feedback for the third trial", "试料申请 TA-202608-003 当前处于“客户测试”；客户反馈日期、客户测试状态和客户测试反馈尚未完整维护。", "Trial request TA-202608-003 is in customer testing. Feedback date, test status, and feedback details are incomplete.", "规则已命中", "Rule triggered"],
      secondary: [["确认客户测试周期与下一验证节点", "截止08-29 · 正式阶段任务 · 负责人李经理", "Confirm customer test cycle and next validation milestone", "Due Aug 29 · Formal stage task · Owner: Manager Li", "处理阶段任务", "Handle stage task"], ["1条材料报价反馈尚未填写", "补充报价单明细 · 客户价格反馈与说明均为空", "One material quote feedback is missing", "Complete quote-line details · Customer price feedback and notes are both empty", "补充报价反馈", "Complete quote feedback"]]
    },
    {
      key: "import",
      labelZh: "导入阶段",
      labelEn: "Introduction",
      tone: "purple",
      summary: [["阶段已停留", "18天", "按阶段变更时间计算", "Stage duration", "18 days", "Calculated from stage change"], ["最后跟进", "16天前", "最近15天无销售推进", "Last follow-up", "16 days ago", "No progress in the last 15 days"], ["预计项目金额", "420万元", "商机项目需求 · 预计项目金额", "Expected amount", "CNY 4.2m", "Opportunity project requirement"], ["规则状态", "2条材料待反馈", "已命中导入阶段规则", "Rule status", "2 materials pending", "Introduction-stage rule triggered"]],
      decisions: [["客户与需求", "已明确", "客户需求与导入方向已经形成", "Customer and need", "Confirmed", "Customer need and introduction direction are established"], ["技术与验证", "已形成", "试料与客户验证结论可追溯", "Technology and validation", "Established", "Trial and customer validation conclusions are traceable"], ["商务与价值", "待闭环", "2条材料报价反馈尚未填写", "Commercial and value", "Closure pending", "Two material quote feedback records are missing"]],
      primary: ["补充2条报价材料的客户反馈", "Complete feedback for two quoted materials", "当前商机关联的正式报价中，有2条报价单明细的客户价格反馈和客户反馈说明均为空。", "Two formal quote lines have neither customer price feedback nor feedback notes.", "规则已命中", "Rule triggered"],
      secondary: [["确认客户导入计划", "截止待确认", "Confirm the customer introduction plan", "Due date pending"], ["首批与前三批证据无法自动核验", "字段缺失", "First-batch and first-three-batch evidence cannot be verified", "Fields missing"]]
    },
    {
      key: "production",
      labelZh: "量产阶段",
      labelEn: "Mass production",
      tone: "green",
      summary: [["阶段已停留", "66天", "按阶段变更时间计算", "Stage duration", "66 days", "Calculated from stage change"], ["最后跟进", "61天前", "最近60天无销售推进", "Last follow-up", "61 days ago", "No progress in the last 60 days"], ["预计项目金额", "420万元", "商机项目需求 · 预计项目金额", "Expected amount", "CNY 4.2m", "Opportunity project requirement"], ["规则状态", "已超过60天阈值", "需要销售确认量产进展", "Rule status", "60-day threshold exceeded", "Sales must confirm production progress"]],
      decisions: [["客户与需求", "已明确", "项目需求与量产方向已经形成", "Customer and need", "Confirmed", "Project need and production direction are established"], ["技术与验证", "已形成", "技术与试料证据可追溯", "Technology and validation", "Established", "Technical and trial evidence is traceable"], ["商务与价值", "需确认", "量产批次及客户使用情况待核验", "Commercial and value", "To confirm", "Production batches and customer usage need verification"]],
      primary: ["确认量产批次是否完成，并记录客户使用情况", "Confirm production batches and record customer usage", "当前阶段已超过60天且最近60天无销售推进记录；系统暂无第三批完成和量产稳定确认字段，需由销售核验实际情况。", "The stage exceeds 60 days with no recent progress. Sales must verify actual production because batch-completion fields are unavailable.", "规则已命中", "Rule triggered"],
      secondary: [["量产稳定确认无法自动核验", "字段缺失", "Stable production cannot be verified automatically", "Fields missing"], ["核对最新正式报价有效期", "有效期内", "Check the latest formal quote validity", "Within validity"]]
    },
    {
      key: "pause",
      labelZh: "暂停阶段",
      labelEn: "Paused",
      tone: "orange",
      summary: [["暂停已持续", "21天", "按阶段变更时间计算", "Pause duration", "21 days", "Calculated from stage change"], ["最后跟进", "18天前", "来自商机项目需求", "Last follow-up", "18 days ago", "From opportunity project requirement"], ["预计项目金额", "420万元", "商机项目需求 · 预计项目金额", "Expected amount", "CNY 4.2m", "Opportunity project requirement"], ["暂停信息", "原因已维护", "项目计划调整", "Pause information", "Reason maintained", "Project plan adjustment"]],
      decisions: [["项目基础", "已形成", "客户、需求和历史阶段信息可追溯", "Project basics", "Established", "Customer, need, and stage history are traceable"], ["暂停原因", "已维护", "暂停/终止原因为项目计划调整", "Pause reason", "Maintained", "Pause/termination reason is project plan adjustment"], ["恢复条件", "待确认", "正式环境暂无结构化恢复条件字段", "Recovery condition", "To confirm", "No structured recovery-condition field exists"]],
      primary: ["确认项目是否具备恢复条件", "Confirm whether the project can resume", "暂停/终止原因已维护为“项目计划调整”；固定复盘周期和恢复日期尚未形成正式口径。", "The pause reason is maintained as project plan adjustment; review cadence and recovery date are not standardized.", "异常状态", "Exception"],
      secondary: [["恢复条件尚未结构化", "数据待维护", "Recovery conditions are not structured", "Data missing"], ["固定复盘时限待确认", "口径待确认", "Fixed review deadline needs confirmation", "Definition pending"]]
    },
    {
      key: "won",
      labelZh: "赢单",
      labelEn: "Won",
      tone: "green",
      summary: [["关闭时间", "9天前", "按阶段变更时间计算", "Closed", "9 days ago", "Calculated from stage change"], ["项目结果", "赢单", "销售状态为赢单", "Project result", "Won", "Sales status is Won"], ["预计项目金额", "420万元", "商机项目需求 · 预计项目金额", "Expected amount", "CNY 4.2m", "Opportunity project requirement"], ["结果复盘", "尚未填写", "关联赢单复盘对象", "Outcome review", "Not completed", "Linked win-review object"]],
      decisions: [["项目结果", "赢单", "商机项目需求已进入赢单状态", "Project result", "Won", "Opportunity project requirement is in Won status"], ["经营证据", "已归档", "项目、试料和报价历史仍可追溯", "Operating evidence", "Archived", "Project, trial, and quote history remain traceable"], ["结果复盘", "待填写", "尚无关联的商机赢单复盘记录", "Outcome review", "To complete", "No linked opportunity win review exists"]],
      primary: ["填写商机赢单复盘", "Complete the opportunity win review", "项目已赢单，不再生成普通推进动作；如尚无关联复盘记录，可进入“商机赢单复盘”填写项目成果、材料方案与关键经验。", "The project is won and no longer generates ordinary progress actions. Complete the linked win review with outcomes and lessons.", "关闭状态", "Closed"],
      secondary: [["客户最终反馈已维护", "已形成", "Final customer feedback is maintained", "Established"], ["不再生成阶段推进提醒", "关闭状态", "No more stage-progress alerts", "Closed"]]
    },
    {
      key: "terminated",
      labelZh: "终止",
      labelEn: "Terminated",
      tone: "red",
      summary: [["关闭时间", "14天前", "按阶段变更时间计算", "Closed", "14 days ago", "Calculated from stage change"], ["项目结果", "终止", "销售状态为终止", "Project result", "Terminated", "Sales status is Terminated"], ["预计项目金额", "420万元", "商机项目需求 · 预计项目金额", "Expected amount", "CNY 4.2m", "Opportunity project requirement"], ["终止原因", "竞品已定点", "原因与说明均已维护", "Termination reason", "Competitor selected", "Reason and notes are maintained"]],
      decisions: [["项目结果", "终止", "商机项目需求已进入终止状态", "Project result", "Terminated", "Opportunity project requirement is terminated"], ["关闭原因", "已维护", "暂停/终止原因及补充说明已形成", "Closure reason", "Maintained", "Termination reason and notes are established"], ["客户反馈", "已维护", "客户最终反馈可追溯", "Customer feedback", "Maintained", "Final customer feedback is traceable"]],
      primary: ["项目已终止，不再生成推进动作", "Project terminated; no further progress actions", "暂停/终止原因和补充说明均已维护；页面保留关闭依据与历史证据，不继续生成试料、报价或阶段推进提醒。", "The termination reason and notes are maintained. Historical evidence remains visible without generating new progress actions.", "关闭状态", "Closed"],
      secondary: [["暂停/终止原因", "已维护", "Pause/termination reason", "Maintained"], ["客户最终反馈", "已维护", "Final customer feedback", "Maintained"]]
    }
  ];

  const renderStagePanel = (stage) => `
    <div class="opp-stage-panel" data-opp-stage-panel="${stage.key}" ${stage.key === "trial" ? "" : "hidden"}>
      <div class="opp-decision-layout">
        <section class="opp-decision-column">
          <header><b>${T("三个关键判断", "Three key judgments")}</b><small>${T("同一事实只在此形成一次经营结论", "Each fact forms one operating conclusion here")}</small></header>
          <div class="opp-decision-list">${stage.decisions.map((item, index) => `<article class="opp-decision-item ${index > 0 && stage.key !== "terminated" ? "is-warn" : ""}"><span>${T(item[0], item[3])}</span><div><b>${T(item[1], item[4])}</b><em>${T(index === 0 ? "正式事实" : "经营判断", index === 0 ? "Verified fact" : "Operating judgment")}</em></div><small>${T(item[2], item[5])}</small></article>`).join("")}</div>
        </section>
        <section class="opp-action-column">
          <article class="opp-primary-action">
            <header><span><em>${T("现在最应该做", "Most important action now")}</em><b>${T(stage.primary[0], stage.primary[1])}</b></span><i>${T(stage.primary[4], stage.primary[5])}</i></header>
            <p>${T(stage.primary[2], stage.primary[3])}</p>
            <div class="opp-action-source"><span>${T("来源：实时规则提醒", "Source: live rule alert")}</span><span>${T("负责人：李经理", "Owner: Manager Li")}</span></div>
            <div class="wb-action-row">${action("处理当前动作", "Handle current action", `进入“${stage.primary[0]}”处理流程`, `Open the workflow for ${stage.primary[1]}`, "opp-action-primary")}${action("记录销售跟进", "Add sales follow-up", "新建销售记录并预填当前商机", "Create a sales record prefilled with this opportunity")}</div>
          </article>
          <div class="opp-secondary-actions">${stage.secondary.map((item) => `<article><span><b>${T(item[0], item[2])}</b><em>${T(item[1], item[3])}</em></span>${action(item[4] || "查看", item[5] || "View", `打开“${item[0]}”`, `Open ${item[2]}`)}</article>`).join("")}</div>
        </section>
      </div>
    </div>`;

  const evidence = [
    ["E01", "交易客户", "苏州精密注塑有限公司", "已形成", "Trading customer", "Suzhou Precision Injection Molding Co., Ltd.", "Established", "ok"],
    ["E02", "客户产品名称", "扫地机耐划伤结构件", "已形成", "Customer product", "Scratch-resistant robot vacuum structural part", "Established", "ok"],
    ["E03", "需求概述", "耐划伤、耐清洁剂，外观需稳定", "已形成", "Requirement summary", "Scratch and detergent resistance; stable appearance", "Established", "ok"],
    ["E04", "预计年需求量", "280,000 KG", "已形成", "Expected annual demand", "280,000 KG", "Established", "ok"],
    ["E05", "预计单价", "¥15.00 / KG", "已形成", "Expected unit price", "CNY 15.00 / KG", "Established", "ok"],
    ["E06", "预计项目金额", "420万元", "已形成", "Expected project amount", "CNY 4.2m", "Established", "ok"],
    ["E07", "预计成交日期", "2026-08-28", "已形成", "Expected close date", "2026-08-28", "Established", "ok"],
    ["E08", "研发评审结论", "有条件可行 · 商机技术可行性", "已形成", "R&D review", "Conditionally feasible · Technical feasibility", "Established", "ok"],
    ["E09", "研发负责人", "王工", "已形成", "R&D owner", "Engineer Wang", "Established", "ok"],
    ["E10", "项目商业价值", "420万元 · 预计毛利率18.6%", "口径待确认", "Project business value", "CNY 4.2m · Expected gross margin 18.6%", "Definition pending", "review"],
    ["E11", "现场结论", "客户继续测试 · 采用第3次试料", "已形成", "On-site conclusion", "Customer continues testing · Third trial selected", "Established", "ok"],
    ["E12", "客户测试反馈", "测试中 · 反馈日期与内容待补", "待补充", "Customer test feedback", "Testing · Feedback date and details missing", "Missing", "pending"],
    ["E13", "有效正式报价及反馈", "2个料号 · 1条材料反馈待补", "部分形成", "Valid formal quote and feedback", "2 part numbers · 1 material feedback missing", "Partially established", "partial"],
    ["E14", "规则行动与日期", "补充第3次试料反馈 · 已逾期7天", "已生成", "Rule action and date", "Complete third-trial feedback · 7 days overdue", "Generated", "generated"]
  ];

  const render = () => `
    <div class="opportunity-insight-page wb-inner" data-language-fixed>
      <header class="wb-header opp-page-header">
        <div class="wb-title-group"><h1>${T("商机项目经营洞察", "Opportunity Project Operating Insight")}</h1><p>${T("扫地机耐划伤结构件 · 基于 CRM 可核验事实", "Scratch-resistant robot vacuum structural part · Based on verifiable CRM facts")}</p></div>
        <div class="opp-header-actions wb-compact-action-group">${action("刷新洞察", "Refresh insight", "已按当前商机刷新经营洞察", "Operating insight refreshed for this opportunity")}${action("打开 CRM", "Open CRM", "打开CRM原生商机项目详情", "Open the native CRM opportunity project detail", "opp-action-primary")}</div>
      </header>

      <section class="wb-card wb-flush-card opportunity-record-card" data-od-id="opportunity-insight-record">
        <div class="opp-breadcrumb"><b>CRM</b><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"></path></svg><span>${T("商机项目列表", "Opportunity project list")}</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"></path></svg><strong>${T("扫地机耐划伤结构件", "Scratch-resistant robot vacuum structural part")}</strong></div>
        <div class="opp-record-main">
          <div class="opp-record-identity"><span class="wb-icon" style="--wb-tone:var(--wb-orange)">${icon("target")}</span><div><small>${T("CRM原生商机项目详情", "Native CRM opportunity project detail")}</small><h2>${T("扫地机耐划伤结构件", "Scratch-resistant robot vacuum structural part")}</h2><p>${T("负责人：李经理 · 试样阶段 · 预计金额420万元", "Owner: Manager Li · Trial stage · Expected CNY 4.2m")}</p></div></div>
          <div class="opp-record-actions">${action("编辑", "Edit", "打开CRM原生编辑页", "Open the native CRM edit page", "opp-action-primary")}${action("销售记录", "Sales records", "打开该记录的销售记录", "Open sales records for this opportunity")}${action("更多", "More", "打开更多原生操作", "Open more native actions")}</div>
        </div>
        <nav class="opp-record-tabs" data-opp-aria-zh="CRM记录视图" data-opp-aria-en="CRM record views" aria-label="CRM记录视图"><button type="button" data-opp-action data-message-zh="切换到基本信息" data-message-en="Switch to basic information">${T("基本信息", "Basic information")}</button><button type="button" data-opp-action data-message-zh="切换到销售记录" data-message-en="Switch to sales records">${T("销售记录", "Sales records")}</button><button type="button" data-opp-action data-message-zh="切换到相关信息" data-message-en="Switch to related information">${T("相关信息", "Related information")}</button><button class="active" type="button" aria-current="page">${T("商机项目经营洞察", "Opportunity project operating insight")}</button></nav>
      </section>

      <section class="wb-card wb-compact-baseline-card opportunity-status-card" data-od-id="opportunity-insight-status">
        <header class="wb-card-head"><div class="wb-baseline-head-copy"><h2>${T("当前阶段", "Current stage")}</h2><p>${T("商机项目需求 · 商机阶段", "Opportunity project requirement · Stage")}</p></div><span class="wb-baseline-meta">${T("试样阶段", "Trial stage")}</span></header>
        <div class="wb-summary-metric-grid wb-metric-grid" data-opp-aria-zh="当前阶段经营指标" data-opp-aria-en="Current-stage operating metrics" aria-label="当前阶段经营指标">
          <article class="wb-metric is-cyan"><span class="wb-metric-label"><span>${T("阶段已停留", "Stage duration")}</span>${icon("gauge")}</span><strong>12${T("天", " days")}</strong><small>${T("按阶段变更时间计算", "Calculated from stage change")}</small></article>
          <article class="wb-metric is-orange"><span class="wb-metric-label"><span>${T("最后跟进", "Last follow-up")}</span>${icon("heartbeat")}</span><strong>8${T("天前", " days ago")}</strong><small>${T("来自商机项目需求", "From opportunity project requirement")}</small></article>
          <article class="wb-metric is-blue"><span class="wb-metric-label"><span>${T("预计项目金额", "Expected amount")}</span>${icon("wallet")}</span><strong>${T("420万元", "CNY 4.2m")}</strong><small>${T("商机项目需求 · 预计项目金额", "Opportunity project requirement")}</small></article>
          <article class="wb-metric is-red"><span class="wb-metric-label"><span>${T("规则状态", "Rule status")}</span>${icon("shield-warning")}</span><strong>${T("已超过7天阈值", "7-day threshold exceeded")}</strong><small>${T("且最近7天无销售推进", "No sales progress in the last 7 days")}</small></article>
        </div>
      </section>

      <section class="wb-card wb-flush-card opportunity-decision-card" data-od-id="opportunity-insight-decision">
        <header class="wb-flush-head opp-card-head"><div class="wb-title-group"><span class="wb-icon" style="--wb-tone:var(--wb-cyan)">${icon("gauge")}</span><div><h2>${T("项目判断与当前动作", "Project Judgment and Current Action")} ${ruleButton("stage")}</h2><p>${T("先看三个关键判断，再处理当前最重要的一个动作", "Review three key judgments, then handle the most important action")}</p></div></div><div class="opp-stage-switch" role="tablist" data-opp-aria-zh="原型阶段状态预览" data-opp-aria-en="Prototype stage preview" aria-label="原型阶段状态预览">${stages.map((stage) => `<button class="${stage.key === "trial" ? "active" : ""}" type="button" role="tab" aria-selected="${stage.key === "trial"}" data-opp-stage="${stage.key}">${T(stage.labelZh, stage.labelEn)}</button>`).join("")}</div></header>
        <div class="wb-flush-body">${stages.map(renderStagePanel).join("")}</div>
      </section>

      <section class="wb-card wb-flush-card opportunity-evidence-card" data-od-id="opportunity-insight-evidence">
        <header class="wb-flush-head opp-card-head"><div class="wb-title-group"><span class="wb-icon" style="--wb-tone:var(--wb-purple)">${icon("clipboard-text")}</span><div><h2>${T("关键证据", "Key Evidence")} ${ruleButton("evidence")}</h2><p>${T("14项证据直接展示采用值；说明对象、字段及多记录采纳顺序", "Fourteen evidence items show selected values, source fields, and record-selection order")}</p></div></div><div class="opp-evidence-summary"><b>${T("11 / 14 已形成", "11 / 14 established")}</b><small>${T("1项部分 · 1项待补 · 1项口径待确认", "1 partial · 1 missing · 1 definition pending")}</small></div></header>
        <div class="wb-flush-body opp-evidence-grid">${evidence.map((item) => `<article class="opp-evidence-row is-${item[7]}"><span class="opp-evidence-code">${item[0]}</span><div><span class="opp-evidence-label">${T(item[1], item[4])}${ruleButton("evidence")}</span><b>${T(item[2], item[5])}</b></div><em>${T(item[3], item[6])}</em></article>`).join("")}</div>
        <footer class="opp-evidence-note">${icon("article")}<span>${T("E08直接读取当前商机的技术可行性；E11与E12始终采用同一条试料。多条试料和报价先过滤有效且审批通过的数据，再按业务日期选取。", "E08 reads technical feasibility directly. E11 and E12 always use the same trial. Multiple trials and quotes are filtered for valid approved records, then selected by business date.")}</span></footer>
      </section>

      <section class="wb-card wb-flush-card opportunity-support-card" data-od-id="opportunity-insight-support">
        <header class="wb-flush-head opp-card-head"><div class="wb-title-group"><span class="wb-icon" style="--wb-tone:var(--wb-orange)">${icon("chart-bar")}</span><div><h2>${T("项目辅助信息", "Project Supporting Information")}</h2><p>${T("分别呈现多次试料、多张报价、竞品金额对照与联系人覆盖", "Separate views for trials, quotes, competitor pricing, and contact coverage")}</p></div></div></header>
        <div class="wb-flush-body opportunity-support-grid">
          <article class="wb-subpanel opp-support-panel" data-od-id="opportunity-insight-trials"><header>${icon("heartbeat")}<div><b>${T("试料申请", "Trial Requests")} ${ruleButton("trial")}</b><small>${T("3次有效申请 · 共5个产品/料号 · 1次客户反馈待补", "3 valid requests · 5 products/part numbers · 1 feedback missing")}</small></div><em>${T("1次待闭环", "1 pending closure")}</em></header><div class="opp-record-list">
            <div class="opp-business-record"><span><b>TA-202608-003</b><small>2026-08-10</small></span><em class="is-warn">${T("客户测试", "Customer testing")}</em><p>WD-PC/ABS-02 · WD-PC/ABS-03</p><small>${T("现场结论：客户继续测试 · 反馈日期与内容待补", "On-site conclusion: continue testing · Feedback date and details missing")}</small></div>
            <div class="opp-business-record"><span><b>TA-202607-018</b><small>2026-07-18</small></span><em>${T("成功", "Successful")}</em><p>WD-PC/ABS-01</p><small>${T("现场结论：通过 · 客户反馈已形成", "On-site conclusion: passed · Customer feedback established")}</small></div>
            <div class="opp-business-record"><span><b>TA-202606-009</b><small>2026-06-22</small></span><em class="is-muted">${T("失败", "Failed")}</em><p>WD-PC/ABS-01 · ${T("客户暂定新料号", "Customer temporary new part number")}</p><small>${T("现场结论：需再次试料 · 失败原因：成型工艺问题", "On-site conclusion: retrial required · Cause: molding process")}</small></div>
          </div><footer class="wb-boundary-note">${T("料号读取产品/料号多选字段；未建立料号单独显示。", "Part numbers come from the product/part-number field; unregistered numbers remain separate.")}</footer></article>

          <article class="wb-subpanel opp-support-panel" data-od-id="opportunity-insight-quotes"><header>${icon("clipboard-text")}<div><b>${T("报价申请", "Quote Requests")} ${ruleButton("quote")}</b><small>${T("3张有效报价 · 5条材料明细 · 1条客户反馈待补", "3 valid quotes · 5 material lines · 1 feedback missing")}</small></div><em>${T("1条待反馈", "1 pending")}</em></header><div class="opp-record-list">
            <div class="opp-business-record"><span><b>BJ-202608-004</b><small>2026-08-02 · ${T("正式报价", "Formal quote")}</small></span><em class="is-warn">1/2 ${T("待反馈", "pending")}</em><p>WD-PC/ABS-02 · ¥19,500/${T("吨", "t")}<br>WD-PC/ABS-03 · ¥20,200/${T("吨", "t")}</p><small>${T("有效期至2026-09-01 · 1条已填写 · 1条待填写", "Valid to 2026-09-01 · 1 completed · 1 pending")}</small></div>
            <div class="opp-business-record"><span><b>BJ-202607-011</b><small>2026-07-16 · ${T("正式报价", "Formal quote")}</small></span><em>${T("已反馈", "Feedback complete")}</em><p>WD-PC/ABS-02 · ¥19,800/${T("吨", "t")}</p><small>${T("有效期至2026-08-15 · 材料反馈已填写", "Valid to 2026-08-15 · Material feedback completed")}</small></div>
            <div class="opp-business-record"><span><b>BJ-202606-026</b><small>2026-06-25 · ${T("估价", "Estimate")}</small></span><em class="is-muted">${T("参考报价", "Reference quote")}</em><p>WD-PC/ABS-01 · ¥20,400/${T("吨", "t")}<br>WD-PC/ABS-02 · ¥20,100/${T("吨", "t")}</p><small>${T("估价不作为有效正式报价闭环", "An estimate does not count as formal quote closure")}</small></div>
          </div><footer class="wb-boundary-note">${T("报价与试料申请暂无直接关联字段，按同属当前商机汇总。", "Quotes and trials have no direct link field and are grouped by the current opportunity.")}</footer></article>

          <article class="wb-subpanel opp-support-panel" data-od-id="opportunity-insight-competitors"><header>${icon("shield-warning")}<div><b>${T("竞争情况", "Competition")} ${ruleButton("competitor")}</b><small>${T("对照竞争对手、竞品与报价金额，先看原始价格事实", "Compare competitors, products, and raw quote values")}</small></div><em>${T("2家已维护", "2 maintained")}</em></header><div class="opp-compare" role="table" data-opp-aria-zh="竞争对手竞品与报价金额对照" data-opp-aria-en="Competitor products and quote amount comparison" aria-label="竞争对手竞品与报价金额对照"><div class="opp-compare-row is-head" role="row"><span>${T("竞争对手", "Competitor")}</span><span>${T("竞争产品", "Product")}</span><span>${T("竞品报价", "Competitor quote")}</span><span>${T("我方可比报价", "Our comparable quote")}</span></div><div class="opp-compare-row" role="row"><b>${T("华东材料A公司", "East China Material A")}</b><span>HC-PC/ABS 201</span><strong>¥18,600</strong><em>WD-PC/ABS-02 · ¥19,500</em></div><div class="opp-compare-row" role="row"><b>${T("国际材料B公司", "International Material B")}</b><span>IB-PC/ABS X5</span><strong>¥20,300</strong><em>WD-PC/ABS-03 · ¥20,200</em></div></div><div class="opp-chip-row"><span>${T("竞争产品 2/2", "Products 2/2")}</span><span>${T("报价金额 2/2", "Quote amounts 2/2")}</span><span class="is-warn">${T("赢单结果 1/2", "Win results 1/2")}</span><span class="is-warn">${T("我方优劣势 1/2", "Our strengths/weaknesses 1/2")}</span></div><footer class="wb-boundary-note">${T("币种、计价单位、含税口径一致后才能计算价差，当前不自动判断价格优势。", "Price differences require matching currency, unit, and tax basis; no price-advantage judgment is generated.")}</footer></article>

          <article class="wb-subpanel opp-support-panel" data-od-id="opportunity-insight-contacts"><header>${icon("users-three")}<div><b>${T("联系人覆盖", "Contact Coverage")} ${ruleButton("contacts")}</b><small>${T("交易客户与终端客户联系人池共11人，本项目已关联2人", "11 contacts across trading and end customers; 2 linked to this project")}</small></div><em>${T("2人已关联", "2 linked")}</em></header><div class="opp-contact-map"><span><b>${T("交易客户", "Trading customer")}</b><small>${T("6人中关联1人", "1 of 6 linked")}</small></span><strong><b>2${T("人", "")}</b><small>${T("本项目已关联", "Linked to project")}</small></strong><span><b>${T("终端客户", "End customer")}</b><small>${T("5人中关联1人", "1 of 5 linked")}</small></span></div><div class="opp-contact-list"><div><span class="opp-avatar">${icon("users-three")}</span><p><b>${T("刘工", "Engineer Liu")}</b><small>${T("研发部 · 材料工程师 · 最近跟进2026-08-03", "R&D · Materials engineer · Last follow-up 2026-08-03")}</small></p><em>${T("交易客户", "Trading customer")}</em></div><div><span class="opp-avatar">${icon("users-three")}</span><p><b>${T("陈经理", "Manager Chen")}</b><small>${T("采购部 · 采购经理 · 最近跟进2026-08-01", "Procurement · Purchasing manager · Last follow-up 2026-08-01")}</small></p><em>${T("终端客户", "End customer")}</em></div></div><footer class="wb-boundary-note">${T("姓名、部门、职位和最后跟进直接读取联系人主数据，不推断决策权或支持态度。", "Name, department, title, and last follow-up come directly from contact master data; decision power and support are not inferred.")}</footer></article>

          <article class="wb-subpanel opp-support-panel opp-win-review" data-od-id="opportunity-insight-win-review" data-opp-win-review hidden><header>${icon("article")}<div><b>${T("商机赢单复盘", "Opportunity Win Review")}</b><small>${T("当前商机已赢单，但尚未形成关联复盘", "The opportunity is won, but no linked review exists")}</small></div><em>${T("待沉淀", "To capture")}</em></header><div class="opp-review-grid"><span><b>${T("应用部件 / 场景", "Application / scenario")}</b><small>${T("待在赢单复盘中形成", "To be captured in the win review")}</small></span><span><b>${T("推荐沃德夫牌号", "Recommended Waldorf grade")}</b><small>${T("待在赢单复盘中形成", "To be captured in the win review")}</small></span><span><b>${T("开发周期与年用量", "Development cycle and annual usage")}</b><small>${T("待在赢单复盘中形成", "To be captured in the win review")}</small></span></div><footer class="wb-boundary-note">${T("仅在商机阶段为赢单时显示，并按关联商机字段核验有效复盘。", "Shown only for Won opportunities and verified through the linked-opportunity field.")}</footer></article>
        </div>
      </section>
      <div class="opp-rule-modal" data-opp-rule-modal role="dialog" aria-modal="true" data-opp-aria-zh="取数规则说明" data-opp-aria-en="Data rule details" aria-label="取数规则说明" hidden><div class="opp-rule-dialog"><header><h2 data-opp-rule-title></h2><button type="button" data-opp-rule-close data-opp-aria-zh="关闭取数规则" data-opp-aria-en="Close data rule" aria-label="关闭取数规则"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg></button></header><p data-opp-rule-body></p><footer>${action("知道了", "Got it", "", "", "opp-action-primary").replace("data-opp-action", "data-opp-rule-close")}</footer></div></div>
    </div>`;

  const applyLanguage = (root, language) => {
    const host = root?.querySelector?.(".opportunity-insight-page") || root;
    if (!host) return;
    host.querySelectorAll("[data-opp-lang]").forEach((element) => {
      element.hidden = element.dataset.oppLang !== language;
    });
    host.querySelectorAll("[data-opp-aria-zh]").forEach((element) => {
      element.setAttribute("aria-label", language === "en" ? element.dataset.oppAriaEn : element.dataset.oppAriaZh);
    });
  };

  const mount = (root, options = {}) => {
    const host = root?.querySelector?.(".opportunity-insight-page") || root;
    if (!host || host.dataset.oppMounted === "true") return;
    host.dataset.oppMounted = "true";
    const showToast = options.showToast || (() => {});
    host.addEventListener("click", (event) => {
      const stageButton = event.target.closest("[data-opp-stage]");
      if (stageButton) {
        const key = stageButton.dataset.oppStage;
        host.querySelectorAll("[data-opp-stage]").forEach((button) => {
          const active = button === stageButton;
          button.classList.toggle("active", active);
          button.setAttribute("aria-selected", String(active));
          button.tabIndex = active ? 0 : -1;
        });
        host.querySelectorAll("[data-opp-stage-panel]").forEach((panel) => { panel.hidden = panel.dataset.oppStagePanel !== key; });
        const winReview = host.querySelector("[data-opp-win-review]");
        if (winReview) winReview.hidden = key !== "won";
        showToast(document.documentElement.lang === "en" ? `Preview switched to ${stageButton.textContent.trim()}` : `原型状态已切换为${stageButton.textContent.trim()}`);
        return;
      }
      const ruleButton = event.target.closest("[data-opp-rule]");
      if (ruleButton) {
        const rule = rules[ruleButton.dataset.oppRule];
        const modal = host.querySelector("[data-opp-rule-modal]");
        if (!rule || !modal) return;
        const english = document.documentElement.lang === "en";
        modal.querySelector("[data-opp-rule-title]").textContent = english ? rule.titleEn : rule.titleZh;
        modal.querySelector("[data-opp-rule-body]").textContent = english ? rule.bodyEn : rule.bodyZh;
        modal.hidden = false;
        modal.querySelector("[data-opp-rule-close]")?.focus();
        return;
      }
      const closeRule = event.target.closest("[data-opp-rule-close]");
      if (closeRule) {
        const modal = host.querySelector("[data-opp-rule-modal]");
        if (modal) modal.hidden = true;
        return;
      }
      const actionButton = event.target.closest("[data-opp-action]");
      if (actionButton) {
        const english = document.documentElement.lang === "en";
        showToast(english ? actionButton.dataset.messageEn : actionButton.dataset.messageZh);
      }
    });
    host.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !host.querySelector("[data-opp-rule-modal]")?.hidden) {
        host.querySelector("[data-opp-rule-modal]").hidden = true;
        return;
      }
      const stageButton = event.target.closest("[data-opp-stage]");
      if (!stageButton || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const buttons = [...host.querySelectorAll("[data-opp-stage]")];
      const index = buttons.indexOf(stageButton);
      let next = index;
      if (event.key === "ArrowLeft") next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = buttons.length - 1;
      buttons[next].click();
      buttons[next].focus();
    });
    applyLanguage(host, document.documentElement.lang === "en" ? "en" : "zh");
  };

  window.WorkbenchOpportunityInsight = { render, mount, applyLanguage };
})();
