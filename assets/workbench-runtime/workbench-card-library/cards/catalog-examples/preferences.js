    (function () {
      var messages = {
        zh: {
"libraryBrand":"AI工作台UX规范",
"libraryNav":"模板分类",
"catalogIntroAria":"目录介绍",
"allTemplates":"介绍",
"searchCatalog":"搜索模板、组件或语义键",
"catalogCount":"个模板",
"semanticDetails":"语义说明",
"readSemantic":"阅读语义合同",
"permalink":"定位此模板",
"resources":"规范资源",
"cardSpec":"卡片布局规范",
"semanticSpec":"语义组件合同",
"promptSpec":"AI 生成提示词",
"openCanvas":"打开完整工作台",
"browseTemplates":"模板预览",
"emptyTitle":"没有匹配的模板",
"emptyDesc":"试试“指标”“筛选”或 data-table",
"clearSearch":"清除筛选",
"scopeRow":"统计周期与管理范围",
"dateRow":"日期范围与商机类型",
"massProduction":"量产阶段",
"sampleNote":"交互样例 · 业务动作需接入来源系统",
"mapping":"语义 → 组件",
"structure":"共享结构",
"fieldCount":"个字段定义",
"noSemantic":"布局组件 · 保留共享结构",
"semanticCount":"语义类型",
"paletteCount":"主题色系",
"sendPlaceholder":"发送消息", "amount380":"380 万",
"sampleResult":"此处展示组件交互，尚未连接业务服务",
"copySnippet":"复制结构",
"copied":"已复制",
"copyFailed":"请从下方选中并复制",
"previewNote":"预览与共享组件保持同步",
"group1":"组件示例",
"groupDesc1":"汇总关键组件的最佳展示效果与推荐用法",
"group2":"指标与分析",
"groupDesc2":"让经营事实、分布与业务关系保持清晰层级",
"group3":"业务协同",
"groupDesc3":"组合 AI、快捷入口与业务列表，保留完整操作",
"compositeCards":"复合卡片",
"compositeCardsDesc":"汇总多个业务模块组成的复合结构，在同类示例中比较层级、密度与关系表达",
"compositeCardsAria":"复合卡片",
"aipaasGroup":"AIPaaS 组件基础组件",
"aipaasWelcome":"欢迎卡片",
"aipaasInsight":"AI 洞察",
"aipaasObjectEntry":"对象入口",
"aipaasInformationList":"信息列表卡片",
"aipaasObjectList":"对象列表",
"aipaasText":"文本",
"aipaasButton":"按钮",
"aipaasImage":"图片",
"themeConfig":"主题色配置",
"industryExamples":"行业工作台示例",
"industryExamplesDesc":"直接打开行业工作台完整页面，在新窗口查看独立运行效果",
"genericWorkbench":"通用工作台",
"genericWorkbenchDesc":"打开通用业务画布，查看完整工作台结构",
"wardoffWorkbench":"沃德夫工作台",
"wardoffWorkbenchDesc":"打开沃德夫 CRM 工作台，查看行业化业务外框",
"openInNewWindow":"新窗口打开",
"aipaasAgent":"AI Agent",
"aipaasWelcomeDesc":"从纯信息标题到角色化经营场景，保持同一组工作台入口用于横向比较",
"aipaasFourStyles":"4 种样式",
"welcomeMinimal":"极简标题",
"welcomeMinimalDesc":"适合任务密集、页面高度受限的工作台",
"welcomeMinimalAria":"极简欢迎卡片",
"welcomeStandard":"标准控制型",
"welcomeStandardDesc":"补充统计周期与管理范围，适合日常经营看板",
"welcomeStandardAria":"标准控制型欢迎卡片",
"welcomeEmphasis":"经营强调型",
"welcomeEmphasisDesc":"加入状态摘要与主动作，强化当前经营重点",
"welcomeEmphasisAria":"经营强调型欢迎卡片",
"welcomeRich":"丰富角色型",
"welcomeRichDesc":"角色形象、经营摘要与筛选组合，适合一级工作台首页",
"welcomeRichAria":"丰富角色型欢迎卡片",
"salesWorkbench":"销售经营工作台",
"monthlyEast":"本月经营概览 · 华东区域",
"updated0930":"更新于 09:30",
"businessSummary":"本月新增 12 家活跃客户，3 个重点商机等待推进",
"businessMetrics":"经营摘要",
"directorBrief":"华东销售总监 · 今日经营简报",
"richSummary":"客户结构稳健，优先处理 3 项反馈逾期",
"aipaasShellNote":"页面边界已建立，样例将依据后续产品来源补全",
"aipaasDefaultState":"默认信息层级",
"aipaasInteractionState":"交互与反馈",
"aipaasSystemState":"空、加载、错误状态",
"aipaasInsightDesc":"定义结论、依据、可信边界与后续动作的基础结构",
"aipaasObjectEntryDesc":"承载业务对象的识别、摘要与可访问入口",
"aipaasInformationListDesc":"待办、提醒、关注与 AI待协助，展示业务提醒与对话中的待处理事项",
"aipaasObjectListDesc":"统一对象列表的字段、状态、选择与批量操作",
"aipaasTextDesc":"建立标题、正文、辅助信息与结构化输出的字阶",
"aipaasButtonDesc":"区分主要、次要、危险、文本与图标动作",
"aipaasImageDesc":"规范图片容器、裁切、占位、预览与错误降级",
"themeConfigDesc":"统一页面布局、Surface、色彩、明暗与内容背景",
"aipaasAgentDesc":"定义 Agent 身份、能力、执行过程、工具调用与结果回传",
          pageTitle: "规范与语义模板库", pageSubtitle: "从业务语义到标准组件，在真实卡片中查看布局与交互",
          paletteControl: "选择色系", paletteMenu: "色系列表", languageControl: "语言切换", appearanceControl: "明暗模式切换", styleControl: "主题风格",
          workspaceTabs: "工作台页签导航", workspaceTabsTitle: "内容宽度页签组", workspaceTabsDesc: "底色包裹页签，工具动作独立靠右", workspaceTabsAria: "工作台切换", templateLibrary: "模板库", companyOperation: "公司经营", managementScope: "我的管理范围", salesBusiness: "我的销售业务", canvasSettings: "画布设置",
          paletteClassic: "经典蓝", paletteSpruce: "云杉绿", paletteCoral: "珊瑚橙", paletteIris: "鸢尾紫", paletteRose: "石墨红", paletteGraphite: "中性灰",
          richHeaderCard: "丰富头部卡片", workbenchTitle: "工作台标题", roleDescription: "角色描述", dataUpdated: "数据更新于 2026年8月10日 09:30", regionFilter: "区域筛选", allRegions: "全部区域", eastChina: "华东",
          light: "浅色", dark: "深色", minimal: "简约", rich: "丰富", metricCard: "指标卡片", analysisCard: "复合分析卡片", riskTableCard: "风险表格卡片", selectControl: "枚举筛选控件", densityComponents: "复合快捷卡", compositeCard: "复合卡片层级", riskGrouping: "风险结果分组", groupByLevel: "按等级", groupByStatus: "按状态", groupByOwner: "按负责人", ownerRisk: "张风控", ownerLegal: "李法务", highRisk: "高风险", mediumRisk: "中风险", reviewing: "复核中", handled: "已处理",
          compositeTitle: "项目推进与业务闭环", compositeDesc: "主卡、分析子面板与内部指标保持清晰层级", stageStructure: "商机阶段结构", trialClosure: "试料反馈闭环", approvedResults: "审批通过后的客户结论", quoteFeedback: "材料报价反馈", approvedQuotes: "审批通过后的逐材料反馈", trialPassRate: "试料通过率", priceFeedbackRate: "价格反馈填写率", descriptionRate: "反馈说明填写率", relationFlow: "关系链路", relationFlowDesc: "客户、注塑厂、模具厂与经销商的下游关系", relationDemoAria: "三分支客户关系", currentTierAria: "当前客户层级", downstreamTierAria: "三个下游客户层级", currentCustomer: "当前客户", downstreamCustomer: "注塑厂", downstreamMold: "模具厂", downstreamAgent: "经销商",
          densityTitle: "统一卡片密度", densityDesc: "快捷入口、阶段行与右侧单一处理动作", quickEntries: "快捷入口", quickEntriesDesc: "销售线索、团队客户与商机项目的有效储备", densityStagesDesc: "阶段数量、金额与推进比例", riskFollowup: "风险跟进", riskFollowupDesc: "单一处理入口保留当前风险上下文", refreshInsight: "刷新洞察", openCrm: "打开 CRM", secondaryCommand: "次要命令", primaryCommand: "主要命令", editAffordanceNote: "编辑态引导线与缩放控件完全内收；卡片隐藏由右上角图标与底部唯一恢复胶囊管理", salesLeads: "销售线索", validReserve: "有效储备", createSalesLead: "新建销售线索", teamCustomers: "团队客户", active90: "近90天活跃", opportunityProjects: "商机项目", validPipeline: "有效在途", businessContact: "商务接触", trialStage: "试样阶段", fiveItems: "5 项", threeItems: "3 项", feedbackPending: "客户测试反馈未闭环", overdueSeven: "试样阶段 · 逾期7天",
          selectTitle: "管理单元筛选", selectDesc: "圆角弹层、轻投影与完整键盘操作", reportingPeriod: "统计周期", quarter: "本季度", last90Days: "近90天", managementUnit: "管理单元", allUnits: "全部管理单元", aviationUnit: "低空飞行事业部", cleaningUnit: "清洁家电事业部", energyUnit: "新能源事业部", pcrUnit: "PCR与共聚酯事业部", dateRange: "日期范围", opportunityType: "商机类型", allOpportunities: "全部商机",
          semanticEntries: "AI 与搜索入口", aiBriefMeta: "今日经营简报 · 基于 CRM 可核验事实", aiBriefTitle: "项目储备稳定，优先处理反馈逾期", aiBriefDesc: "确定性规则识别异常，AI 只负责归纳结论", viewDiagnosis: "查看诊断", aiEntryTitle: "Hi，我能为你做些什么", askAssistant: "向经营助手提问", send: "发送", globalSearch: "全局搜索", globalSearchPlaceholder: "客户 / 商机 / 产品", listSearch: "列表搜索", listSearchPlaceholder: "搜索当前列表",
          baseTitle: "经营基本盘", baseDesc: "点击数字进入 CRM 原生筛选列表", periodAll: "本月 · 全部区域",
          activeCustomers: "活跃客户", activeDesc: "近90天有商机或有效互动", expectedAmount: "预计项目金额", expectedAmountValue: "6,703.5万元", pipelineCount: "13 个在途商机", activeOpp: "在途商机", opportunityDesc: "预计金额 6,703.5 万元",
          sampleOverdue: "试料逾期", waitFeedback: "等待客户反馈", closureRate: "闭环率", feedbackClosure: "客户反馈闭环率",
          industryTitle: "行业项目储备与阶段结构", industryDesc: "阶段金额按行业分布", stageDistribution: "阶段金额分布", outcomeDesc: "赢单、终止与暂停项目分布", month: "本月", lowAltitude: "低空飞行", cleaningAppliance: "清洁家电",
          lowAltitudeAria: "低空飞行 680万", cleaningAria: "清洁家电 520万", amount680: "680万", amount520: "520万", outcomeTotal: "结果与暂停", wonProjects: "赢单项目", terminatedProjects: "终止项目", pausedProjects: "暂停项目", wonAmountShare: "赢单项目预计金额占结果项目金额", missingPauseReason: "暂停原因缺失", oneItem: "1 项",
          riskTitle: "需要关注的重大项目风险", riskDesc: "存在明确项目风险", viewAll: "3 项 · 查看全部 ›",
          opportunityName: "商机项目名称", tradingCustomer: "交易客户", level: "级别", stage: "阶段", waitTime: "等待时间", quickAction: "快捷处理", handle: "处理",
          project1: "扫地机耐划伤结构件", company1: "苏州精密注塑有限公司", sampleStage: "试样阶段", days12: "12天",
          project2: "高压连接器材料替换", company2: "华东汽车连接器有限公司", importStage: "导入阶段", days18: "18天",
          pageSize: "每页10条 · 共3条", pageNumber: "第1 / 1页"
        },
        en: {
"libraryBrand":"AI Workbench UX",
"libraryNav":"Template categories",
"catalogIntroAria":"Catalog introduction",
"allTemplates":"Introduction",
"searchCatalog":"Search templates, components, or semantic keys",
"catalogCount":"templates",
"semanticDetails":"Contract",
"readSemantic":"Read semantic contract",
"permalink":"Link to this template",
"resources":"Resources",
"cardSpec":"Card layout guidelines",
"semanticSpec":"Semantic component contract",
"promptSpec":"AI generation prompt",
"openCanvas":"Open full workbench",
"browseTemplates":"Template previews",
"emptyTitle":"No matching templates",
"emptyDesc":"Try “metrics”, “filter”, or data-table",
"clearSearch":"Clear filters",
"scopeRow":"Reporting period & management scope",
"dateRow":"Date range & opportunity type",
"massProduction":"Mass production",
"sampleNote":"Interactive samples · Connect business actions to your source system",
"mapping":"Semantic → component",
"structure":"Shared structure",
"fieldCount":"field definitions",
"noSemantic":"Layout component · Shared structure",
"semanticCount":"semantic types",
"paletteCount":"color palettes",
"sendPlaceholder":"Send a message", "amount380":"CNY 3.8m",
"sampleResult":"Component interaction preview; business service is not connected",
"copySnippet":"Copy markup",
"copied":"Copied",
"copyFailed":"Select and copy the markup below",
"previewNote":"Previews use the shared components",
"group1":"Component examples",
"groupDesc1":"Best display patterns and recommended usage for key components",
"group2":"Metrics & analysis",
"groupDesc2":"Clear hierarchy for facts, distributions, and relationships",
"group3":"Business workflows",
"groupDesc3":"Compose AI, quick entries, and complete business lists",
"compositeCards":"Composite cards",
"compositeCardsDesc":"Compare hierarchy, density, and relationships across card compositions built from multiple business modules",
"compositeCardsAria":"Composite cards",
"aipaasGroup":"AIPaaS component foundations",
"aipaasWelcome":"Welcome card",
"aipaasInsight":"AI insights",
"aipaasObjectEntry":"Object entry",
"aipaasInformationList":"Information list card",
"aipaasObjectList":"Object list",
"aipaasText":"Text",
"aipaasButton":"Buttons",
"aipaasImage":"Images",
"themeConfig":"Theme color configuration",
"industryExamples":"Industry workbench examples",
"industryExamplesDesc":"Open complete industry workbench pages in new windows to review their standalone behavior",
"genericWorkbench":"General workbench",
"genericWorkbenchDesc":"Open the general business canvas and review the complete workbench structure",
"wardoffWorkbench":"Wardoff workbench",
"wardoffWorkbenchDesc":"Open the Wardoff CRM workbench and review its industry business shell",
"openInNewWindow":"Open in new window",
"aipaasAgent":"AI Agent",
"aipaasWelcomeDesc":"Compare the same workbench entry from a compact information title to a role-led operating scene",
"aipaasFourStyles":"4 styles",
"welcomeMinimal":"Minimal title",
"welcomeMinimalDesc":"For task-dense workbenches with constrained vertical space",
"welcomeMinimalAria":"Minimal welcome card",
"welcomeStandard":"Standard controls",
"welcomeStandardDesc":"Adds reporting period and management scope for daily operating dashboards",
"welcomeStandardAria":"Standard-control welcome card",
"welcomeEmphasis":"Operating emphasis",
"welcomeEmphasisDesc":"Adds a status summary and primary action to foreground the current priority",
"welcomeEmphasisAria":"Operating-emphasis welcome card",
"welcomeRich":"Rich role",
"welcomeRichDesc":"Combines a role visual, operating summary, and filters for a top-level workbench home",
"welcomeRichAria":"Rich-role welcome card",
"salesWorkbench":"Sales Operations Workbench",
"monthlyEast":"Monthly operating overview · East China",
"updated0930":"Updated at 09:30",
"businessSummary":"12 new active customers this month; 3 key opportunities need progress",
"businessMetrics":"Operating summary",
"directorBrief":"East China Sales Director · Today's briefing",
"richSummary":"Customer mix is healthy; prioritize 3 overdue feedback items",
"aipaasShellNote":"The page boundary is ready; examples will be completed from the next product source",
"aipaasDefaultState":"Default information hierarchy",
"aipaasInteractionState":"Interaction and feedback",
"aipaasSystemState":"Empty, loading, and error states",
"aipaasInsightDesc":"Foundations for conclusions, evidence, confidence boundaries, and follow-up actions",
"aipaasObjectEntryDesc":"Identity, summary, and accessible entry patterns for business objects",
"aipaasInformationListDesc":"Tasks, reminders, followed records and AI assistance notifications from conversations",
"aipaasObjectListDesc":"Fields, states, selection, and bulk operations for object lists",
"aipaasTextDesc":"Type hierarchy for titles, body copy, supporting information, and structured output",
"aipaasButtonDesc":"Primary, secondary, destructive, text, and icon action responsibilities",
"aipaasImageDesc":"Image containers, cropping, placeholders, previews, and error fallback",
"themeConfigDesc":"Page layout, surfaces, color, appearance, and content backgrounds",
"aipaasAgentDesc":"Agent identity, capabilities, execution progress, tool calls, and returned results",
          pageTitle: "Guidelines & Semantic Templates", pageSubtitle: "Explore standard components, business semantics, and live card layouts",
          paletteControl: "Choose color palette", paletteMenu: "Color palettes", languageControl: "Language", appearanceControl: "Appearance", styleControl: "Theme style",
          workspaceTabs: "Workbench Tab Navigation", workspaceTabsTitle: "Content-width Tab Group", workspaceTabsDesc: "The Surface wraps the tabs while tools remain independently aligned", workspaceTabsAria: "Switch workbench", templateLibrary: "Template Library", companyOperation: "Company Operations", managementScope: "My Management Scope", salesBusiness: "My Sales Business", canvasSettings: "Canvas settings",
          paletteClassic: "Classic Blue", paletteSpruce: "Spruce Green", paletteCoral: "Coral Orange", paletteIris: "Iris Purple", paletteRose: "Graphite Red", paletteGraphite: "Neutral Gray",
          richHeaderCard: "Rich Header Card", workbenchTitle: "Workbench title", roleDescription: "Role description", dataUpdated: "Updated August 10, 2026 at 09:30", regionFilter: "Region filter", allRegions: "All regions", eastChina: "East China",
          light: "Light", dark: "Dark", minimal: "Minimal", rich: "Rich", metricCard: "Metric Card", analysisCard: "Composite Analysis Card", riskTableCard: "Risk Table Card", selectControl: "Enumeration Filter", densityComponents: "Composite Quick Card", compositeCard: "Composite Card Hierarchy", riskGrouping: "Risk result grouping", groupByLevel: "By level", groupByStatus: "By status", groupByOwner: "By owner", ownerRisk: "Zhang · Risk", ownerLegal: "Li · Legal", highRisk: "High risk", mediumRisk: "Medium risk", reviewing: "In review", handled: "Handled",
          compositeTitle: "Project Progress and Business Closure", compositeDesc: "Keep the parent card, analysis subpanels, and inner metrics visually distinct", stageStructure: "Opportunity Stage Mix", trialClosure: "Trial Feedback Closure", approvedResults: "Customer results after approval", quoteFeedback: "Material Quote Feedback", approvedQuotes: "Per-material feedback after approval", trialPassRate: "Trial pass rate", priceFeedbackRate: "Price feedback completion", descriptionRate: "Feedback note completion", relationFlow: "Relationship flow", relationFlowDesc: "Downstream relationships across the customer, molding plant, mold factory, and distributor", relationDemoAria: "Three-branch customer relationship", currentTierAria: "Current customer tier", downstreamTierAria: "Three downstream customer tier", currentCustomer: "Current customer", downstreamCustomer: "Injection molding plant", downstreamMold: "Mold factory", downstreamAgent: "Distributor",
          densityTitle: "Unified Card Density", densityDesc: "Quick entries, stage rows, and one trailing action", quickEntries: "Quick entries", quickEntriesDesc: "Valid reserve across sales leads, team customers, and opportunities", densityStagesDesc: "Stage counts, amounts, and progression", riskFollowup: "Risk follow-up", riskFollowupDesc: "One action entry preserves the current risk context", refreshInsight: "Refresh insight", openCrm: "Open CRM", secondaryCommand: "Secondary command", primaryCommand: "Primary command", editAffordanceNote: "Edit guides and resize affordances stay inside card bounds; a top-right icon and one bottom restore capsule manage hidden cards", salesLeads: "Sales leads", validReserve: "Valid reserve", createSalesLead: "Create sales lead", teamCustomers: "Team customers", active90: "Active in 90 days", opportunityProjects: "Opportunities", validPipeline: "Active pipeline", businessContact: "Business contact", trialStage: "Trial stage", fiveItems: "5 items", threeItems: "3 items", feedbackPending: "Customer test feedback pending", overdueSeven: "Trial stage · 7 days overdue",
          selectTitle: "Management Unit Filter", selectDesc: "Rounded popover, soft shadow, and complete keyboard operation", reportingPeriod: "Reporting period", quarter: "This quarter", last90Days: "Last 90 days", managementUnit: "Management unit", allUnits: "All management units", aviationUnit: "Low-altitude aviation BU", cleaningUnit: "Cleaning appliances BU", energyUnit: "New energy BU", pcrUnit: "PCR and copolyester BU", dateRange: "Date range", opportunityType: "Opportunity type", allOpportunities: "All opportunities",
          semanticEntries: "AI and Search Entries", aiBriefMeta: "Daily brief · Based on verifiable CRM facts", aiBriefTitle: "Pipeline is stable; resolve overdue feedback first", aiBriefDesc: "Rules identify exceptions; AI only summarizes the conclusion", viewDiagnosis: "View diagnosis", aiEntryTitle: "Hi, what can I help you with?", askAssistant: "Ask the operating assistant", send: "Send", globalSearch: "Global search", globalSearchPlaceholder: "Customers / opportunities / products", listSearch: "List search", listSearchPlaceholder: "Search this list",
          baseTitle: "Operating Baseline", baseDesc: "Select a number to open the native CRM filtered list", periodAll: "This month · All regions",
          activeCustomers: "Active customers", activeDesc: "Opportunity or valid interaction in the last 90 days", expectedAmount: "Expected project amount", expectedAmountValue: "CNY 67.035m", pipelineCount: "13 open opportunities", activeOpp: "Open opportunities", opportunityDesc: "Est. amount CNY 67.035m",
          sampleOverdue: "Overdue trials", waitFeedback: "Awaiting customer feedback", closureRate: "Closure rate", feedbackClosure: "Customer feedback closure rate",
          industryTitle: "Industry Pipeline and Stage Mix", industryDesc: "Stage amount by industry", stageDistribution: "Stage amount distribution", outcomeDesc: "Won, terminated, and paused project distribution", month: "This month", lowAltitude: "Low-altitude aviation", cleaningAppliance: "Cleaning appliances",
          lowAltitudeAria: "Low-altitude aviation, CNY 6.8m", cleaningAria: "Cleaning appliances, CNY 5.2m", amount680: "CNY 6.8m", amount520: "CNY 5.2m", outcomeTotal: "Outcomes and pauses", wonProjects: "Won projects", terminatedProjects: "Terminated projects", pausedProjects: "Paused projects", wonAmountShare: "Won-project amount as a share of outcome amount", missingPauseReason: "Missing pause reason", oneItem: "1 item",
          riskTitle: "Major Project Risks Requiring Attention", riskDesc: "Projects with identified risks", viewAll: "3 items · View all ›",
          opportunityName: "Opportunity", tradingCustomer: "Trading customer", level: "Level", stage: "Stage", waitTime: "Waiting time", quickAction: "Quick action", handle: "Handle",
          project1: "Scratch-resistant robot vacuum component", company1: "Suzhou Precision Injection Molding Co., Ltd.", sampleStage: "Trial stage", days12: "12 days",
          project2: "High-voltage connector material replacement", company2: "East China Auto Connector Co., Ltd.", importStage: "Introduction stage", days18: "18 days",
          pageSize: "10 per page · 3 total", pageNumber: "Page 1 / 1"
        }
      };
      window.CatalogMessages = messages;
      var palettes = ["classic", "spruce", "coral", "iris", "rose", "graphite"];
      var storageKey = "ai-workbench-ux-catalog";
      var state = { palette: "classic", theme: "light", style: "rich", language: "zh" };
      try { Object.assign(state, JSON.parse(localStorage.getItem(storageKey) || "{}")); } catch (error) {}
      if (state.palette === "indigo") state.palette = "iris";
      if (!palettes.includes(state.palette)) state.palette = "classic";
      if (!/^(light|dark)$/.test(state.theme)) state.theme = "light";
      if (!/^(minimal|rich)$/.test(state.style)) state.style = "rich";
      if (!/^(zh|en)$/.test(state.language)) state.language = "zh";

      var paletteTrigger = document.querySelector("[data-palette-trigger]");
      var paletteMenu = document.querySelector("[data-palette-menu]");
      function saveState() { try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch (error) {} }
      function closePalette() { paletteMenu.hidden = true; paletteTrigger.setAttribute("aria-expanded", "false"); }
      function applyPalette() {
        document.documentElement.dataset.colorTheme = state.palette;
        document.querySelectorAll("[data-color-choice]").forEach(function (button) {
          button.setAttribute("aria-checked", String(button.dataset.colorChoice === state.palette));
        });
        var paletteKey = "palette" + state.palette.charAt(0).toUpperCase() + state.palette.slice(1);
        document.querySelector("[data-palette-name]").textContent = messages[state.language][paletteKey];
      }
      function applyTheme() {
        document.documentElement.dataset.theme = state.theme;
        document.querySelectorAll("[data-theme-choice]").forEach(function (button) {
          button.setAttribute("aria-selected", String(button.dataset.themeChoice === state.theme));
        });
      }
      function applyStyle() {
        document.documentElement.dataset.wbStyle = state.style;
        document.querySelectorAll("[data-style-choice]").forEach(function (button) {
          button.setAttribute("aria-selected", String(button.dataset.styleChoice === state.style));
        });
      }
      function applyLanguage() {
        var dictionary = messages[state.language];
        document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
        document.title = dictionary.pageTitle;
        document.querySelectorAll("[data-i18n]").forEach(function (element) { element.textContent = dictionary[element.dataset.i18n]; });
        document.querySelectorAll("[data-i18n-aria]").forEach(function (element) { element.setAttribute("aria-label", dictionary[element.dataset.i18nAria]); });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) { element.setAttribute("placeholder", dictionary[element.dataset.i18nPlaceholder]); });
        document.querySelectorAll("[data-copy-zh]").forEach(function (element) { element.textContent = state.language === "zh" ? element.dataset.copyZh : element.dataset.copyEn; });
        document.querySelectorAll("[data-copy-aria-zh]").forEach(function (element) { element.setAttribute("aria-label", state.language === "zh" ? element.dataset.copyAriaZh : element.dataset.copyAriaEn); });
        document.querySelectorAll("[data-copy-placeholder-zh]").forEach(function (element) { element.setAttribute("placeholder", state.language === "zh" ? element.dataset.copyPlaceholderZh : element.dataset.copyPlaceholderEn); });
        document.querySelectorAll("[data-language-choice]").forEach(function (button) {
          button.setAttribute("aria-selected", String(button.dataset.languageChoice === state.language));
        });
        applyPalette();
        document.dispatchEvent(new CustomEvent("catalog:language", {detail:state.language}));
        if (window.WorkbenchSelect) window.WorkbenchSelect.refresh(document);
      }

      paletteTrigger.addEventListener("click", function () {
        paletteMenu.hidden = !paletteMenu.hidden;
        paletteTrigger.setAttribute("aria-expanded", String(!paletteMenu.hidden));
      });
      document.querySelectorAll("[data-color-choice]").forEach(function (button) {
        button.addEventListener("click", function () { state.palette = button.dataset.colorChoice; applyPalette(); closePalette(); saveState(); });
      });
      document.querySelectorAll("[data-language-choice]").forEach(function (button) {
        button.addEventListener("click", function () { state.language = button.dataset.languageChoice; applyLanguage(); saveState(); });
      });
      document.querySelectorAll("[data-theme-choice]").forEach(function (button) {
        button.addEventListener("click", function () { state.theme = button.dataset.themeChoice; applyTheme(); saveState(); });
      });
      document.querySelectorAll("[data-style-choice]").forEach(function (button) {
        button.addEventListener("click", function () { state.style = button.dataset.styleChoice; applyStyle(); saveState(); });
      });
      document.querySelectorAll(".wb-workspace-tab-list").forEach(function (tabList) {
        function selectWorkspaceTab(tab, focus) {
          tabList.querySelectorAll(".wb-workspace-tab").forEach(function (item) {
            var selected = item === tab;
            item.setAttribute("aria-selected", String(selected));
            item.tabIndex = selected ? 0 : -1;
          });
          if (focus) tab.focus();
        }
        tabList.addEventListener("click", function (event) {
          var tab = event.target.closest(".wb-workspace-tab");
          if (!tab || !tabList.contains(tab)) return;
          selectWorkspaceTab(tab, false);
        });
        tabList.addEventListener("keydown", function (event) {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          var tabs = Array.from(tabList.querySelectorAll(".wb-workspace-tab"));
          var index = Math.max(0, tabs.indexOf(document.activeElement));
          var nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
          selectWorkspaceTab(tabs[nextIndex], true);
        });
      });
      document.addEventListener("click", function (event) { if (!event.target.closest(".palette-picker")) closePalette(); });
      document.addEventListener("keydown", function (event) { if (event.key === "Escape" && !paletteMenu.hidden) { closePalette(); paletteTrigger.focus(); } });

      applyPalette();
      applyTheme();
      applyStyle();
      applyLanguage();
    }());
