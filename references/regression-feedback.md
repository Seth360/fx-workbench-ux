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
- 设置抽屉不得重复渲染顶层工作区页签；设置打开时仍只通过顶栏 `.wb-workspace-tab-list` 切页，编辑态的未选 `[data-canvas-panel][hidden]` 不得被 `[data-edit-grid]` 强制显示，隐藏计数和还原仅作用于当前顶栏选中页；
- 图标容器由语义 SVG/图标库构成，不包含 `DX`、`人`、`日`、`AI`、`⌕` 等可见字符替代图形；
- 页头枚举筛选使用 `.wb-select.wb-page-filter` 和 `.wb-page-control-group`，保留原生值/change 与键盘行为；
- 页头复合下拉打开时，菜单不得被 32px 横向控制组裁切；Rich Header 人物可见头部在桌面端高出卡片 36px，角色切换同步更新服装色渐变；
- 规范目录的 Rich Header 使用八个 `.wb-role-switcher` Tab，点击与键盘切换同步替换真实 PNG、渐变、校准尺寸与 ARIA 选中态；AIPaaS AI Agent 头像为 `fx-avatar.png`，欢迎语计算字号为 18px；
- 规范目录的模板导航为“介绍 / 主题色配置 / 指标与分析”；介绍页不重复指标分组，指标卡与复合分析卡均使用通栏目录项；主题色配置位于 AIPaaS 之外，行业配色建议使用六行“行业 / 推荐配色 / 推荐理由”，每个色名带共享 Token 色块；首页以 `_blank`/`noopener` 链接打开两个行业工作台 HTML；模板视图根使用 `section[data-library-catalog-view]`，不得保留无职责 `div` 包装；
- AI 识别诊断卡的建议摘要使用 `rgba(79, 104, 255, 0.20)` 的 1px 描边和共享 `--wb-ai-insight-surface` 的 `linear-gradient(96deg, #FFFFFF 0.58%, #EBF2FF 102.07%)`；不得复用黄色警告背景；
- AIPaaS 对象入口只保留左右完整、左右名称型、上下名称型三种共享变体，必须删除上下完整型；名称型无场景和数字节点，左右卡为 64px，上下名称型在桌面及 1024px 目录视口一行五个，窄容器响应式降列；
- 复合卡片与对象列表卡片的一级标题使用 `.wb-title-group.is-iconless`，不得保留装饰图标或空的 34px 图标列；复合卡片内部子面板仍保留语义 SVG；
- 对象入口在三种正式变体之外提供一个标注为 390px 的移动端适配展示；完整模式保持一列五项，精简模式固定一行五项，每项图标在上、名称在下、gap 为 0，入口和图标无背景、描边、圆角、阴影或身份色，DOM 只含语义图标和对象名称，同时保留原按钮、合法路由、ARIA、至少 44px 点击高度与焦点行为；报价管理入口使用实际可见的文档/剪贴板 SVG；
- 一级工作区保留页面级 `.wb-rich-header-card`；客户/商机洞察详情、列表等二级下钻页必须使用 `.wb-secondary-page`，页面级 `wb-header` 数量为 0，首个可见区为记录、指标或列表卡；
- 周期、人员/部门、日期、AI、全局/列表搜索、枚举、阶段、KPI、业务列表和表格按 `SEMANTIC_COMPONENTS.md` 命中固定共享组件，并同时具备合法 `data-wb-semantic`、`data-wb-component`、ARIA 与字段级元数据；
- 画布根用 `data-color-theme` 保存色系、用 `data-theme="light|dark"` 保存明暗状态；深色模式下卡片、指标、控件、表头、表行和 hover 全部读取共享暗色 Token；
- 除明确设计为内部滚动的表格/轨道外，注册网格的 `scrollWidth` 不大于 `clientWidth`；连接箭头和装饰线没有负偏移到卡片外；页面文字不使用 `clamp(...vw...)` 或负字距；
- 保存后的孤立 HTML 不依赖 `workbench-card-library` 相对资源，仍能显示所有页签并重新加载配置。

## 5. 同步与分享

修改 canonical 工作区后，复制到 Skill 的 `assets/workbench-runtime/`；修改 Skill 入口规则后同步 canonical 工作区的规范文件。提升语义版本，在 `CHANGELOG.md` 写明问题、根因、规则、影响组件和验证结果。重新生成带日期且不覆盖旧包的 ZIP，并把 ZIP、校验摘要和安装路径一起交给使用者。
