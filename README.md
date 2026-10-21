# FX Workbench UX

一键将来源需求转为符合 UI 规范、可直接打开和继续配置的纷享工作台。

`fx-workbench-ux` 是一个面向 Codex 的工作台生成 Skill。它可以读取文字描述、需求文档、图片、现有 HTML 或多种素材的组合，提取其中的页面结构、业务数据、筛选条件和交互入口，生成符合 `ai-workbench-ux@1.6.38` 规范的静态多页签工作台 HTML。

生成结果不是设计稿或静态截图，而是一个可使用、可配置、可按页签导出独立页面，并能独立分发的完整工作台。

## v1.6.38 更新

- 同步本机 `ai-workbench-ux@1.6.38` 的 Skill、共享规范、Token、组件、目录示例、语义契约和画布运行时。
- AIPaaS 目录包含欢迎卡片、AI 洞察、对象入口、信息列表卡片、对象列表、文本、按钮、图片、AI Agent，以及复合卡片示例。
- 信息列表保留待办、提醒、关注三个独立示例，并增加仅未处理的 AI 待协助通知和空数据状态；保留来源数量、文案、字段及服务未接入边界。
- 对象入口保留三种样式和独立移动展示；横向网格按实际容器宽度自适应一至五列，语义图标使用纯色前景和浅色底，不使用图标渐变、描边或投影。
- AI 洞察使用统一时间戳与刷新动作；AI Agent 提供桌面、移动及仅移动输入框示例，保留键盘、IME 和空白输入处理。
- 包含 2026-10-20 的对象入口前端规则文档修订；该修订没有实施 FDS 页面迁移，UI 版本仍为 1.6.38。

完整变更及历史验证记录见 [CHANGELOG.md](./assets/workbench-runtime/workbench-card-library/CHANGELOG.md)。本仓库保留文本 QA 记录；历史回归截图不随 Skill 源码分发，历史记录不代表本次重新完成全部浏览器验证。

下载仓库后，在浏览器打开 `assets/workbench-runtime/workbench-card-library/index.html` 查看模板库。该页面是规范目录；AI/CRM 业务命令仅作组件示例，需在业务页面接入来源服务。

## 核心能力

### 一键从来源需求生成工作台

只需提供来源材料并说明期望结果，Skill 会自动完成页面盘点、信息提取、卡片选择、布局组织、主题适配和运行时接入。

支持的来源不限于：

| 来源 | 能力 |
| --- | --- |
| 文字描述 | 根据自然语言需求生成工作台、页签、卡片、筛选和操作入口 |
| 需求文档 | 从 Word、PDF、Markdown、PRD 等文档中提取业务结构、指标、单位、状态和流程 |
| 图片或界面截图 | 识别信息层级、页面结构和视觉参考，用于重建符合规范的工作台界面 |
| 现有 HTML | 将原页面作为业务与交互证据，从 bundled canvas 按规范结构完整重新生成 |
| 多种素材组合 | 综合文字、文档、图片和 HTML，按同一业务口径生成完整结果 |

Skill 会保留来源中的业务事实，不会为了填满卡片而编造数字、趋势、负责人或 CRM 数据。来源明确但数据缺失时，会使用合适的空状态或范围清晰的占位内容。

当请求只说“按照 Skill 美化一下 HTML”“优化这个页面”“调整成工作台风格”或类似宽泛措辞时，Skill 仍会执行完整重生成：从 bundled canvas 重新建立页面、工作区、网格和卡片结构，而不是在旧 DOM 上追加覆盖 CSS。只有明确要求保留现有 DOM、只修某个问题或最小改动时，才执行增量编辑。

### 符合统一 UI 规范

生成页面默认复用随 Skill 内置的工作台画布、设计 Token、公共组件和卡片规范，而不是临时拼装一个通用 Dashboard。

- 使用统一的卡片、指标、列表、表格、图表和筛选组件
- 保持稳定的信息层级、间距、字体、图标、圆角和交互状态
- 使用语义化 SVG 图标，不用文字、缩写、数字、标点或 Emoji 代替图标
- 保留来源中的标题、说明、数值、单位、筛选条件和操作入口
- 宽表格在自身容器内滚动，不删减业务列，也不产生页面级异常溢出
- 图表支持容器自适应、指针与键盘 Tooltip、入场动效和 reduced-motion 降级

### 生成后可继续调整画布

每个生成的工作台都保留完整的右侧画布设置面板，可直接调整：

- **主题风格**：丰富、简约
- **页面间距**：通过滑杆调整工作台内容密度
- **卡片圆角**：通过滑杆调整卡片圆角大小
- **六种颜色主题**：经典蓝、云杉绿、珊瑚橙、鸢尾紫、石墨红、中性灰
- **明暗模式**：浅色、深色
- **语言**：内置中文和 English，并通过统一多语字典支持继续扩展
- **布局编辑**：打开设置后即可调整已注册区块和卡片的顺序、跨度与归属；四方向拖放使用清晰的主题强调色引导线
- **卡片显隐**：编辑态悬停或聚焦卡片可隐藏；底部胶囊显示隐藏数量并支持一键还原全部卡片
- **配置操作**：按顶层页签导出独立页面、恢复默认

