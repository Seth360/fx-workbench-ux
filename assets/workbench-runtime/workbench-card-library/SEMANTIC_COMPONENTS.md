# 工作台语义组件合同

版本：`ai-workbench-ux@1.6.38`

本文件定义业务含义与共享 UI 组件之间的稳定映射。生成器先识别业务语义，再复用指定组件；不得根据页面私有类名、文案片段或截图近似重画。

## 0. 页面层级语义

- `wb-header.wb-rich-header-card` 是一级工作区页面的页面级语义结构，负责工作台标题、周期/枚举控制和角色形象。
- 客户/商机洞察详情页、列表页及其他下钻二级页面使用 `.wb-secondary-page`，不渲染页面级 `wb-header`；首个可见区可以是记录卡、首个业务指标卡或列表卡。
- `.wb-secondary-page > .wb-header` 由共享组件默认隐藏，作为防回归约束；该规则不隐藏详情内的 `.wb-flush-head` 或其他卡片标题，也不移除记录操作、面包屑、字段和业务事实。

## 1. 通用属性

每个命中的语义组件根节点必须同时提供：

- `data-wb-semantic`：稳定业务语义，不随中文/英文文案改变。
- `data-wb-component`：本规范指定的共享 UI 组件。
- `aria-label` 或 `aria-labelledby`：可访问名称，随语言切换。
- 组件规定的字段级元数据。字段键使用当前业务对象内稳定的 kebab-case 名称，不使用展示文案作为键。

字段节点使用下列属性：

- `data-wb-field-key`：稳定字段键。
- `data-wb-field-label`：当前语言的字段名称。
- `data-wb-field-type`：`entity`、`text`、`enum`、`person`、`number`、`amount`、`rate`、`date`、`datetime`、`duration`、`status`、`action` 或 `query`。
- `data-wb-unit`：字段有单位时必填；没有单位时省略。
- `data-wb-value`：静态样例中填写未格式化业务值；运行时数据可由渲染器同步更新。

表格字段以 `th[scope="col"]` 为权威定义。每个表头必须有稳定 `id` 和上述前三个字段属性；数据单元格用 `headers` 指向对应表头，并至少提供 `data-wb-field-key`。实体值仍使用 `.wb-entity-link`，状态值仍使用 `.wb-status-tag`。

## 2. 强制映射

