# AI工作台UX规范

主题 ID：`ai-workbench-ux`  
版本：`1.6.24`
基准页面：`../fxiaoke-workbench-canvas.html` 的“首页”“详情页”和“列表页”工作区；首页/详情页直接承载去重后的来源卡片，不再套来源子页签或额外分组表面。

本目录是工作台新卡片的唯一设计与交付位置。任何人或 AI 工具新增、改造卡片前，必须完整阅读 [CARD_SPEC.md](./CARD_SPEC.md) 与 [SEMANTIC_COMPONENTS.md](./SEMANTIC_COMPONENTS.md)，复用 [tokens.css](./tokens.css) 和 [components.css](./components.css)，并把最终卡片文件放入 `cards/`。禁止在项目其他目录散落新的卡片实现。

## 使用流程

Rich Header 角色可见头部外溢统一为 `36px`，卡片与顶栏保持 `42px` 顶部间距；窄屏筛选组与复合下拉必须位于角色图上层且不得被页头或相邻卡片裁切，简约模式隐藏角色且不增加特殊间距。

1. 阅读 `CARD_SPEC.md` 与 `SEMANTIC_COMPONENTS.md`，确认语义类型、卡片类型、业务数据和交互。
2. 从 `templates/card-template.html` 复制结构，不从空白页面重新设计。
3. 只使用 `tokens.css` 中的颜色、间距、圆角、字体和玻璃效果令牌。
4. 在 `cards/<业务英文短名>/` 中保存 HTML、CSS、JS 和必要资产。
5. 在桌面 `1440x900`、窄桌面 `1024x768`、移动端 `390x844` 检查文本、溢出、等高和交互。
6. 在 `index.html` 添加卡片入口或示例，便于视觉回归。
7. 每次收到新的 UI 修正意见，都必须同步更新 `CARD_SPEC.md`、公共 Token/组件、`AI_PROMPT.md`、目录示例和 `CHANGELOG.md`，不能只修实施页面。

AI 识别诊断卡中的结论摘要统一使用 `--wb-ai-insight-border: rgba(79, 104, 255, 0.20)` 的 `1px solid` 描边和 `--wb-ai-insight-surface: linear-gradient(96deg, #FFFFFF 0.58%, #EBF2FF 102.07%)`；警告橙只用于明确风险状态，不默认作为整块 AI 建议背景。

AIPaaS 的两张 AI 洞察示例统一使用 `.wb-ai-generation-meta` 直接显示 `yyyy-mm-dd HH:MM` 模拟时间和 32px `.wb-ai-regenerate` 重新生成图标按钮，不显示“生成时间”文字标签。时间采用 `--color-neutrals11`、`Source Han Sans CN`、12px/18px、400 字重并关闭连字；结论卡移除辅助归纳 kicker，并用 `.wb-ai-generation-row` 在宽容器中把左侧元信息与右侧三个后续操作垂直居中于同一底部行，窄容器安全分行，识别诊断卡用元信息替换总事件胶囊。按钮保留 32px 命中区但移除背景、边框和阴影，只显示浅色 `#181C25` / 深色共享前景的 16px 双路径刷新图形，并保留双语可访问名称、键盘焦点和未接服务演示反馈。

对象入口复用 `.wb-object-entry-grid > .wb-object-entry-card`，只维护左右完整、左右名称型、上下名称型三种已批准变体；左右入口为 64px，名称型只显示语义 SVG 与对象名称，完整型继续保留场景、数字、字段元数据和显式下钻。上下名称型在宽目录容器中一行五个，窄容器按实际宽度安全降列。

目录额外提供一个不计入变体数量的 390px 移动端适配展示：完整模式保持一列五项并保留全部对象信息与字段元数据；精简模式固定一行五项，每项按图标在上、名称在下排列，网格间距为 0，入口移除背景、描边、圆角和阴影，但图标保留与完整模式相同的分类身份色及 34px 浅色容器。精简 DOM 只渲染语义图标和对象名称，同时保留原按钮、合法路由、ARIA、至少 44px 点击高度与焦点行为。报价管理使用可见的文档/剪贴板 SVG。复合卡片和对象列表卡片的一级标题使用 `.wb-title-group.is-iconless`，不显示装饰图标或空图标列；内部业务子面板继续保留语义图标。

画布设置底部只保留“导出页面 / 重置”。点击“导出页面”时，运行时按照顶部页签为每个工作区分别生成以页签文案命名的自包含 HTML；每份文件只有对应主画板，不包含页签顶栏、配置栏、CRM 导航、其他画板、编辑辅助层或隐藏卡片。实际导出后使用 `node scripts/verify_exported_workspace_pages.mjs <page-1.html> [page-2.html ...]` 验证输出。

当用户对现有 HTML 只说“按照 Skill 美化”“优化页面”“调整风格”或其他宽泛改造要求时，默认执行完整重生成：输入文件用于提取业务事实和交互，输出从 bundled canvas 按规范结构重组为完整 HTML，不在旧 DOM 上叠加覆盖样式。只有明确指定保留现有 DOM、只修某个问题或最小改动时，才走增量编辑。

