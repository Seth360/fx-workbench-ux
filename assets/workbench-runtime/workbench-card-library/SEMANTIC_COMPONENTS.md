# 工作台语义组件合同

版本：`ai-workbench-ux@1.5.8`

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
| `global-search` | `search-field` | `.wb-search-field`；`input[type="search"]` 提供 `aria-label`、`data-wb-field-key="query"` 和 `data-wb-field-type="query"` |
| `list-search` | `search-field` | 与全局搜索同一组件，搜索范围和原事件保持当前列表语义 |
| `stage-progressor` | `stage-progressor` | `.wb-stage-progressor`；每个 `.wb-stage-step` 保留顺序、阶段、数量、金额/口径和下钻；窄屏仅轨道内部横向滚动 |
| `kpi-card` | `metric-card` | `.wb-card.wb-compact-baseline-card` + `.wb-summary-metric-grid.wb-metric-grid`；每个 `.wb-metric` 有字段元数据、语义 SVG 和原始单位 |
| `business-list` | `business-list` | `.wb-card` + `.wb-business-list`；列表项保留实体、状态、负责人、时间、动作和字段元数据；可表格化时优先使用下述 data-table |
| `business-table` | `data-table` | `.wb-table-wrap > table.wb-table`；完整表头/列、字段元数据、内部横向滚动、共享状态标签及深色 Table Surface |

人员/部门选择器按业务范围使用 `people-scope`；地区、商机类型等一般枚举使用 `enum-filter`。日期快捷范围使用 `date-range`，统计口径切换使用 `reporting-period`，两者不得混用。

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

`index.html` 的目录结构是文档导航，不属于业务 `global-search`、业务 KPI 或画布工作区。分类与搜索仅作用于模板可见性，稳定 `data-wb-card-key` 保留为模板锚点。九个来源示例按基础框架、指标与分析、业务协同分组，十二种语义映射不变。

每个 `.wb-library-item` 按“模板名 → `.wb-library-preview` 真实共享组件 → `.wb-library-contract` 折叠语义说明”组织。映射、字段数量和复制结构从预览 DOM 获取；文档外框不写入复制片段。复制后需保持 tokens/components 及对应 select/chart 运行时引用。

横向滚动的范围筛选保留 native select 的值/change；需要逃离裁切时菜单临时进入共享 portal，关闭后恢复到语义根中。临时挂载期间通过触发器的 `aria-controls` 继续关联原 listbox id，键盘和语言切换仍使用同一组选项对象。