| 业务语义 `data-wb-semantic` | 组件 `data-wb-component` | 共享结构与硬性规则 |
| --- | --- | --- |
| `reporting-period` | `segmented-control` | `.wb-segmented.wb-page-period`；根节点 `role="group"`；按钮使用 `aria-pressed`，激活态始终读取当前 `--wb-accent` |
| `people-scope` | `composite-select` | `.wb-select.wb-page-filter`；保留 `[data-wb-select-native]`，触发器/列表框由 `select-interactions.js` 管理；禁止显示系统原生下拉面板 |
| `date-range` | `composite-select` | 与人员范围同一复合下拉合同；选项与原值/change 事件不变；自由日期区间才使用产品已有日期面板，不得退化为两个无样式 input |
| `enum-filter` | `composite-select` | `.wb-select.wb-page-filter`；适用于地区、商机类型、部门等枚举 |
| `ai-entry` | `ai-composer` | `.wb-card.wb-ai-entry` + `.wb-ai-composer`；保留输入、模式、附件和提交事件；深色模式读取共享 Surface |
| `ai-summary` | `ai-brief` | `.wb-card.wb-ai-summary`；结论、事实计数、依据说明和动作入口不得丢失或伪造 |
| `ai-brief` | `ai-brief-card` | `.wb-aipaas-insight-brief`；先展示经营结论与来源边界，再展示事实计数和后续动作；不显示辅助归纳 kicker，使用 `.wb-ai-generation-row` 在宽容器中把左侧 `.wb-ai-generation-meta > time[data-wb-field-key="generated-at"]` 与右侧操作组置于同一底部行并垂直居中，窄容器安全分行；时间显示 `yyyy-mm-dd HH:MM`，使用 `--color-neutrals11`、12px/18px、400，重新生成按钮只显示 16px 图形且无底板 |
| `ai-diagnosis` | `recognition-card-grid` | `.wb-aipaas-recognition-grid`；每个识别器保留对象类型、识别范围、置信度、结论摘要和事件数量；卡片标题栏右侧使用与结论卡完全相同的 `.wb-ai-generation-meta > time[data-wb-field-key="generated-at"]` 和无底板 16px 重新生成图形替换总事件胶囊；结论摘要 `.wb-aipaas-diagnosis` 读取共享 `--wb-ai-insight-border` 的 `1px solid rgba(79, 104, 255, 0.20)` 和 `--wb-ai-insight-surface` 的 `96deg` 白色到淡蓝渐变 |
| `object-entry-list` | `quick-entry-grid` | `.wb-object-entry-grid > .wb-object-entry-card`；只允许 `horizontal/full`、`horizontal/name-only`、`vertical/name-only` 三种目录变体，`vertical/full` 不展示。完整型保留对象名称、场景名称、数值、字段元数据和显式下钻；名称型只显示语义 SVG 与对象名称并保留显式下钻。横向卡固定 64px；纵向名称型读取共享最小高度，宽容器一行五个，窄容器按容器宽度安全降列。额外的 390px 文档展示中，`full` 保持单列五项；`compact` 使用同一 `vertical/name-only` 结构与 `.is-bare` 视觉职责，固定一行五项、网格 gap 为 0，图标在上、名称在下，入口无背景/描边/阴影，但图标保留完整模式的身份色与 34px 浅色容器。精简 DOM 只能含语义 SVG 和对象名称，同时保留原生按钮、ARIA、显式下钻、至少 44px 点击高度和焦点状态 |
| `ai-assistance` | `ai-assistance-list` | `.wb-card.wb-ai-assistance-card` 仅渲染pending记录；事项、来源对话、Agent、协助类型、状态字段为 `required-action` / `conversation-title` / `agent-name` / `request-type` / `status`。保留根ARIA、稳定卡片/记录键与字段元数据。无筛选组或类别文字，无已处理记录DOM；标题右侧仅有共享信息列表样式的 `pending-count` 数字，0时隐藏。空队列显示暂无需要处理的AI通知；去处理只反馈未接服务，不执行授权/批复。 |
| `information-list` | `information-list-card` | AIPaaS 目录在三个连续编号示例中分别渲染 `.wb-card.wb-info-list-card`，结构统一为标题、可选来源总数、三条来源记录和底部“查看全部”；不用页签或隐藏面板。待办/提醒总数保留 6/5，关注未给总数时不生成数量节点。条目标题、时间或对象类型、说明保留原单位和稳定字段元数据；右侧元信息使用共享 `.wb-status-tag`，今天为 `.is-attention`、明确风险为 `.is-risk`、普通日期与类型为 `.is-neutral`。未接业务服务的动作只显示目录既有演示反馈。 |
| `global-search` | `search-field` | `.wb-search-field`；`input[type="search"]` 提供 `aria-label`、`data-wb-field-key="query"` 和 `data-wb-field-type="query"` |
| `list-search` | `search-field` | 与全局搜索同一组件，搜索范围和原事件保持当前列表语义 |
| `stage-progressor` | `stage-progressor` | `.wb-stage-progressor`；每个 `.wb-stage-step` 保留顺序、阶段、数量、金额/口径和下钻；窄屏仅轨道内部横向滚动 |
| `kpi-card` | `metric-card` | `.wb-card.wb-compact-baseline-card` + `.wb-summary-metric-grid.wb-metric-grid`；每个 `.wb-metric` 有字段元数据、语义 SVG 和原始单位 |
| `business-list` | `business-list` | `.wb-card` + `.wb-business-list`；列表项保留实体、状态、负责人、时间、动作和字段元数据；可表格化时优先使用下述 data-table |
| `business-table` | `data-table` | `.wb-table-wrap > table.wb-table`；完整表头/列、字段元数据、内部横向滚动、共享状态标签及深色 Table Surface |

