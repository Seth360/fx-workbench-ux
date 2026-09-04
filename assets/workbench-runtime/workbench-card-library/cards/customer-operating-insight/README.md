# 客户经营洞察

## 业务来源

来源页面：经营工作台多角色双端原型中 `main#insight-page` 的“苏州精密注塑有限公司”客户详情。工作台版本保留源业务事实、单位和操作入口，并按 `ai-workbench-ux@1.5.7` 重组为可编辑画布页签。

## Source Component Coverage

| Stable key | Source label and location | Business data and units | Interaction / state | Target component or renderer | Disposition |
| --- | --- | --- | --- | --- | --- |
| `customer-record` | CRM原生客户详情 | 苏州精密注塑有限公司、李经理、客户级别A、华东 | 编辑、销售记录、更多 | `customer-record-card` | Equivalent rebuild |
| `customer-profile-identity` | 重复客户身份摘要 | 终端客户/品牌商、家电家居、华东、负责人李经理 | 无独立交互；上方 CRM 原生客户详情已呈现同一身份 | 不重复渲染 | User-approved omission |
| `customer-profile` | 客户档案指标 | 客户级别A、信用等级A | 指标下钻 | `wb-summary-metric-grid` | Equivalent rebuild |
| `customer-projects` | 有效项目 | 3个、预计金额680万元 | 打开项目列表 | `customer-metric-grid` | Equivalent rebuild |
| `customer-trial-rate` | 试料通过率 | 67%、4次通过/6次有结论 | 打开试料明细 | `customer-metric-grid` | Equivalent rebuild |
| `customer-mainline` | 客户经营主线 | 商机3个、试料6次、报价4份 | 各节点下钻 | `customer-mainline-flow` | Equivalent rebuild |
| `customer-industry-relation` | 产业链位置与上下游关系 | 上游终端客户/品牌商、3个下游交易客户关系 | 关系明细 | `wb-relation-flow` | Equivalent rebuild |
| `customer-contact-coverage` | 联系人关系覆盖 | 王总、陈经理、刘工、赵工及最近跟进 | 联系人明细 | `customer-contact-card` | Equivalent rebuild |
| `customer-wallet-share` | 客户钱包份额（区间） | 上限46%、210吨/年、250吨/年、1000吨以上 | 图表Tooltip、份额依据 | `customer-wallet-card` | Equivalent rebuild |
| `customer-trial-results` | 客户试料结果结构 | 成功4次、失败2次、测试中/无结论1次 | 结果下钻 | `customer-trial-card` | Equivalent rebuild |
| `customer-project-momentum` | 重点项目动量 | 3个项目、阶段、金额、状态 | 项目下钻 | `customer-project-card` | Equivalent rebuild |
| `customer-recent-activity` | 近期客户互动 | 3条销售记录与日期 | 销售记录下钻 | `customer-activity-card` | Equivalent rebuild |

## 交互与实现

- 该卡片属于二级客户详情页，使用 `.wb-secondary-page` 不渲染一级工作区专用的页面级富页头；按既有身份去重规则从首个客户业务指标卡开始，记录内的编辑、销售记录、更多等操作保持不变。

- 客户档案、经营主线、项目、互动和 CRM 原生动作通过宿主 `showToast` 保留交互入口。
- 钱包份额使用共享 `.wb-donut-chart`、`chart-interactions.js`、键盘 focus、共享 Tooltip 和 reduced-motion 降级。
- 中英文由 `WorkbenchCustomerInsight.applyLanguage` 切换，并同步图表和导航的可访问名称。
- 页面级区块和六张分析卡在宿主画布中使用稳定网格键、卡片键、编辑范围和归属字段。
- 产业链关系省略冗余的可见“上游/下游”标签，但两层保留中英文 `aria-label`；三分支共享连线从首节点中心延伸到末节点中心，并连接全部三个下游节点。
- 钱包份额与试料结果按共享 5/12 + 7/12 跨度并排；详情记录卡内的编辑、销售记录和更多操作使用 32px 紧凑动作样式。

## 验证视口

- 1440x900
- 1024x768
- 390x844
- 浅色/深色、六套色系、中英文、丰富/简约、设置抽屉开关与页面横向溢出
