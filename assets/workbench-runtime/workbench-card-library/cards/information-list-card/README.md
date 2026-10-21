# 信息列表卡片

规范版本：`ai-workbench-ux@1.6.35`。

`index.html#aipaas-information-list` 以 01/02/03 编号连续展示待办、提醒、关注三个示例，三张卡共用标题、可选来源总数、条目列表和“查看全部”结构，不使用页签；关注截图没有总数，卡片不生成数量节点。右侧时间、状态和对象类型统一使用共享 `.wb-status-tag`：今天用主题强调色提示，偏移和报价临期用风险色，其他时间与对象类型用中性胶囊。业务行和底部操作只给出目录现有的未接服务演示反馈。

样式职责位于共享 `tokens.css`、`components.css`；本目录的 `card.css` 只组织示例容器，`card.js` 只同步字段元数据的双语标签。来源字段与数量见 `../aipaas-foundations/source-component-coverage.md`。

- 1.6.35（2026-10-19）：信息列表页追加第05例空数据状态，页面计数为2个组件、5个示例。复用 .wb-info-list-card 标题和 .wb-empty.wb-info-list-empty，使用40px无底板、无阴影的线框收件托盘SVG和“暂无数据 / No data yet”；不显示0数量、记录行或无效操作入口。保留record-count=0字段与role=status，图示aria-hidden，尺寸/间距/颜色来自共享Token，支持双语、六色系、浅深色及容器响应式。原01–04示例与业务数据不变。