AIPaaS 的 `ai-entry -> ai-composer` 桌面示例使用 `.wb-aipaas-agent-card > .wb-aipaas-agent-composer.wb-agent-composer` 外观变体，保留输入、智能体与模型选择、附件、语音和提交按钮；头像使用真实 `fx-avatar.png`，欢迎语使用 `24px/34px`、字重 `400`。桌面输入框使用共享浅灰蓝 Surface、160px 最小高度和当前主题强调色焦点描边；空值禁用发送，非空值启用发送，不改变原生表单提交契约；不渲染建议问题区。160px 双层输入框与智能体/模型工具栏只属于桌面，原桌面示例保持不变。

`index.html#aipaas-agent` 的第二个独立示例为移动变体，仍绑定 `data-wb-semantic="ai-entry"` / `data-wb-component="ai-composer"`，只把对话框替换为 `.wb-agent-composer.is-mobile`，不新增语义类型或重绘原卡片。来源仅为用户提供的 ShareClaw Figma `2836:10765` 移动输入条截图（新截图浏览器 URL 节点 `1596:19284`）。保留 `fx-avatar.png`；`.wb-aipaas-agent-mobile-preview` 作用域内欢迎语为 `18px/26px`、字重 `400`，头像容器与实际图片均为 32px × 32px（描边不占尺寸）并与欢迎语文本块垂直居中，图片右缘到欢迎语左缘为 12px，卡片内边距和输入框上边距各 12px。桌面示例 01 的 43px 头像、`24px/34px` 欢迎语与各 20px 间距不受影响。

- 移动预览最大宽度 390px；单行输入条 `min-height:56px`、`padding:5px 4px`、圆角 20px，顺序为声波按钮、提示“发消息或按住说话”的文本输入、麦克风、附件加号、浅紫圆形发送。四个按钮触达至少 44px，发送圆图形为 32px；输入轨道可收缩，长内容仅在输入内滚动。
- 尺寸、颜色、轻阴影和焦点使用共享 Token/组件职责；浅色白底读取 `--wb-surface-strong`，`data-theme="dark"` 自动激活共享暗色 Token，不硬编码深色白底。
- 语义根与输入、图标按钮保留双语可访问名称及键盘焦点；消息字段保留稳定 `data-wb-field-key`、随语言更新的 `data-wb-field-label` 与 `data-wb-field-type`，不能仅用 placeholder 代替标签。
- 空值或纯空白禁用发送，非空启用；文本输入与 Enter 沿用原生表单提交，IME 组合期间不提交。声波、麦克风和附件只显示既有未接入服务演示 toast，不请求麦克风权限、不录音、不伪造结果或发送成功。
- 移动变体不渲染桌面智能体/模型选择器、建议问题区或虚构手机键盘；不以移动规则覆盖桌面 160px 输入区及工具栏。

人员/部门选择器按业务范围使用 `people-scope`；地区、商机类型等一般枚举使用 `enum-filter`。日期快捷范围使用 `date-range`，统计口径切换使用 `reporting-period`，两者不得混用。

M3E 的“列表 / List”使用同一 `business-table -> data-table` 合同和共享 `.wb-aipaas-table-card`，不替换为 M3 普通列表项。经营对比保留行业大区/销售人员七列、客户级别六列和各自字段元数据；金额为 `amount`、比例为 `rate`。维度 tabs 使用稳定键、关联 tabpanel、漫游焦点与键盘切换；不可见面板使用 `aria-hidden` 和 `inert`，共同参与自然高度测量，预览切换不修改保存的默认维度。

