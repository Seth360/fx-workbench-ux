# 来源覆盖与验收清单

来源：改造前 workbench-card-library/index.html。范围：规范目录与共享组件，保留九个模板。

| 原稳定键 | 分组 | 保留内容 | 处理 |
| --- | --- | --- | --- |
| rich-header-card-example | 基础框架 | 标题、角色图、更新时间、周期、地区 | reused |
| workspace-tabs-example | 基础框架 | 四个示例页签、键盘导航、设置命令 | reused |
| select-control-example | 基础框架 | 周期、五个管理单元、日期、商机类型、两级命令、边界说明 | equivalently rebuilt：两个有标签的控件组 |
| metric-card-example | 指标与分析 | 36、6703.5 万元、13 个在途商机、3 项、76%及全部口径 | reused：实际容器降列与语义色修正 |
| analysis-card-example | 指标与分析 | 两个行业分段金额、结果 6/2/1、78%、暂停原因缺失 1 项 | reused：补充同序图例 |
| composite-hierarchy-example | 指标与分析 | 三个子面板、5/3、68%/72%/67%/59%、三分支关系 | reused |
| ai-search-example | 业务协同 | AI 简报、诊断命令、输入与发送、全局及列表搜索示例 | reused |
| density-components-example | 业务协同 | 21/18/9 快捷入口、新建、5/3 阶段及520/380万元、紧凑行、待处理项 | reused |
| risk-table-example | 业务协同 | 两行原始数据、六列字段、分组、负责人、处理、条数说明 | reused |

源风险表声明“共3条”，但实际只提供2行；保留源字段及口径，不补造第三行。目录内 AI/CRM 命令原未接业务服务，现明确反馈组件示例边界，不模拟业务成功。

验收：三档视口 × 双语 × 深浅主题 × 两种风格 × 六色系共144种状态；页面、卡片、预览与注册网格溢出；32px控件；语义根和字段；并排预览等高；分类、搜索、空结果恢复；代码复制；窄屏英文浮层、change、键盘与外部关闭；图表焦点提示；物理重载偏好保持。
