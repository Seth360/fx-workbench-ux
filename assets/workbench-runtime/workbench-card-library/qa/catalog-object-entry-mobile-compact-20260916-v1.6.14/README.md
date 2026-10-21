# 移动端对象入口精简模式回归 1.6.14

- 规范版本：`ai-workbench-ux@1.6.14`
- 页面：`workbench-card-library/index.html#aipaas-object-entry`
- 反馈：在既有 390px 移动端完整模式旁增加精简模式；精简入口只展示图标和对象名称。
- 数据：客户、项目商机、试料验证、报价管理、待办决策五个对象及原显式路由保持不变。
- 结构：正式变体仍为左右完整、左右名称型、上下名称型三种；移动端展示不计入正式变体数量，并包含 `full` 与 `compact` 两个独立单列网格。
- 精简合同：五个精简入口均为原生 `button`；每项只有一个语义 SVG 与一个对象名称节点，没有场景说明、数字或字段值节点；客户与项目商机继续保留显式路由。

## 自动化结果

运行命令：

```bash
WB_PLAYWRIGHT_MODULE=/Users/seth/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright \
  /Users/seth/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  workbench-card-library/scripts/verify_catalog_layout.mjs \
  workbench-card-library/qa/catalog-object-entry-mobile-compact-20260916-v1.6.14
```

- 目录状态：144
- 复合卡片状态：144
- 主题色配置状态：144
- AIPaaS 页面状态：1152
- 视口：`1440x900`、`1024x768`、`390x844`
- 状态维度：中文/英文、浅色/深色、简约/丰富、六套色系
- 页面和组件横向溢出：0
- `verification.json.errors`：空数组

## 视觉证据

- `1440-aipaas-object-entry.png`：完整与精简移动模式并列展示。
- `1024-aipaas-object-entry.png`：两种移动模式在可用内容宽度不足时纵向堆叠。
- `390-aipaas-object-entry.png`：两种移动模式保持 390px 页面内单列，无文本、图标或卡片重叠。

人工检查确认精简模式五项均不显示场景说明和数字，完整模式继续保留全部信息；报价管理在正式变体与两个移动模式中均使用可见的 `#icon-clipboard`。