顶部工作台导航使用 `.wb-workspace-tab-bar > .wb-workspace-tab-list`。页签列表的 Surface 仅包裹内容，不扩张为通栏；末端工具独立靠右，窄屏由页签列表自身横向滚动。

页面级页头使用 `.wb-header > .wb-title-group` 的单列结构，标题在上、说明在下；34px 图标列只用于卡片标题，禁止页面标题因误入图标列而逐字竖排。

本版本补充 Rich Header 回归门禁：角色可见头部外溢为 `36px`，卡片与顶栏间距为 `42px`；窄屏筛选组与复合下拉位于角色图上层且不得被卡片裁切，简约模式不增加特殊间距。

丰富主题下页面页头默认升级为 `.wb-rich-header-card`：标题/说明位于左上、32px 控件位于左下、所选 `role-image` 透明 PNG 位于右侧并底部贴齐；桌面按图片透明头顶留白校准，使可见头部高出卡片 36px。八张资源映射七套服装色浅渐变并随角色同步切换，“用户/销售”共用粉色系，默认 `总监.png` 使用指定蓝色渐变。简约主题恢复紧凑页头且不保留形象占位。设置抽屉在色彩主题下方提供角色形象复合下拉，选择结果与八张图片一并固化到可复制的单文件 HTML。

富页头仅用于一级工作区页面；详情、列表等二级下钻页面使用 `.wb-secondary-page`，不渲染页面级富页头，直接从记录卡、首个业务指标卡或列表首卡开始。

组合卡使用 `.wb-subpanel` 和 `.wb-inner-tile` 建立无二次模糊的内部层级；宽表操作列使用完全不透明的 `.wb-action-column` Surface 与 32px `.wb-primary-action`，避免横向滚动时业务文字透出。

相邻权威记录已呈现同一身份时，后续摘要使用 `.wb-summary-metric-grid` 直接承载不重复的指标；上游/下游关系使用 `.wb-relation-flow` 与 `.wb-relation-branch` 纵向连接。关系方向清楚时可移除冗余可见层级标签，但须保留双语 `aria-label`；三分支使用 `.is-three-way` 让横线连接全部三条竖线。成对分析卡在容器足够宽时使用共享 6/12 + 6/12 或 5/12 + 7/12 跨度，只有内容宽度不足时才降为单列。

同一页头的多个紧凑文字命令使用 `.wb-compact-action-group` 横向排列，并为每个按钮增加 `.wb-compact-action`，统一保持 32px 高度。

列表结果分组使用透明无投影的 `.wb-filter-segmented`，不使用页签式玻璃底板和白字反白；表格状态使用内容宽度的 `.wb-status-tag`，负责人使用 `.wb-person-label > .wb-avatar` 保证亮色 SVG 居中。贴边卡必须让 `.wb-flush-head` 与 `.wb-flush-body` 成为卡片直接子项，正文桌面保留 `16px 20px 20px`、手机保留 `16px` 内边距。

经营基本盘、当前阶段等紧凑四指标摘要使用 `.wb-compact-baseline-card`，以共享标题/元信息结构和指标网格减少内边距，不再维护页面私有的大留白摘要样式。

画布默认使用“丰富”风格；“简约”通过 `data-wb-style="minimal"` 切换普通主卡片以及标题、指标、快捷入口图标职责 Token；明确设计为深色的重点卡使用 `.wb-special-dark-card` 保留深色 Surface。设置滑杆使用 `.wb-range` 的强调色进度轨道，保存操作必须把状态固化到 HTML，而不只依赖浏览器本地存储；页头周期与枚举筛选放入 `.wb-page-control-group` 横向排列，使用带 32px 回退值的共享高度 Token，另存后不得改变高度。

页面切换只使用左侧顶部 `.wb-workspace-tab-list`，设置抽屉不重复渲染首页、详情页和列表页。设置打开后，未选页面仍保持隐藏，顶部页签只会编辑对应页面的卡片；隐藏数量和“还原本页”只作用于当前页。

单独分发画布时运行 `node workbench-card-library/scripts/build_standalone_canvas.mjs <input-html> <output-html>`，把共享 CSS、卡片渲染器和交互脚本内联到一个 HTML；随后运行 `node workbench-card-library/scripts/verify_standalone_canvas.mjs <output-html>`，确认文件复制到孤立目录后仍无外部资源依赖，且保存源码捕获包含全部共享运行时。

### AIPaaS AI Agent 桌面与移动示例

`index.html#aipaas-agent` 保留原卡片和桌面示例，并新增两个独立移动端示例，均只替换对话框为共享 `.wb-agent-composer.is-mobile`。设计证据为用户提供的 ShareClaw Figma `2836:10765` 移动输入条截图（新截图浏览器 URL 节点 `1596:19284`），不移植整页。三个示例都沿用同一套共享输入交互合同。

