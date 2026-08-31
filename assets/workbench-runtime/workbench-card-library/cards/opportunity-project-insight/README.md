# 商机项目经营洞察

## 业务来源

来源页面：经营工作台多角色双端原型中 `main#insight-page` 的“扫地机耐划伤结构件”商机项目详情。工作台版本使用同一组业务事实重新组织为画布页签，不复制来源页面的视觉样式。

## Source Component Coverage

| Stable key | Source label and location | Business data and units | Interaction / state | Target component or renderer | Disposition |
| --- | --- | --- | --- | --- | --- |
| `opportunity-route` | 返回工作台 / 当前客户 | 当前商机上下文 | 返回工作台 | 顶部工作台页签与当前记录标题 | Equivalent rebuild |
| `opportunity-record` | CRM 原生商机项目详情 | 扫地机耐划伤结构件、负责人李经理、试样阶段、420万元 | 编辑、销售记录、更多 | `opportunity-record-card` | Equivalent rebuild |
| `opportunity-status` | 商机当前摘要 | 阶段标题、停留12天、最后跟进8天前、420万元、7天规则阈值 | 紧凑经营基本盘标题 + 四项语义指标卡 | `wb-compact-baseline-card` + `opportunity-status-card` | Equivalent rebuild |
| `opportunity-stage-preview` | 原型阶段状态预览 | 商务接触、试样、导入、量产、暂停、赢单、终止 | 点击与键盘切换 | `opp-stage-switch` | Equivalent rebuild |
| `opportunity-decisions` | 三个关键判断 | 客户与需求、技术与验证、商务与价值 | 随阶段切换 | `opp-decision-list` | Equivalent rebuild |
| `opportunity-primary-action` | 当前最重要动作 | 第3次试料客户测试反馈等阶段动作 | 处理、记录跟进 | `opp-primary-action` | Equivalent rebuild |
| `opportunity-secondary-actions` | 次级动作 | 测试周期、正式阶段任务负责人、报价空值说明 | 处理阶段任务、补充报价反馈 | `opp-secondary-actions` | Equivalent rebuild |
| `opportunity-evidence` | 关键证据 | E01-E14、11/14已形成 | 直接阅读 | `opp-evidence-grid` | Equivalent rebuild |
| `opportunity-trials` | 试料申请 | 3次、5个产品/料号、1次反馈待补 | 记录级阅读 | `opportunity-insight-trials` | Equivalent rebuild |
| `opportunity-quotes` | 报价申请 | 3张、5条明细、1条反馈待补、元/吨 | 记录级阅读 | `opportunity-insight-quotes` | Equivalent rebuild |
| `opportunity-competitors` | 竞争情况 | 2家、竞品与我方报价原值 | 横向滚动表格 | `opportunity-insight-competitors` | Equivalent rebuild |
| `opportunity-contacts` | 联系人覆盖 | 联系人池11人、项目关联2人 | 直接阅读 | `opportunity-insight-contacts` | Equivalent rebuild |
| `opportunity-win-review` | 商机赢单复盘 | 赢单后待形成复盘 | 仅赢单状态显示 | `opportunity-insight-win-review` | Equivalent rebuild |
| `opportunity-rule-help` | 标题与证据问号 | 对象、字段、过滤、边界 | 打开/关闭取数规则 | `opp-rule-modal` | Equivalent rebuild |

## 字段与状态

- 默认商机：扫地机耐划伤结构件
- 默认阶段：试样阶段
- 预计项目金额：420万元
- 阶段停留：12天
- 最近跟进：8天前
- 规则状态：已超过7天阈值，且最近7天无销售推进
- 关键证据：11/14已形成，1项部分形成，1项待补充，1项口径待确认

## 交互

- 阶段预览支持点击、左右方向键、Home、End，并同步判断、动作和赢单复盘显隐。
- 项目判断、关键证据、试料、报价、竞争和联系人均保留取数规则入口，支持关闭按钮与 Esc。
- CRM 原生动作、当前动作和次级动作统一使用 32px `.wb-compact-action`，并通过宿主 `showToast` 回调保留入口反馈。
- 页头“刷新洞察 / 打开 CRM”使用 `.wb-compact-action-group` 按内容宽度左右排列，不因标题或容器收缩上下堆叠。
- “预计项目金额”使用钱包语义 SVG，“报价申请”使用剪贴板语义 SVG；不再保留元、¥ 或货币代码轮廓式图标。
- 中英文由 `WorkbenchOpportunityInsight.applyLanguage` 切换；页面声明 `data-language-fixed`，避免宿主通用翻译器改写业务文本。
- 所有页面级块与辅助子面板在宿主画布中使用稳定网格键和卡片键注册。
- 当前阶段摘要复用 `.wb-compact-baseline-card`、`.wb-baseline-head-copy` 和共享 `.wb-metric`，保留四项事实并减少外层与指标内边距。

## 验证视口

- 1440x900
- 1024x768
- 390x844
- 浅色/深色、六套色系、中英文、丰富/简约、设置抽屉开关与页面横向溢出
