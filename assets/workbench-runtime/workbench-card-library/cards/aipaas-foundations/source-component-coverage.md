# AIPaaS 基础组件来源覆盖

版本：`ai-workbench-ux@1.6.38`

| 导航页 | 来源证据 | 保留内容 | 组件落点 |
| --- | --- | --- | --- |
| 欢迎卡片 | 既有模板库头部卡片页 | 4 种标题到角色化工作台入口 | `.wb-aipaas-welcome-card` |
| AI 洞察 | 用户提供图 1、图 2 + 生成时间/重新生成、位置、样式与底部同行批注（2026-09-21） | 结论、规则边界、识别器计数、置信度、诊断入口；两张卡以 `yyyy-mm-dd HH:MM` 模拟时间和指定双路径刷新图形呈现生成元信息，时间使用 `Source Han Sans CN` 12px/18px、400 字重与 `--color-neutrals11`，刷新按钮无背景/边框/阴影且图形为 16px；第一张卡移除辅助归纳 kicker，并在宽容器中用共享底部行把左侧元信息与右侧三个后续操作垂直居中，窄容器安全分行；第二张卡移除“全部 6 个事件”总量胶囊 | `.wb-aipaas-insight-brief`、`.wb-aipaas-recognition-grid`、`.wb-ai-generation-row`、`.wb-ai-generation-meta` |
| 对象入口 | `crm-quick-entries` 注释卡片 + 用户布局/删除批注（2026-09-15）+ 移动端/报价图标/精简模式批注（2026-09-16） | 客户、项目商机、试料验证、报价管理、待办决策及原值；仅保留左右完整、左右名称型、上下名称型 3 种样式，删除上下完整型；名称型只显示图标和对象名称，上下名称型在宽目录容器中一行五个；390px 完整模式保持单列五项，精简模式固定一行五项、图标在上名称在下、gap 为 0，入口移除背景/描边/圆角/阴影，图标保留完整模式身份色与 34px 浅色容器，DOM 只有图标和对象名称，同时保留按钮、合法路由、ARIA、至少 44px 点击高度与焦点；报价管理使用剪贴板语义 SVG | `.wb-object-entry-grid` + `.wb-object-entry-card.is-bare` + `[data-object-entry-mobile-showcase]` |
| 信息列表卡片 | 用户提供的“我的待办 / 我的提醒 / 我的关注”三列截图（2026-10-09）；目录浏览器批注要求拆成编号标题的三个示例并移除页签（2026-10-09） | 01/02/03 分别展示待办、提醒、关注，共用同一信息列表结构；待办总数 6、提醒总数 5，关注总数来源未给出而不渲染。逐条保留合同、商机、金额、数量、日期和说明，不把可见条数当总量；右侧元信息改为共享胶囊，今天用强调色，偏移与报价临期用风险色，普通日期/类型为中性；操作仅为未接服务演示反馈 | `index.html#aipaas-information-list` + 三个 `.wb-info-list-card`；`information-list -> information-list-card` |
| AI待协助 | 用户浏览器批注及文字需求（2026-10-19），最新要求仅保留未处理 | 确认客户拜访重点、完成企业ERP授权来自用户需求；对话和Agent名为标注演示数据。删除已处理批复示例和全部筛选DOM，仅保留未处理2条及标题右侧单一数量；橙点、来源、Agent名称标签、去处理与分隔线保留，业务动作仅反馈未接服务 | `index.html#aipaas-information-list` 第04例 + `cards/ai-assistance/`；`ai-assistance -> ai-assistance-list` |
| 对象列表 | 4 处浏览器注释 + 一级标题图标批注（2026-09-16） | 重点商机、管理范围、今日待处理、销售线索的字段/值/操作；卡片一级标题不显示装饰图标 | `.wb-aipaas-table-card` + `.wb-table` + `.wb-title-group.is-iconless` |
| M3E 列表 | 用户业务组件批注（2026-09-22）；本目录管理范围示例与 `fxiaoke-workbench-canvas.html` 的 people/customer 面板 | 直接复用共享列表样式；行业大区/销售人员各七列四行、客户级别六列四行，保留单位、风险和原始比例，不据比例修正来源状态文案 | `m3e-canvas/workbench-card-library/cards/business-list/`；`business-table -> data-table` |
| 复合卡片一级标题 | 用户批注（2026-09-16） | 三个复合示例移除一级标题装饰图标，内部子面板继续保留语义 SVG | `.wb-composite-card > .wb-card-head .wb-title-group.is-iconless` |
| 文本 | 通用工作台文字规范 | H1/H2/H3、卡片标题、正文、辅助、标签、链接 | `.wb-aipaas-type-specimen` |
| 按钮 | 共享工作台动作合同 | 主、次、文字、危险、图标、禁用、加载、尺寸 | `.wb-aipaas-button-grid` |
| 图片 | `role-image/` | 8 个透明 PNG 文件名与角色映射 | `.wb-aipaas-role-grid` |
| AI Agent（桌面，保持不变） | `conversation.html` 对话框 + Figma `6456:55501` + 纷享销客 ShareAgent 截图 + 用户批注 1-4（2026-09-14） | `fx-avatar.png` 头像、24px/34px 400 字重欢迎语、浅灰蓝输入框、智能体、`Deepseek-V4-Flash`、附件、分隔线、语音、动态发送；批准删除建议问题区；160px 双层输入框与智能体/模型工具栏仅属于桌面 | `.wb-aipaas-agent-card` + `.wb-agent-composer` |
| AI Agent（第二示例：移动端） | 用户提供的 ShareClaw Figma `2836:10765` 移动输入条截图；新截图浏览器 URL 节点 `1596:19284`（2026-09-21），仅参考对话框 | 保留原卡片与 `fx-avatar.png`；`.wb-aipaas-agent-mobile-preview` 作用域内卡片内边距 12px、头像容器与实际图片均为 32px × 32px（描边不占尺寸）、图片右缘到欢迎语左缘为 12px 且垂直居中、欢迎语与输入条间距 12px、欢迎语 18px/26px 400 字重；预览最大 390px，单行输入条 min-height 56px、padding 5px 4px、radius 20px；声波 / “发消息或按住说话”输入 / 麦克风 / 附件加号 / 浅紫圆形发送；四按钮触达至少 44px、发送圆图形 32px；浅色白底读取 `--wb-surface-strong`，深色自动读取共享 Token；桌面示例 01 不变（43px 头像、24px/34px 欢迎语、20px 节奏），不带模型选择器或手机键盘 | `index.html#aipaas-agent` + `.wb-agent-composer.is-mobile`；共享 `token-component` 层，仍为 `ai-entry -> ai-composer` |
| AI Agent（第三示例：仅移动端对话框） | 同 `2836:10765` 移动输入条截图（2026-09-21），仅取输入条本身 | 03「仅移动端对话框」/ "Mobile composer only"，说明「390px 移动端示例 · 去掉头像、欢迎语与卡片，仅保留单行对话框」；DOM 中不含 `.wb-aipaas-agent-card`、`.wb-aipaas-agent-logo` 头像和欢迎语 `<h2>`；表单自带 `data-wb-semantic="ai-entry"`、`data-wb-component="ai-composer"`、`data-aipaas-agent-form` 及双语 `aria-label`（移动端 AI 输入区域（仅输入框）/ Mobile AI input (composer only)）；输入条尺寸、按钮顺序、44px 触达、32px 发送图形、消息字段元数据、空白禁用、原生/Enter 提交与 IME 保护、工具按钮演示 toast 均与第二示例一致 | `.wb-aipaas-preview.wb-aipaas-agent-mobile-input-only`（宽度 100%、最大 390px）+ `form.wb-agent-composer.is-mobile` |
| 主题色配置 | 用户批注 3/4 + 共享主题 Token | 6 色系、气质、行业推荐；独立导航、标题改名、靛青替换为鸢尾紫 | `.wb-aipaas-theme-grid` |
| 行业工作台示例 | 用户批注 5 | 通用工作台与沃德夫工作台入口，新窗口打开指定 HTML | `.wb-library-industry-link` |
| Rich Header 角色切换 | 用户批注 3 + `role-image/` + 画布 `roleVisuals` | 8 个真实角色、7 套服装色背景、图片校准尺寸、鼠标/键盘 Tab 切换 | `.wb-role-switcher` + `.wb-rich-header-card` |
| AI 识别建议背景 | 用户批注 1 | `rgba(79, 104, 255, 0.20)` 描边与指定 `96deg` 白色到淡蓝渐变，不使用默认黄色警告底 | `--wb-ai-insight-border` + `--wb-ai-insight-surface` + `.wb-aipaas-diagnosis` |
| 目录导航与局部布局 | 用户批注 1-7（2026-09-11）及通栏/行业理由批注（2026-09-11） | 复合卡片位于 AI Agent 下方；删除组件示例入口；介绍页不重复指标分组；指标页只保留该分组；指标卡和复合分析卡通栏；行业配色建议六行三列，色名带色块和推荐理由；文本标题可见图标；AI Agent 桌面示例内边距和间距 20px（移动示例为 12px） | `.wb-library-sidebar-group`、`.wb-library-item.is-wide`、`.wb-palette-chip`、`.wb-aipaas-industry-recommend`、`.wb-icon`、`.wb-aipaas-agent-card` |