- 01「欢迎语 + 对话框」（桌面）继续使用共享 `.wb-agent-composer` 的 160px 双层输入框、20px 圆角、18px 16px 12px 内边距、浅灰蓝 Surface 与智能体/模型工具栏；43px 头像与各 20px 的卡片内边距、欢迎区间距、输入框上边距保持不变，160px 与模型工具栏只属于桌面，不能由移动规则覆盖。
- 02「欢迎语 + 移动端对话框」最大宽度 390px，保留 `fx-avatar.png`；间距与字号只在 `.wb-aipaas-agent-mobile-preview` 作用域收紧为卡片内边距 12px、头像容器与实际图片均为 32px × 32px（描边不占尺寸）、图片右缘到欢迎语左缘为 12px（头像相对欢迎语文本块垂直居中）、欢迎语与输入条间距 12px、欢迎语 `18px/26px` 且字重仍为 `400`。
- 03「仅移动端对话框」（英文 "Mobile composer only"，说明「390px 移动端示例 · 去掉头像、欢迎语与卡片，仅保留单行对话框」）使用 `.wb-aipaas-preview.wb-aipaas-agent-mobile-input-only`（宽度 100%、最大 390px）只承载 `form.wb-agent-composer.is-mobile`，不渲染卡片、头像和欢迎语 `<h2>`；表单自带 `data-wb-semantic="ai-entry"`、`data-wb-component="ai-composer"`、`data-aipaas-agent-form` 与双语 `aria-label`（`移动端 AI 输入区域（仅输入框）` / `Mobile AI input (composer only)`）。
- 两个移动示例的输入条为单行，`min-height:56px`、`padding:5px 4px`、圆角 20px。顺序固定为声波按钮、提示“发消息或按住说话”的文本输入、麦克风、附件加号、浅紫圆形发送；四个按钮触达至少 44px，发送圆图形 32px，长内容只在可收缩的输入轨道内滚动。
- 尺寸、颜色、轻阴影和焦点由共享 Token/组件负责；浅色白底读取 `--wb-surface-strong`，深色自动读取共享暗色 Token，不用局部硬编码白底。
- 保留 `ai-entry -> ai-composer`、双语 ARIA、稳定消息字段元数据与键盘焦点；空值或纯空白禁用发送，非空启用。文本输入和 Enter 走原生提交，IME 组合期间不提交；声波、麦克风与附件只显示既有未接入服务演示 toast，不请求麦克风权限、不录音、不伪造结果或发送成功。
- 移动端不带桌面模型选择器、建议问题区或虚构手机键盘。使用 `scripts/verify_catalog_layout.mjs` 检查移动输入、主题、语言、触达与桌面回归。

## 目录约定

```text
workbench-card-library/
  README.md                 使用入口与目录政策
  CARD_SPEC.md              强制设计与实现规范
  SEMANTIC_COMPONENTS.md    业务语义到共享组件的机器可读合同
  AI_PROMPT.md              可交给其他 AI 工具的提示词
  CHANGELOG.md              规范版本与防回归记录
  tokens.css                唯一设计令牌源
  components.css            标准组件样式
  select-interactions.js    共享枚举下拉弹层与键盘交互
  workspace-routing.js      工作台卡片跨页签路由契约
  role-image/               丰富头部卡片的八张透明角色形象 PNG
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

目录布局采用 `wb-library-*`：首页介绍、用途分组、自然等高预览、容器响应式指标和 DOM 派生的语义合同。首页不渲染模板搜索栏，也不重复“指标与分析”分组；用途导航只保留“介绍 / 主题色配置 / 指标与分析”，指标卡只在专属导航中展示并与复合分析卡一样使用通栏预览，复合示例从 AIPaaS 分组内 AI Agent 下方的“复合卡片”进入。选择“指标与分析”后只显示该分组，不保留首页介绍、统计或行业示例。行业配色建议使用六行三列结构，色名旁显示共享 Token 色块，并在窄容器中把推荐理由降到第二行。维护目录时同步 `cards/catalog-examples/` 和 `templates/catalog-item.html`，业务示例不得删减字段。

- ai-workbench-ux@1.6.36：对象入口目录移除通用 CRM 按钮；两个横向示例统一按工作台快捷入口样式，保留图标身份色、投影、数据与路由。

- 1.6.37（2026-10-19，覆盖1.6.36的入口图标投影规则）：对象入口的行内语义图标统一使用身份色前景与10%身份色混合共享 Surface 的单色底，不使用渐变、描边或投影；适用于横向完整、横向精简、纵向精简和移动展示的全部入口，在 hover/focus、丰富/简约与浅深色下均无图标投影。卡片自身背景、投影、64px横向高度、16px间距/圆角、容器列宽及原数据/路由保持。前端尺寸与交互规则维护于 cards/aipaas-foundations/OBJECT_ENTRY_FRONTEND_RULES.md。

- 1.6.38（2026-10-19）：两个横向对象入口的响应式网格上限从3列改为5列，期望最小列宽220px、间距16px不变；实际内容宽度达到456/692/928/1164px时依次使用2/3/4/5列。对象入口目录视图允许共享外框扩展至1600px，使宽屏能够实际显示五列；其他目录视图宽度不变。保持64px高度、纯色无投影图标、卡片背景/描边/投影、业务数据与路由，更新前端规则报告及回归。
