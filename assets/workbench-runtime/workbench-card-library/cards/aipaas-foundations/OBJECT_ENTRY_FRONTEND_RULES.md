# 工作台对象入口前端规则（FDS Token 对齐版）

报告修订：2026-10-20 · 基于工作台 UI `ai-workbench-ux@1.6.38`

本报告规定下一次前端接入的 FDS 对齐目标，统一Token消费、页面布局断点与组件容器宽度的验收规则。覆盖工作台画布、父卡片，以及第01/02例横向对象入口；行内图标纯色、无描边、无投影要求继续适用于所有对象入口变体。业务名称、36/13/3/2/2数值、字段元数据、原顺序及合法显式路由不变。

本次修改报告及本地分发副本，未修改页面CSS/DOM或重新发布内部仓库。现有v1.6.38页面仍是上次验证的实现，尚未完成本报告中的FDS迁移；不能将上次UI回归结果当作本报告迁移后的验收结果。

## 1. Token接入与检查的指定引用项目

本报告的Token引用入口统一使用用户指定的两个项目目录：

| 项目入口 | 在本报告中的职责 |
| --- | --- |
| [fds-linter](https://git.firstshare.cn/fx/fds/-/tree/master/packages/fds-linter?ref_type=heads) | Token使用规则、有效变量校验、scan/apply/verify、JSON/SARIF报告和退出码 |
| [FDS Skills](https://git.firstshare.cn/fx/fds/-/tree/master/packages/skills?ref_type=heads) | Agent接入与迁移流程、Card容器/内容列的消费原则、人工复核边界 |

核查日期2026-10-20，通过Git重新获取master，最新源码提交为 `76f49e2402983a455c152871ffa0a44255cc0eff`（2026-10-20 15:03:45 +0800，`feat(card): 弱化卡片概念`）。相较上次快照 `1835149548d811128616e37d95c2c998cf04297d`，新增1条提交；`packages/fds-linter` 与 `packages/skills` 没有文件变化，变化发生在它们消费的Token源码。入口链接跟随master，以下另列源码与生成物差异，不把源码更新写成引擎已执行或npm包已发布。

两项目职责须区分：`fds-linter`从实际安装的 `@sharecrm/fds-tokens` 依赖读取catalog，判断变量是否合法；`packages/skills`负责路由、工具调用与报告解释，不保存Token YAML，也不独立定义Token值。报告中的可消费变量已对照本次仓库release catalog核实，新名称单独对照最新YAML标注为待同步；实施时仍须以本次工具实际加载的catalog为准，不能仅凭名称相似推断变量。

- 原子与基础语义使用 `--fds-g-*`；页面/卡片场景使用 `--fds-s-*`。禁止自造同前缀变量并标为FDS官方Token。
- 既有组件变量有效时保留其优先级，FDS作为已验证的下一层；自动迁移按工具政策保留原值fallback，不能以接入Token为由静默删除它。
- 64px入口高度、220px期望最小列宽及最多5列属于对象入口组件合同；480/768/1024px页面断点来自本次用户截图约定，均不是本次FDS catalog提供的Breakpoint Token。图标等尺寸按下表明确选用真实FDS原子尺度。
- `scan`只扫描并写报告；`apply`改源码；`verify`做静态复核。`lint`只输出终端诊断，不等同于verify，也不生成迁移报告。
- 静态校验通过不替代容器、主题、键盘与视觉验收；不能把扫描完成或退出码0描述为页面已完成Token迁移。

Card消费依据：[Card Token消费原则](https://git.firstshare.cn/fx/fds/-/blob/76f49e2402983a455c152871ffa0a44255cc0eff/packages/skills/fds-migrate/references/card-token-consumption.md)。容器消费外观与padding，内部内容列消费gap；不重复叠加Card padding。该文档的职责原则继续适用，但变量示例仍为旧名称，须按下一节的实际catalog状态消费。

### 1.1 本次更新：源码改名，生成物与Skills示例尚未同步

最新提交只修改 `packages/fds-tokens/tokens/semantic/scene/default.yml`，将16个场景Token从 `card-*` 改名为 `comp-*`；对应值、引用及默认行为未变。`page-*` 与 `layout-gap` 不变。核查依据：[本次源码提交](https://git.firstshare.cn/fx/fds/-/commit/76f49e2402983a455c152871ffa0a44255cc0eff)。

| UI职责 | 当前release/catalog中的变量 | 最新YAML中的名称（待生成、发布核实） |
| --- | --- | --- |
| 容器padding | `--fds-s-card-spacing` | `--fds-s-comp-spacing` |
| 内容列gap | `--fds-s-card-content-gap` | `--fds-s-comp-content-gap` |
| 标题栏与主体gap | `--fds-s-card-header-content-gap` | `--fds-s-comp-header-content-gap` |
| 标题栏内部gap | `--fds-s-card-header-gap` | `--fds-s-comp-header-gap` |
| 普通表面 | `--fds-s-card-background` | `--fds-s-comp-background` |
| 边框颜色 | `--fds-s-card-border-color` | `--fds-s-comp-border-color` |
| 边框宽度 | `--fds-s-card-border-width` | `--fds-s-comp-border-width` |
| 圆角 | `--fds-s-card-border-radius` | `--fds-s-comp-border-radius` |
| 投影 | `--fds-s-card-shadow` | `--fds-s-comp-shadow` |
| 标题颜色 | `--fds-s-card-title-color` | `--fds-s-comp-title-color` |
| 标题字号 | `--fds-s-card-title-size` | `--fds-s-comp-title-size` |
| 标题字重 | `--fds-s-card-title-weight` | `--fds-s-comp-title-weight` |
| 辅助文字颜色 | `--fds-s-card-header-meta-color` | `--fds-s-comp-header-meta-color` |
| 辅助文字字号 | `--fds-s-card-header-meta-size` | `--fds-s-comp-header-meta-size` |
| 辅助文字字重 | `--fds-s-card-header-meta-weight` | `--fds-s-comp-header-meta-weight` |
| 标题行高倍率 | `--fds-s-card-title-line-height` | `--fds-s-comp-title-line-height` |

但同一提交中的 `release/fds-global-tokens.css`、`release/fds-token-catalog.json`、JSONL及Skills的Card消费文档与上次快照逐字节相同。当前提交的release catalog仍有514个Token，包含16个 `--fds-s-card-*`、不包含 `--fds-s-comp-*`。仓库package.json仍为fds-tokens 0.4.0、fds-linter 0.1.9；这不证明npm仓库中已有包含改名的发布包，本次未核验npm发布状态。

因此，第3、5节可消费示例暂按当前release的 `--fds-s-card-*` 写法保留。实施前须同时核验实际加载的CSS与linter catalog：两者都包含 `--fds-s-comp-*` 后，再按上表整体切换，并同步场景覆盖、组件消费及校验；禁止只改一侧、假定新旧名称自动兼容，或为通过检查而自造FDS别名。新版生成物未就绪时继续消费现有有效名称，保留既有组件变量的优先级。最新源码目标与当前可消费变量在此明确分列。

## 2. 页面宽度按截图规则，组件按实际容器适配

本节按用户本次提供的截图制定工作台布局约定，不声称已重新审计SLDS全部组件或FDS提供相同断点。页面布局断点、组件自己的切换规则、组件所在区域的宽度分别判断；替换上一版把组件宽度固定为三个1/3/5列范围的写法。

### 2.1 页面布局范围

P为页面布局viewport宽度，采用CSS px。常用布局断点是480、768、1024px；三个断点形成以下四个连续范围，低于480px的兜底范围必须保留。

| 页面宽度P | 布局范围 | 工作台适配用途 |
| --- | --- | --- |
| P < 480px | 窄屏兜底 | 主要内容单列，保留必要操作；筛选与控件按自身合同换行或内部滚动，避免整页横向溢出 |
| 480px ≤ P < 768px | Small | 紧凑查询、表单与手机横屏场景；有足够空间时支持inline布局，不能由页面档位强制每个组件多列 |
| 768px ≤ P < 1024px | Medium | 客户详情、编辑表单和记录列表可采用多列；区域不足时组件继续按容器宽度收缩 |
| P ≥ 1024px | Large | 桌面主辅区布局；按业务内容选择8/12+4/12等分栏，不能由页面档位强制对象入口显示五列 |

边界采用min-width逐档覆盖：480px进入Small，768px进入Medium，1024px进入Large。截图中的特定组件规则（如Modal在≤480px全屏、stacked table在≤768px堆叠）属于组件自身的边界，不能据此改写页面档位。本报告不新增原页面没有的Modal或表格交互。

### 2.2 320px与1280px的用途

| 边界 | 本报告约定 | 与布局档位的关系 |
| --- | --- | --- |
| 320px / 20em | 极窄视口兜底检查，保留主要内容与必要操作 | 不新增网格档位，也不表示低于320px可以不支持 |
| 1280px / 80em | 宽屏内容最大宽度参考；需要限制阅读宽度的主内容容器可使用max-width:1280px，并居中 | 不增加一列，不等同于媒体查询；不强制把整个含侧栏的应用外壳限制为1280px |

em换算按截图的16px基准说明；实现与验收统一使用CSS px，避免用户字号变化时把两种单位误认为恒等。目录当前1600px外框仍是既有实现，不能将本报告的1280px内容宽度参考描述为已经落地的页面样式。

### 2.3 对象入口列数与卡片宽度

C为入口网格实际可用内容宽度，已扣除侧栏、抽屉、父卡片padding等占位，与页面P分开记录。最多5列、期望最小列宽M=220px、间距G=`var(--fds-g-spacing-7)`（当前16px）。按实际容器容量计算：

`N = min(5, max(1, floor((C + G) / (M + G))))`

`每张入口宽度 = (C − (N − 1) × G) / N`

允许1至5列，包括2列和4列；不再沿用上一版只允许1/3/5列的限制。卡片采用border-box、横向64px高、无固定像素最大宽；C不足220px时卡片收缩至C，内部文字截断但保留完整可访问文本。条目少于当前列数时保留等宽轨道及原顺序，末行不单独拉宽。390px移动完整展示保持单列；移动精简展示继续采用其独立五入口合同。

例如：页面P=1024px时，若入口容器仅C=720px，容量为3列；只有容器能容纳5×220px及4个16px间距时才显示5列。这个容量计算不作为页面断点。Container Query若使用带padding的外层容器，应扣除padding或改查询内容包装层；间距Token改变后重新计算容量。

## 3. 工作台、父卡片与入口外观变量

下表与CSS示例使用本次仓库release catalog中仍有效的card名称；最新源码对应comp名称见1.1节。实际接入选用哪套名称，取决于所安装CSS与catalog是否同步支持。

| UI职责 | 指定FDS变量 | 当前定义/消费方式 |
| --- | --- | --- |
| 页面画布 | `--fds-s-page-background` → `--fds-g-background-main` | Scene默认initial；在工作台场景显式绑定基础画布色，当前gray-3=`#F2F3F5` |
| 父卡片普通表面 | `--fds-s-card-background` | 默认指向 `--fds-g-background-surface`，当前gray-1=`#FFFFFF` |
| 父卡片圆角 | `--fds-s-card-border-radius` → `--fds-g-radius-6` | FDS Scene默认4px；工作台作用域明确覆盖为16px，不能将16px写成FDS默认 |
| 父卡片内边距 | `--fds-s-card-spacing` → `--fds-g-spacing-8` | FDS Scene默认12px；工作台父卡片显式选20px，内容列不重复消费padding |
| 对象入口网格间距 | `--fds-g-spacing-7` | 16px；属于对象入口组件内布局，不改整个工作台的Scene默认gap |
| 横向入口内边距 | `--fds-g-spacing-4` / `--fds-g-spacing-6` | 上下8px / 左右12px；不重复套用父卡片card-spacing |
| 横向入口圆角 | `--fds-g-radius-6` | 16px，明确选用原子尺度 |
| 入口普通表面 | `--fds-g-background-surface` | 普通未分类入口使用此Token；分类入口按下一节使用真实色板Token |
| 横向入口和图标描边 | 不绘制，`border:none` | 无边框是本组件规则；FDS没有border-width-0，不能编造该变量 |
| 需要分隔边框的其他工作台容器 | `--fds-g-border-width-1` / `--fds-g-border-default` | 1px及基础边框色；不强制加到已批准无描边的对象入口 |
| 父卡片投影 | `--fds-s-card-shadow`，缺省回退 `--fds-g-shadow-none` | Scene默认initial，当前目标为无阴影；不要把initial当成可见投影配方 |
| 横向入口和图标投影 | `--fds-g-shadow-none` | none；去除原入口玻璃阴影，符合FDS静态表面职责 |
| 浮层背景（如Tooltip） | `--fds-g-background-elevated` | 只给浮层消费，不代替卡片普通表面 |
| 浮层投影 | `--fds-g-shadow-dropdown` | 只用于轻量上下文浮层，不用于入口卡片 |
| 键盘焦点 | `--fds-g-border-focus` / `--fds-g-border-width-2` | 焦点色及2px轮廓；普通offset使用spacing-1=2px |

工作台场景绑定示例，声明范围仅限工作台，组件私有变量不使用FDS命名空间：

```css
.workbench-scope {
  --fds-s-page-background: var(--fds-g-background-main);
  --fds-s-card-border-radius: var(--fds-g-radius-6);
  --fds-s-card-spacing: var(--fds-g-spacing-8);
  --fds-s-card-shadow: var(--fds-g-shadow-none);
}
.workbench-page {
  background: var(--fds-s-page-background, var(--fds-g-background-main));
}
.workbench-parent-card {
  background: var(--fds-s-card-background);
  padding: var(--fds-s-card-spacing);
  border-radius: var(--fds-s-card-border-radius);
  box-shadow: var(--fds-s-card-shadow, var(--fds-g-shadow-none));
}
.entry-card {
  padding: var(--fds-g-spacing-4) var(--fds-g-spacing-6);
  border: none;
  border-radius: var(--fds-g-radius-6);
  box-shadow: var(--fds-g-shadow-none);
}
```

前一版74%白色玻璃面、4%/8%混色、蓝色大面积阴影不是FDS官方Token配方。本报告的FDS默认接入使用上述正式Surface、Palette及Shadow职责。若产品后续仍需保留丰富玻璃变体，须单独登记组件扩展配方并验证，不能把它描述为FDS现成能力。

## 4. 分类颜色与纯色图标

对象身份不是成功/警告/风险状态，因此分类颜色使用FDS Atomic Palette，不把客户绿色绑定为success，也不把商机橙色绑定为warning。需要真实风险或成功状态时另用 `--fds-g-color-danger*`、`--fds-g-color-warning*`、`--fds-g-color-success*`。

| 对象 | 图标前景（纯色） | 入口默认背景 | 入口Hover背景 | 图标底板背景 |
| --- | --- | --- | --- | --- |
| 客户 | `--fds-g-color-green-6` | `--fds-g-color-green-0` | `--fds-g-color-green-1` | `--fds-g-color-green-1` |
| 项目商机 | `--fds-g-color-amber-6` | `--fds-g-color-amber-0` | `--fds-g-color-amber-1` | `--fds-g-color-amber-1` |
| 试料验证 | `--fds-g-color-purple-6` | `--fds-g-color-purple-0` | `--fds-g-color-purple-1` | `--fds-g-color-purple-1` |
| 报价管理、待办决策 | `--fds-g-color-blue-6` | `--fds-g-color-blue-0` | `--fds-g-color-blue-1` | `--fds-g-color-blue-1` |

行内SVG保持单色currentColor、语义图形、aria-hidden=true；底板无渐变、无描边、无投影。焦点用 `--fds-g-border-focus`，不跟随每个对象身份色。默认FDS品牌强调色为brand-6，当前为橙色；不能继续把工作台固定蓝色当作FDS主色。

## 5. 尺寸与文字的FDS对应

| 元素 | 当前工作台值 | 本报告FDS对齐目标 | 指定变量或说明 |
| --- | --- | --- | --- |
| 横向入口高度 | 64px | 64px | 保留现有 `--wb-quick-card-min-height: 64px`；FDS没有直接64px高度Token，不把spacing当作控件高度语义或新造FDS变量 |
| 图标与文案间距 | 10px | 10px | `--fds-g-spacing-5` |
| 图标底板 | 34px | 32px | 宽高用 `--fds-g-spacing-10`，须同步调整内部网格首列 |
| 图标底板圆角 | 7px | 8px | `--fds-g-radius-4` |
| SVG图形 | 19px | 20px | 宽高用 `--fds-g-spacing-8`，保持等比 |
| 对象名称 | 12px/18px、粗体 | 12px/18px、700 | `--fds-g-font-size-1` / `--fds-g-line-height-2` / `--fds-g-font-weight-bold` |
| 场景说明 | 10px/16px | 12px/16px、400 | `--fds-g-font-size-1` / `--fds-g-line-height-1` / `--fds-g-font-weight-regular`；FDS没有10px字号 |
| 数量 | 20px/26px | 20px/28px、700 | `--fds-g-font-size-7` / `--fds-g-line-height-6` / `--fds-g-font-weight-bold`；FDS没有26px行高 |
| 父卡片标题 | 15px/21px | Scene字号15px、行高倍率1.2、700 | `--fds-s-card-title-size` / `--fds-s-card-title-line-height` / `--fds-s-card-title-weight`；倍率无单位，不能写成px |
| 父卡片辅助说明 | 按旧共享样式 | 12px、400 | `--fds-s-card-header-meta-size` / `--fds-s-card-header-meta-weight` |
| 标题/名称/数量颜色 | 工作台私有文字色 | FDS主文字色 | 标题 `--fds-s-card-title-color`；名称/数量 `--fds-g-color-text-primary` |
| 场景说明颜色 | 工作台私有弱文字色 | FDS次文字色 | `--fds-g-color-text-secondary` |
| 父卡片辅助文字色 | 工作台私有弱文字色 | Scene辅助文字色 | `--fds-s-card-header-meta-color` |
| 字族 | Inter优先 | 保留组件字体栈 | 当前FDS catalog没有font-family Token，不编造FDS字族变量 |

完整型内部轨道调整为 `32px minmax(0,1fr) minmax(0,auto)`；名称型为 `32px minmax(0,1fr)`。尺寸计算不缩小字体，不非等比缩放SVG。

## 6. 交互状态与可访问性

| 状态/操作 | FDS对齐后的报告规则 |
| --- | --- |
| 默认 | 原生button[type=button]；整张入口可点击；不恢复标题栏通用“打开CRM”按钮 |
| Hover | 使用本对象Palette第1阶背景；取消额外上移与新增阴影，保持布局占位 |
| Focus-visible | 2px `--fds-g-border-focus` 轮廓，2px `--fds-g-spacing-1` 外偏移；路由入口旧3px偏移统一到FDS尺度2px |
| 点击、Enter、Space | 保留原生激活、显式路由和业务回调；目录未接服务时只显示既有边界反馈 |
| 按下 | 保持原生按钮行为；来源没有持久选中态，不新增aria-pressed或改写业务状态 |
| 常规反馈过渡 | `--fds-g-motion-feedback-duration` + `--fds-g-motion-feedback-easing`，当前100ms与Enter曲线；替换160ms ease |
| Reduced motion | 消费语义Motion Token；FDS CSS在prefers-reduced-motion下将反馈时长改为0ms，不继续固定.01ms |
| 长文案 | 横向文字单行ellipsis；完整文本及字段原值保留；不以改业务值迁就布局 |
| 禁用/加载 | 来源未定义，不制作虚构状态；后续真实服务接入时再绑定对应状态Token和ARIA |

FDS变量控制视觉，不替代键盘、焦点、路由、字段元数据和双语名称合同。

## 7. 深色与主题边界

本次源码catalog与CSS快照只提供Base Palette及固定Dark Atomic/Map，没有暗色Semantic或可直接开启整套暗色语义的 `data-theme="dark"` 实现。接入时按上述两项目读取的实际依赖核查，不从Dark Palette名称推断自动主题切换能力。

工作台仍须保留其深色开关和既有六色系，但迁移时由工作台主题适配层分别重绑surface、text、border、focus、各分类Palette；暗色分类可引用真实 `--fds-g-color-green-dark-6` 等变量。该适配层属于工作台组件配置，本文不把它写成FDS默认值。未完成主题映射和对比度验收前，不移除现有暗色实现、不宣称已完成FDS深色适配。不得在深色作用域直接沿用浅色gray-1普通表面造成白块。

## 8. 接入与验收

1. 按指定fds-linter/Skills项目的接入说明使用实际依赖，先确认引擎、catalog版本及lockfile；检查CSS与catalog是否同时包含本次所选card或comp名称，不能只看package.json版本号。浏览器引入实际安装的 `@sharecrm/fds-tokens/release/fds-global-tokens.css`，先于组件样式加载。若使用已有组件变量，保留其优先级，FDS作为已验证的第二层，不生成不存在的FDS变量名。
2. 父卡片消费Scene外观；入口内部使用明确的Global尺度和分类Palette。父卡片padding不能重复套到内部内容列。Scene默认initial的可选值应有明确消费行为；不要用颜色相近来替代语义匹配。
3. 页面代码迁移后验证P=479/480、767/768、1023/1024px的两侧，确认页面范围连续且边界归属正确；另测320px极窄兜底与1279/1280/1281px内容宽度限制。组件容量独立验收：C=455/456、691/692、927/928、1163/1164px依次跨越1→2→3→4→5列，以上均为M=220、G=16时的容量边界，不称为页面断点。补测220px以下、空列表、单项、五项、英文长名称及字段溢出。
4. 1440×900、1024×768、390×844是viewport验收尺寸，不能代替组件内容宽度断点测试。宽屏额外验证一行五项。覆盖六色系、中英文、浅深色及丰富/简约，并检查控制台、键盘、可见焦点、reduced motion和来源数据。
5. 迁移后需更新当前 `verify_catalog_layout.mjs`，增加页面断点、实际组件容量及内容最大宽度的独立断言；现有1–5列回归只能作为组件旧实现证据，不能证明页面范围或FDS迁移已经完成。

本次文档校验通过：62个具体可消费FDS变量与最新提交所携带的release catalog逐项核对；16个comp目标名称与最新YAML生成的临时catalog逐项核对，并确认改名前后值一致；4处固定提交源码链接存在。两个指定目录已比较更新差异；页面宽度0–4000px的四个范围互斥且连续，13组组件容量用例通过。临时生成catalog仅用于本次核查，没有覆盖上游release。核查记录分清源码、仓库生成物和实际安装依赖，未核验npm发布状态、未执行页面迁移或浏览器回归，不证明页面已迁移或已发布。

## 9. 指定项目引用与接入依据

- [fds-linter项目入口](https://git.firstshare.cn/fx/fds/-/tree/master/packages/fds-linter?ref_type=heads)：Token规则、扫描/迁移/复核命令及报告契约。
- [FDS Skills项目入口](https://git.firstshare.cn/fx/fds/-/tree/master/packages/skills?ref_type=heads)：总入口、专项迁移Skill及工具分工。
- [fds-migrate流程](https://git.firstshare.cn/fx/fds/-/blob/76f49e2402983a455c152871ffa0a44255cc0eff/packages/skills/fds-migrate/SKILL.md)：先scan、解读报告、明确写入范围后apply、再verify；本报告修订未执行该迁移流程。
- [Card Token消费原则](https://git.firstshare.cn/fx/fds/-/blob/76f49e2402983a455c152871ffa0a44255cc0eff/packages/skills/fds-migrate/references/card-token-consumption.md)：容器外观、内容列gap及旧组件变量优先级；当前示例仍是card名称，按1.1节处理源码与生成物差异。
- [Token匹配政策](https://git.firstshare.cn/fx/fds/-/blob/76f49e2402983a455c152871ffa0a44255cc0eff/packages/skills/fds-migrate/references/matching-policy.md)：有效变量、自动替换、相似候选与豁免边界。