点击“导出页面”会为每个顶层页签生成一份以当前页签文案命名的自包含 HTML。每份文件只保留该页签的主画板，不包含页签顶栏、设置抽屉、CRM 导航、其他页签、编辑辅助层或隐藏卡片；当前间距、圆角、主题、语言、明暗模式、布局和可见内容会固化到输出。多页签时优先只选择一次目标文件夹，不支持文件系统 API 的浏览器会逐份下载。

### 桌面端与移动端适配

生成结果按实际内容宽度响应，而不是只针对一个桌面截图尺寸设计。

- 宽桌面：`1440x900`
- 窄桌面：`1024x768`
- 移动端：`390x844`
- 设置抽屉打开后，卡片和图表会根据剩余宽度继续适配
- 移动端页签、筛选组、宽表格和交易进度在各自区域内滚动，避免页面整体横向溢出
- 中英文切换后继续保持布局、数据含义和交互状态稳定

### 多页签与业务交互

- 根据需求生成准确的顶层工作台页签，不额外保留无关模板页
- 为每个页签、面板、网格和卡片生成稳定标识
- 支持页签键盘导航和选中状态保持
- 支持跨工作区路由、列表与详情切换、实体字段下钻和返回来源页签
- 保留复合下拉、筛选、搜索、快捷入口、队列、图表、流程阶段和操作按钮等来源能力
- 同一业务能力复用共享渲染器或数据适配层，避免重复卡片和重复计数

### 可独立分发的单文件 HTML

生成的可分发画布会内联当前共享 Token、组件、卡片样式与渲染器、工作区路由、下拉交互和图表交互。

编辑器 HTML 即使被复制到没有 `workbench-card-library` 的其他目录，也能继续显示全部页签内容；导出的每个工作区 HTML 同样内联 CSS、SVG 图标、相关页面渲染器、复合下拉和图表交互，无需部署后端服务。

## 安装

将仓库克隆到 Codex Skills 目录：

```bash
git clone https://github.com/Seth360/fx-workbench-ux.git ~/.codex/skills/fx-workbench-ux
```

安装完成后新建一个 Codex 任务，并确认技能列表中可以看到 `FX Workbench UX`。

已有安装可以这样更新：

```bash
git -C ~/.codex/skills/fx-workbench-ux pull --ff-only
```

## 快速使用

在请求开头调用 `$fx-workbench-ux`，然后提供来源材料和期望的工作台结构。

```text
使用 $fx-workbench-ux，根据我提供的需求文档和界面截图生成以下工作台：

1. 公司经营工作台
2. 我的管理范围工作台
3. 我的销售业务工作台

保留来源中的指标、单位、筛选条件、表格字段和操作入口，不要编造缺失数据。
生成符合工作台 UI 规范的多页签静态 HTML，并适配桌面端、移动端、深色模式和中英文。
```

也可以直接要求美化已有 HTML：

```text
使用 $fx-workbench-ux 美化这个 HTML。
把现有 HTML 作为业务数据、页签、筛选值和交互事件的来源，从 bundled canvas 按 ai-workbench-ux
规范完整重新生成工作台 HTML，并保留间距、圆角、六种颜色主题、深色模式、中英文、按页签导出页面、
卡片隐藏/还原和移动端适配能力。
```

## 输出与验收

Skill 会生成可打开的工作台 HTML，并报告页签清单、来源能力覆盖情况、复用的组件、保留的数据与交互，以及验证结果。

验证画布运行时：

```bash
node scripts/verify_canvas_runtime.mjs assets/workbench-runtime/fxiaoke-workbench-canvas.html
```

验证复制到孤立目录后的单文件完整性：

```bash
node assets/workbench-runtime/workbench-card-library/scripts/verify_standalone_canvas.mjs \
  assets/workbench-runtime/fxiaoke-workbench-canvas.html
```

验证跨工作区路由：

```bash
node assets/workbench-runtime/workbench-card-library/scripts/verify_workspace_routing.mjs
```

实际点击“导出页面”后，验证所有独立工作区 HTML：

```bash
node assets/workbench-runtime/workbench-card-library/scripts/verify_exported_workspace_pages.mjs \
  /absolute/path/to/page-1.html /absolute/path/to/page-2.html
```

安装 Playwright 后可验证规范目录：

```bash
node assets/workbench-runtime/workbench-card-library/scripts/verify_catalog_layout.mjs
```

目录历史回归记录保存在 `assets/workbench-runtime/workbench-card-library/qa/`。运行上述命令可生成当前环境的验证结果；请将历史验证与本次执行结果分开记录。

更完整的安装与使用说明见 [SHARE_GUIDE.md](./SHARE_GUIDE.md)，完整生成契约见 [SKILL.md](./SKILL.md)。

## 内置内容

- 完整纷享工作台画布运行时
- `ai-workbench-ux@1.6.38` 设计 Token、公共组件和卡片规范
- 商机项目经营洞察与客户经营洞察卡片
- 复合下拉与图表交互
- 跨工作区路由
- 单文件画布构建、逐页导出与验证脚本
