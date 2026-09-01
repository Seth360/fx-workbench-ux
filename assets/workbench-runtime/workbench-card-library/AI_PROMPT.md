# 跨 AI 工具卡片生成提示词

把以下内容连同业务需求、来源 HTML 或截图一起提供给任何 AI 工具：

```text
你正在依据“AI工作台UX规范”新增或改造业务卡片。

强制执行：
1. 完整读取 workbench-card-library/CARD_SPEC.md、tokens.css、components.css 和 templates/card-template.html。
2. 主题固定为 ai-workbench-ux@1.4.30，不自行创造新的视觉风格。
3. 保留来源中的全部业务数据结构、数字、单位、标题、说明、筛选条件和交互；不得编造、删列、改名或改变含义。
4. 优先复用现有类和 SVG 图标。图标容器 34x34px、图标 21x21px；所有图标必须按标题、操作或状态语义选择现有 SVG/统一图标库图标，禁止用中文、英文、字母缩写、数字或标点等可见文字生成或代替图标，禁止 emoji。把元、¥、$、货币代码或其他可见字符转成 SVG path 仍是文字式图标；金额指标必须使用钱包、钱币或钞票等纯图形图标，报价申请使用文档或剪贴板图标。没有完全匹配项时选择语义最接近的库内图标，不得退回文字图标。
5. 主卡片必须复用弱色画布玻璃配方：当前色系页面底、74% 半透明白 Surface、半透明白边框、22px/140% 背景模糊和当前强调色轻阴影。确需内部模块时使用无背景模糊的 wb-subpanel 与 wb-inner-tile，分别读取共享实底 Surface 和浅层级 Shadow；禁止复用主卡阴影或形成玻璃套玻璃。
6. 新文件只能保存到 workbench-card-library/cards/<card-name>/，并在 index.html 中登记入口或示例。
7. 必须覆盖默认、hover、focus、disabled、empty、loading、error（适用时）和 dark mode 状态。
8. 并排同组卡片必须使用 wb-equal-grid 或等价的 Grid stretch + 子项 flex 结构自然等高，禁止写死像素高度；单列时恢复自然高度。
9. 图标背景与投影必须使用同一个 --wb-tone；必须支持 6 套色系、中文/英文和浅色/深色切换。
10. 柱段、堆叠柱段、饼图和环图的每个色块必须支持 hover 与键盘 focus 浮层，浮层包含分类、原始值、单位和适用时的占比；首次呈现使用 1000ms easeOutQuart 等效动画并支持 reduced-motion。
10.1 每个图表使用 wb-chart-frame 或等价边界容器，容器及 Grid/Flex 子项设置 min-width:0、max-width:100%，确保标题、标签、图例、数值和交互点不越过卡片。包含文字、圆点、图标或固定描边的 SVG 禁止 preserveAspectRatio="none"；必须等比缩放，或同步 viewBox 与容器尺寸并重算坐标。
10.2 来源包含行业、部门等结果分布时，必须保留维度分段控件、每行原始分段数据和对应比率，切换只改变面板可见性。独立百分比必须同时显示指标名称。紧凑补充指标使用 wb-soft-metric 的低透明语义底色；列表下钻尾部使用语义数量胶囊和 SVG 箭头，不重复“进入 CRM”等目的地文字。
11. 图表与说明并排时图表至少获得 52% 可用宽度，说明区设窄轨道上限；补充事实使用说明在上、数值在下的结构。分析卡内部标题栏使用 44px 最小高度和 10px 16px 内边距；带分隔线的贴边标题卡使用 wb-flush-card/wb-flush-head/wb-flush-body，禁止叠加标准卡片外层内边距。
12. 全站拉丁字母和数字优先使用 Inter；--wb-font 与 --wb-font-number 都必须以 Inter 开头，中文继续使用既有中文回退字体。独立指标值、百分比、数量和单位末尾不得保留逗号或句号。
13. 两行分析网格的下排内容较少时使用 wb-compact-tail-grid：上排吸收剩余空间、下排自然收拢且同排等高。纵向补充事实使用 wb-fact-list，结果值至少 15px/20px、700 字重。
14. 跨页签组合必须优先复用现有卡片渲染器或数据适配层，并使用 wb-card-composition + 唯一 data-wb-card-key；同一业务队列、统计事实或操作入口不得因综合卡与子集卡同时挂载而重复出现。
15. 画布设置面板打开即进入布局编辑态、关闭即退出，不提供重复的编辑开关；页面级大区块和内嵌卡片都必须使用稳定的网格键、卡片键和编辑范围。同一范围允许跨网格纵向重排，并同时持久化当前归属与源/目标顺序；禁止跨范围移动和父子循环嵌套。空子网格收起，恢复默认时同时恢复原网格、顺序与宽度。设置抽屉压缩可用宽度时，编辑网格必须自动降为两列或单列，禁止卡片内容溢出。
16. 在 1440x900、1024x768、390x844 检查：无文本/组件重叠，无逐字竖排，无非预期页面横向滚动；抽屉或侧栏压缩实际内容宽度后，所有图表仍无卡片内越界且 SVG 文字、圆点、图标和描边不发生非等比变形。重点指标的长英文单位/标签在移动宽度可整组换到数值下一行，不得强制同排溢出。宽表格保留所有列并在表格容器内横向滚动。
17. 任何新的视觉修正必须同步更新 CARD_SPEC.md、Token/组件、AI_PROMPT.md、示例和 CHANGELOG.md，不能只修实施实例。
18. 完成后报告：生成文件、复用组件、保留的数据/交互、三个视口检查结果、任何规范偏差及原因。
19. 枚举筛选不得把系统原生选项面板作为最终视觉；使用共享 wb-select 复合结构与 select-interactions.js，保留原生 select 的值和 change 事件，弹层读取 Popover Surface/Border/Shadow 与圆角 Token，并完整支持方向键、Home/End、Enter/Space、Esc 回焦、Tab、点击外部关闭、aria-expanded/aria-selected、深色模式、中英文和 reduced-motion。工作台页头枚举筛选必须增加 wb-page-filter，周期使用 wb-page-period，二者统一读取 32px 的 --wb-page-header-control-height，禁止业务页局部覆盖。
20. 同一业务链路的紧凑分析用一个主卡 + wb-analysis-group/wb-subpanel 组织，子面板读取 wb-subpanel Surface/Shadow，内部事实块读取 wb-inner-tile Surface/Shadow，二者均不得启用第二层模糊；子标题必须有语义 SVG，四项紧凑指标保持两列。审批/通知数量使用标题同行的纯数字胶囊且说明独占下一行；多操作行使用 wb-action-row 放在第三行。快捷新建使用 wb-hover-action 在 hover/focus 时覆盖数值且不占文字宽度；柱图图例用 wb-chart-legend 居中放在绘图区上方；宽表快捷处理列用 wb-action-column 固定最右，使用完全不透明的 action-column Surface 遮住滚动文字，并使用高度 32px 的 wb-primary-action。
21. 同类快捷入口统一使用 wb-quick-grid/wb-quick-card 的 64px 高度、16px 网格间距和 10px 图标文案间距，任何页签或模板库不得局部覆盖。紧凑阶段/进度行使用 wb-compact-row-list/wb-compact-row 的 32px 行高和 4px 间距。标题与说明保持上下结构；当列表只保留一个统一入口时使用 wb-inline-action-list/wb-inline-action-item，把单一“处理”按钮放在正文右侧同一行。
22. 深色模式禁止把指标、快捷入口、元信息胶囊、表头、表行或 hover 与 white/浅色半透明值混合；必须读取共享深色 Surface 和 wb-table-* Surface。分段控件、输入框、复合下拉与页签移除顶部白色 inset 高光，只使用深色投影与强调色 focus ring。复用表格类的页面按组件本身匹配暗色样式，不得依赖单一业务祖先选择器。
23. 快捷新建按钮必须读取 --wb-hover-action-surface/--wb-hover-action-hover-surface 的不透明强调色背景；可用按钮整体 opacity 控制 hover/focus 显隐，但背景本身不得带透明度，也不得在暗色模式被卡片或子面板 Surface 覆盖。
24. 主题风格默认“丰富”，继续使用标准玻璃职责 Token；“简约”只能通过 data-wb-style="minimal" 将普通顶层主卡片切换为实底+描边、无阴影/模糊，并将标题、指标和快捷入口图标切为淡色纯色底、弱描边且无渐变/投影/发光，暗色模式仍使用深色 Surface。产品明确设计为深色的重点卡必须增加 wb-special-dark-card，简约模式不得改成白色。设置按钮在暗色必须清晰可见，滑杆左侧使用强调色进度轨道；“保存配置 / 导出 / 重置”保持同一行，保存必须固化状态到 HTML，不能只写 localStorage。
25. 顶部工作台页签使用 wb-workspace-tab-bar/wb-workspace-tab-list；带底色的列表必须按页签内容收缩（width:max-content、flex:0 1 auto），不得铺满整行。设置等末端工具独立靠右；空间不足时页签列表自身横向滚动，工具按钮仍可见且页面不产生横向溢出。
26. 页头周期与枚举筛选必须放入 wb-page-control-group，在桌面按内容自然宽度横向无换行排列，窄屏使用整行横向滚动而不堆叠。高度声明使用 var(--wb-page-header-control-height, 32px) 兜底；保存配置后的 HTML 即使被另存到没有 workbench-card-library 的目录，这两个控件也必须继续保持 32px 同高。
27. 数据密集型洞察页的文字操作命令使用 wb-compact-action 与 --wb-compact-action-height，统一为 32px；不得把该例外用于页签、筛选、开关或仅图标按钮。单条上下文事实带四项指标时，上下文独占首行作为标题，四项语义色软底指标卡放在下一行并响应为两列/单列，后续判断区不得重复该摘要。子面板底部口径说明使用 wb-boundary-note 与 --wb-note-surface 的灰色圆角 Surface 且无顶部描边；未完整覆盖标签只用橙色文字无底色；圆形数量徽标内的说明必须留在圆环内。
28. 页面级页头使用 wb-header > wb-title-group 的单列结构，h1 在上、说明 p 在下并占据同一内容列；标题保持 writing-mode:horizontal-tb 和完整词组横向阅读，禁止复用 34px 图标列或被压缩到逐字竖排。带语义图标的卡片标题组继续使用“图标 + 标题文案组”两列结构。
29. 相邻权威记录已经显示同一客户、项目或对象身份时，经产品确认移除重复身份大区块，只保留不重复的指标事实，并使用 wb-summary-metric-grid/wb-metric-grid 的语义色指标卡与语义 SVG。上游/下游关系使用 wb-relation-flow 纵向排列并由 wb-relation-branch 连线；明确要求成对的分析卡默认各占 6/12，内容或视觉反馈要求非对称时使用共享跨度 Token 保持 5/12 + 7/12，仅在实际容器宽度不足时降为单列。
30. 经营基本盘、当前阶段等紧凑四指标摘要使用 wb-compact-baseline-card；标题区用 wb-baseline-head-copy + wb-baseline-meta，指标区复用 wb-summary-metric-grid/wb-metric-grid。统一读取共享的 14px 16px 外层内边距、12px 标题区间距、96px 指标最小高度和 10px 12px 指标内边距，禁止用页面私有大留白摘要组件。
31. 关系标题、节点顺序与连线已明确方向时可移除可见的“上游/下游”标签，但每层必须保留可随语言切换的 aria-label。三分支关系使用 wb-relation-flow is-three-way，横线端点必须落在首末节点中心并连接全部三条竖线。同一页头的多个紧凑文字命令使用 wb-compact-action-group 横向无换行排列，所有按钮继续使用 wb-compact-action 保持 32px。
32. 三个工作台的跨页签入口统一接入 workspace-routing.js：销售线索进入列表页，客户进入客户经营洞察，商机与明确的查看商机/查看洞察动作进入商机项目经营洞察。优先使用 data-wb-route 显式声明目标；列表返回来源工作台；新建、处理、维护、填写等命令不得被路由器拦截。详情型动作必须实际切换到对应详情页签，禁止只显示占位 Toast。列表实体详情只复用当前行已有字段，保留搜索/分页状态，进入详情后聚焦返回按钮，返回后聚焦列表搜索入口。
33. 合法的显式 `data-wb-route` 必须优先于动作文案推断；表格项目名、客户名、公司名等跨页签实体值使用共享 `.wb-entity-link` 按钮，只让值本身可点击，并保留 hover、focus-visible、active、键盘激活和主题色状态。
34. 可单独分发的画布 HTML 必须通过共享打包脚本内联 tokens.css、components.css、页面卡片 CSS/渲染器、workspace-routing.js、select-interactions.js 与 chart-interactions.js；复制到没有 workbench-card-library 的目录后，所有页签内容、路由、筛选和图表交互仍须完整，保存生成的 HTML 也必须继续保持单文件完整性。交付前运行 verify_standalone_canvas.mjs。
35. 编辑态四方向拖拽目标线统一读取不透明主题强调色和共享 edit-guide Token，并完整绘制在目标卡片内部；左右缩放控件同样内收，禁止被 overflow 裁切。卡片 hover/focus 时右上角显示语义垃圾桶隐藏按钮，隐藏键随配置持久化；底部居中只显示一个“已隐藏 + 数量 + 还原全部”胶囊，恢复全部卡片，重置清空隐藏状态。激活分段项 hover 必须保持强调色；紧凑文字按钮统一使用共享 32px 次要/主要样式。
36. 列表工具栏中的按等级/按状态/按负责人分组使用透明无投影的 wb-filter-segmented，选中与 hover 只使用强调色文字和弱强调 Surface，禁止页签底板、白底 hover 或白字反白。列表状态使用内容宽度、22px 高且双轴居中的 wb-status-tag；负责人使用 wb-person-label + 22px wb-avatar，14px currentColor SVG 必须以亮色前景居中。wb-flush-head 与 wb-flush-body 必须是 wb-flush-card 的直接子项，正文桌面使用 16px 20px 20px、手机使用 16px，禁止包装层导致 0 内边距。

先检查现有组件是否足够，再实现。不要只给建议，直接产出可运行文件。
```

若 AI 工具不能读取本地文件，应同时粘贴 `CARD_SPEC.md` 的完整内容；不要仅凭截图猜测令牌。
