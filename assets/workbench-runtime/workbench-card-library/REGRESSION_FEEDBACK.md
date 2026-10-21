# UI 回归反馈回写模板

这份模板用于处理“其他人拿到 Skill 后生成的页面有多个 UI 问题”。附件 HTML、截图和浏览器批注是证据，不是新的规范来源。

## 1. 记录样本

```text
样本文件：/absolute/path/to/generated.html
来源请求/原型：/absolute/path/to/source.html 或截图说明
复现视口：1440x900 / 1024x768 / 390x844
主题状态：浅色/深色，色系，中文/English，设置抽屉开关
问题编号：R-YYYYMMDD-01
```

## 2. 每条问题的最小记录

| 字段 | 内容 |
| --- | --- |
| 现象 | 用户看到的具体错位、缺失、溢出或交互失效 |
| DOM/CSS 证据 | 选择器、属性、计算尺寸、截图或校验器输出 |
| 根因 | 运行时缺失、共享组件被覆盖、页面适配错误或数据缺失 |
| 可泛化规则 | 能约束下一次生成且不依赖单页文案的“必须/禁止”句子 |
| 影响层 | runtime / token-component / card-adapter / data-only |
| 验证 | 要运行的静态命令、浏览器状态和预期结果 |

## 3. 分层决策

- **runtime**：设置抽屉、顶栏、编辑态、拖拽引导、隐藏/还原、保存、资源内联。缺失时从 `assets/workbench-runtime/fxiaoke-workbench-canvas.html` 重新生成；不要在业务页复制一个近似实现。
- **token-component**：图标、页头筛选、卡片密度、表格、图表、主题和响应式规则。同步 `CARD_SPEC.md`、`tokens.css`、`components.css`、模板/目录示例、`AI_PROMPT.md`、`README.md`、`AGENTS.md` 和 `CHANGELOG.md`。
- **card-adapter**：业务结构、字段、文案、单位和单页交互。只修改 `cards/<card-name>/` 或页面适配，并更新来源覆盖清单。
- **data-only**：事实数值或状态变化。不要为了单个样本提升规范版本。

## 4. 交付门禁

```bash
node /absolute/path/to/fx-workbench-ux/scripts/verify_canvas_runtime.mjs /absolute/path/to/generated.html
node /absolute/path/to/workbench-card-library/scripts/verify_standalone_canvas.mjs /absolute/path/to/generated.html
unzip -t /absolute/path/to/fx-workbench-ux-<date>.zip
```

浏览器至少检查 1440x900、1024x768、390x844；设置抽屉打开后仍要验证页签、主题、语言、保存/重开、拖拽、隐藏/还原、无页面级横向溢出。特别确认：

- `#canvasCardHide`、`#canvasHiddenBar`、`#canvasRestoreHidden`、`hiddenCards`、`hiddenCardState` 和 `--wb-edit-guide-*` 同时存在且可操作；
- 图标容器由语义 SVG/图标库构成，不包含 `DX`、`人`、`日`、`AI`、`⌕` 等可见字符替代图形；
- 复合卡片与对象列表卡片的一级标题不含装饰图标且不保留空的 34px 图标列；复合卡片内部子面板仍有语义 SVG；
- 对象入口保持三种正式变体，并另有一个标注为 390px 的移动端适配展示；完整模式保持一列五项，精简模式固定一行五项，每项图标在上、名称在下、gap 为 0，入口和图标无背景、描边、圆角、阴影或身份色，DOM 只含语义图标和对象名称，同时保留原按钮、合法路由、ARIA、至少 44px 点击高度与焦点行为。报价管理入口的文档/剪贴板 SVG 必须实际可见；
- 页头枚举筛选使用 `.wb-select.wb-page-filter` 和 `.wb-page-control-group`，保留原生值/change 与键盘行为；
- 一级工作区保留页面级 `.wb-rich-header-card`；客户/商机洞察详情、列表等二级下钻页必须使用 `.wb-secondary-page`，页面级 `wb-header` 数量为 0，首个可见区为记录、指标或列表卡；
- 命中的周期、人员/部门、日期、AI、搜索、枚举、阶段、KPI、业务列表和表格同时存在合法 `data-wb-semantic`/`data-wb-component`、ARIA 与字段元数据；
- 除明确设计为内部滚动的表格/轨道外，注册网格的 `scrollWidth` 不大于 `clientWidth`；连接箭头和装饰线没有负偏移到卡片外；页面文字不使用 `clamp(...vw...)` 或负字距；
- 保存后的孤立 HTML 不依赖 `workbench-card-library` 相对资源，仍能显示所有页签并重新加载配置。

## 5. 同步与分享

修改 canonical 工作区后，复制到 Skill 的 `assets/workbench-runtime/`；修改 Skill 入口规则后同步 canonical 工作区的规范文件。提升语义版本，在 `CHANGELOG.md` 写明问题、根因、规则、影响组件和验证结果。重新生成带日期且不覆盖旧包的 ZIP，并把 ZIP、校验摘要和安装路径一起交给使用者。

## R-20261019-object-entry

- 现象：目录左右入口与工作台 CRM 快捷入口的宽度、背景、描边、圆角及投影不一致，并有冗余“打开 CRM”。
- 证据：目录 `.wb-aipaas-entry-grid` 在 960px 容器强制两列，`.wb-object-entry-card` 使用 1px 描边、8px 圆角、内层 tile Surface；工作台 `.wb-inner .wb-quick-card` 使用无描边语义浅底、16px 圆角及共享投影。
- 根因：目录与工作台快捷入口的视觉职责分离，目录容器断点过早降列。
- 通用规则：横向对象入口由共享组件按真实容器宽度等分，统一快捷入口表面与同色图标投影；通用 CRM 动作从 DOM 移除，各原入口不变。
- 影响层：token-component / catalog。
- 验证：`WB_PLAYWRIGHT_MODULE=<installed-playwright> node workbench-card-library/scripts/verify_catalog_layout.mjs workbench-card-library/qa/catalog-object-entry-20261019-v1.6.36`，不得设置 WB_SKIP_MATRIX。

## R-20261019-object-entry-flat-icons

- 现象：入口行内图标仍有彩色投影；用户要求纯色图标并输出明确的前端尺寸与交互规则。
- 证据：1.6.36 `.is-horizontal .wb-quick-icon` 增加了 0 6px 16px 同色阴影。
- 根因：图标视觉职责与本轮反馈不符。
- 规则：所有对象入口图标采用纯色底、单色前景、无描边、无投影；卡片自身投影保持。
- 影响层：token-component、规范文档、目录回归。
- 验证：完整目录矩阵；所有入口图标 backgroundImage=none、boxShadow=none、borderTopWidth=0px。

## R-20261019-object-entry-five-columns

- 现象：横向对象入口最多三列，用户要求最多五列并更新报告。
- 根因：共享网格公式固定除以3；目录外框限制实际网格宽度。
- 规则：用共享最大列数Token=5，按实际宽度响应式1–5列，宽屏目录允许1600px外框。
- 影响层：Token、共享网格、目录外框、前端规则报告。
- 验证：完整目录矩阵及1920px宽屏两种横向示例各五列、单行、无溢出断言。