## 3. 主题与覆盖

- 语义组件只读取共享 Token。页面私有 CSS 不得覆盖其选中态、Surface、Border、Shadow、圆角、控件高度或表格行背景。
- 浅色丰富模式使用弱色画布与共享玻璃顶层卡；内部指标和表格读取各自实底/表格职责 Token。
- 深色模式必须由组件根的 `data-theme="dark"` 触发共享暗色 Token；不得只添加私有 `.is-dark` 后继续保留白色、浅灰半透明卡片或白色 inset 高光。
- 主题色只控制选中态和主要动作。成功、警告、危险、状态标签和数据系列继续读取各自语义色。

## 4. 生成与验证

生成前在来源覆盖清单中记录命中的语义键。生成后：

1. 检查每个语义根节点同时存在 `data-wb-semantic`、`data-wb-component` 和可访问名称。
2. 检查映射使用本文件指定类名和子结构，不接受页面私有近似实现。
3. 检查 KPI、阶段和表格的字段级元数据完整，值、单位、顺序、筛选和事件与来源一致。
4. 在六套色系、浅色/深色、中文/英文及三档视口验证计算样式；页面不得产生非预期横向滚动。
5. 运行 Skill 的 `scripts/verify_canvas_runtime.mjs` 和共享 `scripts/verify_standalone_canvas.mjs`。

## 5. 语义模板目录展示

`index.html` 的目录结构是文档导航，不属于业务 `global-search`、业务 KPI 或画布工作区。分类与搜索仅作用于模板可见性，稳定 `data-wb-card-key` 保留为模板锚点。原有模板按基础框架、指标与分析、业务协同分组；“业务协同”只从侧栏筛选中移除，不删除分组内容。AIPaaS 组件基础组件是独立的文档页导航，不计入目录模板的筛选结果；新增信息列表卡片使用本文件的 `information-list -> information-list-card` 映射。

每个 `.wb-library-item` 按“模板名 → `.wb-library-preview` 真实共享组件 → `.wb-library-contract` 折叠语义说明”组织。映射、字段数量和复制结构从预览 DOM 获取；文档外框不写入复制片段。复制后需保持 tokens/components 及对应 select/chart 运行时引用。

横向滚动的范围筛选保留 native select 的值/change；需要逃离裁切时菜单临时进入共享 portal，关闭后恢复到语义根中。临时挂载期间通过触发器的 `aria-controls` 继续关联原 listbox id，键盘和语言切换仍使用同一组选项对象。

AIPaaS 页使用 `data-aipaas-page` 定义稳定页边界，导航使用 `data-aipaas-target` 一一对应，共九个页面。主题色配置不属于 AIPaaS，使用 `data-theme-config-link` 与 `data-theme-config-view` 定义独立目录页；其 `section[data-library-catalog-view]` 与主题视图均为语义化平级视图，不使用无职责 `div` 包装。行业工作台示例使用普通外链打开指定 HTML，不注册业务语义。这些文档字段不冒充业务语义；当预览中真实出现统计周期或枚举筛选时，仍必须使用本合同的 `reporting-period → segmented-control` 与 `enum-filter → composite-select` 映射，包含 ARIA、稳定字段元数据和原生值/change 契约。

Rich Header 目录预览的 `.wb-role-switcher` 是文档演示控件，不冒充业务筛选语义。它必须以八个 `role="tab"` 复用真实角色 PNG 和既有七套渐变映射，保留唯一 `aria-selected="true"`、漫游 Tab 焦点与键盘切换。

