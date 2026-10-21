# AIPaaS 基础组件来源覆盖

版本：`ai-workbench-ux@1.6.12`

| 导航页 | 来源证据 | 保留内容 | 组件落点 |
| --- | --- | --- | --- |
| 欢迎卡片 | 既有模板库头部卡片页 | 4 种标题到角色化工作台入口 | `.wb-aipaas-welcome-card` |
| AI 洞察 | 用户提供图 1、图 2 | 结论、规则边界、计数、置信度、诊断入口 | `.wb-aipaas-insight-brief`、`.wb-aipaas-recognition-grid` |
| 对象入口 | `crm-quick-entries` 注释卡片 + 用户布局/删除批注（2026-09-15） | 客户、项目商机、试料验证、报价管理、待办决策及原值；仅保留左右完整、左右名称型、上下名称型 3 种样式，删除上下完整型；名称型只显示图标和对象名称，上下名称型在宽目录容器中一行五个 | `.wb-object-entry-grid` + `.wb-object-entry-card` |
| 对象列表 | 4 处浏览器注释 | 重点商机、管理范围、今日待处理、销售线索的字段/值/操作 | `.wb-aipaas-table-card` + `.wb-table` |
| 文本 | 通用工作台文字规范 | H1/H2/H3、卡片标题、正文、辅助、标签、链接 | `.wb-aipaas-type-specimen` |
| 按钮 | 共享工作台动作合同 | 主、次、文字、危险、图标、禁用、加载、尺寸 | `.wb-aipaas-button-grid` |
| 图片 | `role-image/` | 8 个透明 PNG 文件名与角色映射 | `.wb-aipaas-role-grid` |
| AI Agent | `conversation.html` 对话框 + Figma `6456:55501` + 纷享销客 ShareAgent 截图 + 用户批注 1-4（2026-09-14） | `fx-avatar.png` 头像、24px/34px 400 字重欢迎语、浅灰蓝输入框、智能体、`Deepseek-V4-Flash`、附件、分隔线、语音、动态发送；批准删除建议问题区 | `.wb-aipaas-agent-card` + `.wb-agent-composer` |
| 主题色配置 | 用户批注 3/4 + 共享主题 Token | 6 色系、气质、行业推荐；独立导航、标题改名、靛青替换为鸢尾紫 | `.wb-aipaas-theme-grid` |
| 行业工作台示例 | 用户批注 5 | 通用工作台与沃德夫工作台入口，新窗口打开指定 HTML | `.wb-library-industry-link` |
| Rich Header 角色切换 | 用户批注 3 + `role-image/` + 画布 `roleVisuals` | 8 个真实角色、7 套服装色背景、图片校准尺寸、鼠标/键盘 Tab 切换 | `.wb-role-switcher` + `.wb-rich-header-card` |
| AI 识别建议背景 | 用户批注 1 | `rgba(79, 104, 255, 0.20)` 描边与指定 `96deg` 白色到淡蓝渐变，不使用默认黄色警告底 | `--wb-ai-insight-border` + `--wb-ai-insight-surface` + `.wb-aipaas-diagnosis` |
| 目录导航与局部布局 | 用户批注 1-7（2026-09-11）及通栏/行业理由批注（2026-09-11） | 复合卡片位于 AI Agent 下方；删除组件示例入口；介绍页不重复指标分组；指标页只保留该分组；指标卡和复合分析卡通栏；行业配色建议六行三列，色名带色块和推荐理由；文本标题可见图标；AI Agent 内边距和间距 20px | `.wb-library-sidebar-group`、`.wb-library-item.is-wide`、`.wb-palette-chip`、`.wb-aipaas-industry-recommend`、`.wb-icon`、`.wb-aipaas-agent-card` |

## 数据边界

- 来源中可辨识的业务值按原样保留；截图中无法可靠辨识的诊断句不补写为事实。
- 所有示例动作仅展示组件反馈，不改写 CRM 数据；实体值继续使用可聚焦入口。
- 对象列表在窄屏保留全部列，通过表格容器横向滚动，不删除字段。
