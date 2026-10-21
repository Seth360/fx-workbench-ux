# 目录布局回归 1.6.9

版本：`ai-workbench-ux@1.6.9`

本目录保存 2026-09-11 目录批注 1-7 的回归证据，覆盖：

- 模板用途导航只保留“介绍 / 主题色配置 / 指标与分析”。
- 复合卡片位于 AIPaaS 分组内 AI Agent 下方。
- 指标与分析视图只显示该分组，不残留首页介绍、统计或行业工作台示例。
- 主题色配置使用“行业配色建议”，六个行业纵向排列为六行。
- 文本标题左侧层级线图标具备实际可见图形。
- AI Agent 的外边距、标题间距、输入区内边距与上边距、工具栏间距及提示间距均为 `20px`。

执行命令：

```bash
WB_PLAYWRIGHT_MODULE=/Users/seth/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright node workbench-card-library/scripts/verify_catalog_layout.mjs workbench-card-library/qa/catalog-layout-20260911-v1.6.9
```

结果：144 个首页状态、144 个复合卡片状态、144 个主题色配置状态和 1152 个 AIPaaS 页面状态通过；三档视口、中英文、浅色/深色、简约/丰富和六套主题均无页面或组件溢出。
