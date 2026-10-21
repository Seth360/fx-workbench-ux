# 目录批注来源覆盖 1.6.10

版本：`ai-workbench-ux@1.6.10`

| 批注 | 来源目标 | 保留内容 | 实现与验证 |
| --- | --- | --- | --- |
| 1 | `#metric-card-example` | 经营基本盘标题、口径、4 个指标、数字/单位、CRM 下钻与语义元数据 | 保留唯一 DOM，增加 `.is-wide`；验证示例宽度等于 `catalog-insights` 网格宽度 |
| 2 | `.wb-aipaas-industry-recommend` | 6 个行业与原推荐色系 | 增加行业/推荐配色/推荐理由三列，7 个色名使用 `.wb-palette-chip` 与共享六色强调 Token；移动端理由落到第二行 |
| 3 | 介绍页中的 `data-library-section="insights"` | 指标示例仍从专属导航访问 | `group === 'all'` 只展示介绍组件分组；指标页继续显示唯一 `#metric-card-example`，锚点直接进入指标页 |
| 4 | `#analysis-card-example` | 两组行业阶段金额、环图、事实指标、Tooltip/键盘交互 | 保留唯一 DOM，增加 `.is-wide`；验证示例宽度等于 `catalog-composite` 网格宽度 |

本轮未删除或改写业务数据、单位、筛选、图表分段、ARIA、稳定字段键或原有交互。