## AI Agent 移动变体边界

- 仅把来源截图的输入条落实为第二、第三示例的 `.wb-agent-composer.is-mobile`，不改变原卡片与桌面示例 01；160px 高度及智能体/模型工具栏继续限定为桌面合同。
- 移动间距与字号只在 `.wb-aipaas-agent-mobile-preview` 作用域生效：卡片内边距 12px、头像容器与实际图片均为 32px × 32px（描边不占尺寸）、图片右缘到欢迎语左缘为 12px 且头像相对欢迎语文本块垂直居中、欢迎语与输入条间距 12px、欢迎语 18px/26px 字重 400；桌面示例 01 保持 43px 头像、24px/34px 欢迎语与 20px 节奏。
- 第三示例 03「仅移动端对话框」只保留 `form.wb-agent-composer.is-mobile`，外层为 `.wb-aipaas-preview.wb-aipaas-agent-mobile-input-only`（宽度 100%、最大 390px），DOM 中没有卡片、头像和欢迎语；`ai-entry -> ai-composer` 语义、双语 `aria-label` 与 `data-aipaas-agent-form` 直接挂在表单上。
- 尺寸、颜色、轻阴影与焦点由共享 `tokens.css` / `components.css` 负责；输入轨道可收缩，长内容只在输入内滚动，深色由 `data-theme="dark"` 自动激活共享 Token。
- 保留 `ai-entry -> ai-composer`、双语 ARIA、稳定消息字段元数据及键盘焦点；空值或纯空白禁用发送，非空启用；文本输入与 Enter 原生提交，IME 组合期间不提交。
- 声波、麦克风和附件仅显示既有未接入服务演示 toast，不请求麦克风权限、不录音、不伪造结果或发送成功；移动端不带桌面模型选择器、建议问题区或虚构手机键盘。
- 上一版本 `ai-workbench-ux@1.6.18` 验证记录（24px 头像，不代表本次 32px 变更通过）：完整目录回归通过，包含移动 Agent 的 144 个视口/语言/明暗/风格/配色状态与 1152 个 AIPaaS 页面状态；输入空白、非空、长文本、Enter/IME、44px 触达、双语字段与三个工具按钮演示反馈均通过。新增断言覆盖移动卡片内边距 12px、头像 24px、欢迎区间距 12px 与居中对齐、输入框上边距 12px，以及第三示例的零卡片/头像/`<h2>` 节点、表单上的 `ai-entry`/`ai-composer` 语义、56px 高度、20px 圆角、无溢出、四个按钮均 ≥44px、消息字段键、空白禁用发送与启用后提交产生演示 toast。另经 HTTP 浏览器检查三档明暗视口与 320px 边界，桌面示例原有断言不变；截图及报告见 `qa/catalog-agent-mobile-20260921-v1.6.18/`。
- `ai-workbench-ux@1.6.19` 完整目录回归通过：移动 Agent 的 144 个状态验证实际头像 32px × 32px、图片到文字间距 12px 和垂直居中，桌面示例 01 与无头像示例 03 不变。HTTP 浏览器另测三档视口、中英文和明暗主题共 12 个状态，输入交互及长文本无溢出、控制台无错误；截图已检查，报告见 `qa/catalog-agent-avatar-32-20260921-v1.6.19/`。
- `ai-workbench-ux@1.6.24` 完整目录回归通过：144 个目录状态、144 个复合卡片状态、144 个主题配置状态和 1152 个 AIPaaS 页面状态无溢出或控制台错误。AI 经营结论卡在 1440×900 与 1024×768 中将生成元信息和三个后续操作置于同一底部行并垂直居中，在 390×844 中安全分行；三档浅色及三档暗色英文截图均已人工检查。报告见 `qa/catalog-ai-generation-row-20260921-v1.6.24/`。

