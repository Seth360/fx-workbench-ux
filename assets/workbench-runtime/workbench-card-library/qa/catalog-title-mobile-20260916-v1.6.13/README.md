# 一级标题、移动端对象入口与报价图标回归 1.6.13

- 规范版本：`ai-workbench-ux@1.6.13`
- 日期：2026-09-16
- 页面：`workbench-card-library/index.html`
- 反馈：复合卡片与对象列表移除一级标题图标；对象入口补充移动端适配展示；报价管理补充可见语义图标。

## 验证命令

```bash
WB_PLAYWRIGHT_MODULE=/Users/seth/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright \
/Users/seth/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
workbench-card-library/scripts/verify_catalog_layout.mjs \
workbench-card-library/qa/catalog-title-mobile-20260916-v1.6.13
```

## 结果

- 144 个目录状态通过。
- 144 个复合卡片状态通过。
- 144 个主题色配置状态通过。
- 1152 个 AIPaaS 页面状态通过。
- `verification.json.errors` 为空。
- 三个复合卡片一级标题和对象列表卡片一级标题均无装饰图标、无空图标列；内部子面板图标保留。
- 对象入口正式变体仍为 3 种，每种 5 个入口；独立 390px 移动端展示为 1 列 5 行。
- 报价管理在三种正式变体与移动端展示中均使用 `#icon-clipboard`，图标宽度非 0。
- 1440×900、1024×768、390×844 截图人工检查无页面横向溢出、文字截断或卡片重叠。
