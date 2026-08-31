# AI工作台UX规范

主题 ID：`ai-workbench-ux`  
版本：`1.4.28`  
基准页面：`../fxiaoke-workbench-canvas.html` 的“模板库”与“公司经营”页签。

本目录是工作台新卡片的唯一设计与交付位置。任何人或 AI 工具新增、改造卡片前，必须完整阅读 [CARD_SPEC.md](./CARD_SPEC.md)，复用 [tokens.css](./tokens.css) 和 [components.css](./components.css)，并把最终卡片文件放入 `cards/`。禁止在项目其他目录散落新的卡片实现。

## 使用流程

1. 阅读 `CARD_SPEC.md`，确认卡片类型、业务数据和交互。
2. 从 `templates/card-template.html` 复制结构，不从空白页面重新设计。
3. 只使用 `tokens.css` 中的颜色、间距、圆角、字体和玻璃效果令牌。
4. 在 `cards/<业务英文短名>/` 中保存 HTML、CSS、JS 和必要资产。
5. 在桌面 `1440x900`、窄桌面 `1024x768`、移动端 `390x844` 检查文本、溢出、等高和交互。
6. 在 `index.html` 添加卡片入口或示例，便于视觉回归。
7. 每次收到新的 UI 修正意见，都必须同步更新 `CARD_SPEC.md`、公共 Token/组件、`AI_PROMPT.md`、目录示例和 `CHANGELOG.md`，不能只修实施页面。

顶部工作台导航使用 `.wb-workspace-tab-bar > .wb-workspace-tab-list`。页签列表的 Surface 仅包裹内容，不扩张为通栏；末端工具独立靠右，窄屏由页签列表自身横向滚动。

页面级页头使用 `.wb-header > .wb-title-group` 的单列结构，标题在上、说明在下；34px 图标列只用于卡片标题，禁止页面标题因误入图标列而逐字竖排。

组合卡使用 `.wb-subpanel` 和 `.wb-inner-tile` 建立无二次模糊的内部层级；宽表操作列使用完全不透明的 `.wb-action-column` Surface 与 32px `.wb-primary-action`，避免横向滚动时业务文字透出。

相邻权威记录已呈现同一身份时，后续摘要使用 `.wb-summary-metric-grid` 直接承载不重复的指标；上游/下游关系使用 `.wb-relation-flow` 与 `.wb-relation-branch` 纵向连接。关系方向清楚时可移除冗余可见层级标签，但须保留双语 `aria-label`；三分支使用 `.is-three-way` 让横线连接全部三条竖线。成对分析卡在容器足够宽时使用共享 6/12 + 6/12 或 5/12 + 7/12 跨度，只有内容宽度不足时才降为单列。

同一页头的多个紧凑文字命令使用 `.wb-compact-action-group` 横向排列，并为每个按钮增加 `.wb-compact-action`，统一保持 32px 高度。

经营基本盘、当前阶段等紧凑四指标摘要使用 `.wb-compact-baseline-card`，以共享标题/元信息结构和指标网格减少内边距，不再维护页面私有的大留白摘要样式。

画布默认使用“丰富”风格；“简约”通过 `data-wb-style="minimal"` 切换普通主卡片以及标题、指标、快捷入口图标职责 Token；明确设计为深色的重点卡使用 `.wb-special-dark-card` 保留深色 Surface。设置滑杆使用 `.wb-range` 的强调色进度轨道，保存操作必须把状态固化到 HTML，而不只依赖浏览器本地存储；页头周期与枚举筛选放入 `.wb-page-control-group` 横向排列，使用带 32px 回退值的共享高度 Token，另存后不得改变高度。

单独分发画布时运行 `node workbench-card-library/scripts/build_standalone_canvas.mjs <input-html> <output-html>`，把共享 CSS、卡片渲染器和交互脚本内联到一个 HTML；随后运行 `node workbench-card-library/scripts/verify_standalone_canvas.mjs <output-html>`，确认文件复制到孤立目录后仍无外部资源依赖，且保存源码捕获包含全部共享运行时。

## 目录约定

```text
workbench-card-library/
  README.md                 使用入口与目录政策
  CARD_SPEC.md              强制设计与实现规范
  AI_PROMPT.md              可交给其他 AI 工具的提示词
  CHANGELOG.md              规范版本与防回归记录
  tokens.css                唯一设计令牌源
  components.css            标准组件样式
  select-interactions.js    共享枚举下拉弹层与键盘交互
  workspace-routing.js      工作台卡片跨页签路由契约
  scripts/                  单文件画布打包、孤立复制与路由回归脚本
  index.html                可视化组件目录
  templates/
    card-template.html      新卡片起始模板
  cards/
    README.md               卡片命名与交付清单
    <card-name>/             每张新卡片的独立目录
```

业务数据、文案和交互属于产品事实，不能为了适配样式而删改或编造。设计系统负责表现，不负责重写数据结构。

## 规范维护

本目录是持续维护的唯一规范源。所有视觉反馈先提炼成可复用规则，再修正 Token、组件和示例；新规则必须记录版本、问题、解决方式、影响范围与验证结果。若实例实现和规范冲突，以最新 `CARD_SPEC.md` 与 `CHANGELOG.md` 为准，并补齐缺失的回归规则。