## 数据边界

- 来源中可辨识的业务值按原样保留；截图中无法可靠辨识的诊断句不补写为事实。
- 所有示例动作仅展示组件反馈，不改写 CRM 数据；实体值继续使用可聚焦入口。
- 对象列表在窄屏保留全部列，通过表格容器横向滚动，不删除字段。

- 1.6.32（2026-10-19，覆盖旧布局/文案）：AI待协助标题栏左侧保留标题，右侧使用32px高的共享透明分段筛选，当前筛选数量胶囊紧跟“全部”右侧；实际容器过窄时允许筛选组右对齐换行且不溢出。单一动作统一为“去处理 / Handle”，使用共享强调色实底主按钮与 --wb-on-accent 前景。Agent行只显示名称的浅色中性标签，不显示“触发 Agent”前缀或协助类型；协助类型仍保留字段元数据。删除行内待处理/已处理状态胶囊，待处理标题前使用共享橙色圆点，已处理无圆点；记录状态和双语可访问名称仍保留，筛选不得改变处理状态。

- 1.6.33（2026-10-19，覆盖旧数量与分隔线规则）：AI待协助的每个筛选按钮在标签文字右侧内联显示该状态的记录数：待处理/已处理按各自状态计数，全部显示全部记录数，不随当前选项改写其他选项的数量。数字继承同一按钮的文字颜色并加粗，不使用独立胶囊；为0时隐藏数字且不占布局，仍保留稳定字段值。标签和数字分为独立子节点，语言切换不得清空数量。每个可见通知条目与共享信息列表一致使用1px --wb-info-list-divider底部分隔线，禁止使用浅色白色--wb-border-soft造成线条不可见；筛选后首尾条目保持相同分隔契约。 数量字段分别为pending-count / processed-count / all-count。