1.6.32：AI待协助标题栏左侧保留标题，右侧使用32px高的共享透明分段筛选，当前筛选数量胶囊紧跟“全部”右侧；实际容器过窄时允许筛选组右对齐换行且不溢出。单一动作统一为“去处理 / Handle”，使用共享强调色实底主按钮与 --wb-on-accent 前景。Agent行只显示名称的浅色中性标签，不显示“触发 Agent”前缀或协助类型；协助类型仍保留字段元数据。删除行内待处理/已处理状态胶囊，待处理标题前使用共享橙色圆点，已处理无圆点；记录状态和双语可访问名称仍保留，筛选不得改变处理状态。 状态字段落在记录 li，request-type字段隐藏保留，根语义映射不变。

- 1.6.33（2026-10-19，覆盖旧数量与分隔线规则）：AI待协助的每个筛选按钮在标签文字右侧内联显示该状态的记录数：待处理/已处理按各自状态计数，全部显示全部记录数，不随当前选项改写其他选项的数量。数字继承同一按钮的文字颜色并加粗，不使用独立胶囊；为0时隐藏数字且不占布局，仍保留稳定字段值。标签和数字分为独立子节点，语言切换不得清空数量。每个可见通知条目与共享信息列表一致使用1px --wb-info-list-divider底部分隔线，禁止使用浅色白色--wb-border-soft造成线条不可见；筛选后首尾条目保持相同分隔契约。 数量字段分别为pending-count / processed-count / all-count。

- 1.6.34（2026-10-19，覆盖旧筛选与已处理示例）：AI待协助只承载未处理通知，删除全部筛选按钮/筛选组/类别文字与已处理记录DOM，不以隐藏面板保留已处理示例。标题右侧仅保留一个未处理数量，字段为pending-count，使用共享信息列表数字样式且不带胶囊，0时隐藏。数量从未处理记录派生，空队列显示“暂无需要你处理的AI通知”双语说明；保留待处理橙点、来源对话、Agent名称标签、去处理按钮及共享行底部分隔线。状态变更为已处理后从该卡片移除，不模拟业务处理成功。

- 1.6.35（2026-10-19）：信息列表页追加第05例空数据状态，页面计数为2个组件、5个示例。复用 .wb-info-list-card 标题和 .wb-empty.wb-info-list-empty，使用40px无底板、无阴影的线框收件托盘SVG和“暂无数据 / No data yet”；不显示0数量、记录行或无效操作入口。保留record-count=0字段与role=status，图示aria-hidden，尺寸/间距/颜色来自共享Token，支持双语、六色系、浅深色及容器响应式。原01–04示例与业务数据不变。

- 1.6.36（2026-10-19）：对象入口目录移除所有示例标题栏的“打开 CRM / Open CRM”按钮；左右完整与左右精简入口按工作台 CRM 快捷入口使用容器自适应等宽网格、64px 高、16px 间距、16px 圆角、语义浅色背景、无描边和共享卡片投影，图标保留身份色背景与同色投影。三种样式、独立移动展示、原文案、36/13/3/2/2 数值、字段与显式路由保持；简约与深色继续读取共享 Token，不添加第二层模糊。

- 1.6.37（2026-10-19，覆盖1.6.36的入口图标投影规则）：对象入口的行内语义图标统一使用身份色前景与10%身份色混合共享 Surface 的单色底，不使用渐变、描边或投影；适用于横向完整、横向精简、纵向精简和移动展示的全部入口，在 hover/focus、丰富/简约与浅深色下均无图标投影。卡片自身背景、投影、64px横向高度、16px间距/圆角、容器列宽及原数据/路由保持。前端尺寸与交互规则维护于 cards/aipaas-foundations/OBJECT_ENTRY_FRONTEND_RULES.md。

- 1.6.38（2026-10-19）：两个横向对象入口的响应式网格上限从3列改为5列，期望最小列宽220px、间距16px不变；实际内容宽度达到456/692/928/1164px时依次使用2/3/4/5列。对象入口目录视图允许共享外框扩展至1600px，使宽屏能够实际显示五列；其他目录视图宽度不变。保持64px高度、纯色无投影图标、卡片背景/描边/投影、业务数据与路由，更新前端规则报告及回归。
