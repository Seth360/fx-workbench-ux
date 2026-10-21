# 目录布局回归 1.6.10

版本：`ai-workbench-ux@1.6.10`

本轮验证覆盖以下浏览器批注：

- `02.01 指标卡片`在独立“指标与分析”视图中占满内容栏。
- `02.02 复合分析卡片`在“复合卡片”视图中占满内容栏。
- “介绍”视图不再重复展示“指标与分析”分组。
- “行业配色建议”保留六个行业，增加“推荐理由”列，并为七个配色名称显示共享 Token 色块。

运行命令：

```bash
WB_PLAYWRIGHT_MODULE=/Users/seth/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright \
node workbench-card-library/scripts/verify_catalog_layout.mjs \
workbench-card-library/qa/catalog-layout-20260911-v1.6.10
```

`verification.json` 记录 144 个目录状态、144 个复合卡片状态、144 个主题色配置状态和 1152 个 AIPaaS 页面状态；全部错误数组为空。PNG 截图覆盖 1440×900、1024×768、390×844 的指标页、复合卡片页、主题页、深色英文首页和八个 AIPaaS 页面。