- 1.6.34（2026-10-19，覆盖旧筛选与已处理示例）：AI待协助只承载未处理通知，删除全部筛选按钮/筛选组/类别文字与已处理记录DOM，不以隐藏面板保留已处理示例。标题右侧仅保留一个未处理数量，字段为pending-count，使用共享信息列表数字样式且不带胶囊，0时隐藏。数量从未处理记录派生，空队列显示“暂无需要你处理的AI通知”双语说明；保留待处理橙点、来源对话、Agent名称标签、去处理按钮及共享行底部分隔线。状态变更为已处理后从该卡片移除，不模拟业务处理成功。

- 1.6.35（2026-10-19）：信息列表页追加第05例空数据状态，页面计数为2个组件、5个示例。复用 .wb-info-list-card 标题和 .wb-empty.wb-info-list-empty，使用40px无底板、无阴影的线框收件托盘SVG和“暂无数据 / No data yet”；不显示0数量、记录行或无效操作入口。保留record-count=0字段与role=status，图示aria-hidden，尺寸/间距/颜色来自共享Token，支持双语、六色系、浅深色及容器响应式。原01–04示例与业务数据不变。

- 1.6.36（2026-10-19）：对象入口目录移除所有示例标题栏的“打开 CRM / Open CRM”按钮；左右完整与左右精简入口按工作台 CRM 快捷入口使用容器自适应等宽网格、64px 高、16px 间距、16px 圆角、语义浅色背景、无描边和共享卡片投影，图标保留身份色背景与同色投影。三种样式、独立移动展示、原文案、36/13/3/2/2 数值、字段与显式路由保持；简约与深色继续读取共享 Token，不添加第二层模糊。

- 1.6.37（2026-10-19，覆盖1.6.36的入口图标投影规则）：对象入口的行内语义图标统一使用身份色前景与10%身份色混合共享 Surface 的单色底，不使用渐变、描边或投影；适用于横向完整、横向精简、纵向精简和移动展示的全部入口，在 hover/focus、丰富/简约与浅深色下均无图标投影。卡片自身背景、投影、64px横向高度、16px间距/圆角、容器列宽及原数据/路由保持。前端尺寸与交互规则维护于 cards/aipaas-foundations/OBJECT_ENTRY_FRONTEND_RULES.md。

- 1.6.38（2026-10-19）：两个横向对象入口的响应式网格上限从3列改为5列，期望最小列宽220px、间距16px不变；实际内容宽度达到456/692/928/1164px时依次使用2/3/4/5列。对象入口目录视图允许共享外框扩展至1600px，使宽屏能够实际显示五列；其他目录视图宽度不变。保持64px高度、纯色无投影图标、卡片背景/描边/投影、业务数据与路由，更新前端规则报告及回归。
