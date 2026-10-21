# AIPaaS AI Agent 对话框回归 1.6.12

版本：`ai-workbench-ux@1.6.12`

## 回归范围

- 依据纷享销客 ShareAgent 浏览器截图，将 AIPaaS AI Agent 输入框调整为浅灰蓝双层结构、160px 最小高度、20px 圆角和当前主题强调色焦点描边。
- 工具栏保留智能体、`Deepseek-V4-Flash`、附件、分隔线、语音和发送动作；空值发送禁用，输入非空后启用。
- 从 DOM 删除“试试这些问题”及三个建议按钮。
- 欢迎语调整为 24px/34px、字重 400；`fx-avatar.png` 保持为真实头像资源。
- 组件容器不足 380px 时，选择器组与动作组分成两行，完整保留模型名称。

## 验证

```bash
WB_PLAYWRIGHT_MODULE=/Users/seth/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright \
node workbench-card-library/scripts/verify_catalog_layout.mjs \
  workbench-card-library/qa/catalog-agent-20260914-v1.6.12
```

验证结果：144 个目录状态、144 个复合卡片状态、144 个主题色配置状态和 1152 个 AIPaaS 页面状态全部通过，覆盖 1440×900、1024×768、390×844、中英文、浅色/深色、简约/丰富和六色系。`verification.json` 中错误数组为空；三档 `*-aipaas-agent.png` 均无页面或组件横向溢出。另通过 `http://127.0.0.1:8765/workbench-card-library/index.html#aipaas-agent` 检查桌面浅色聚焦态与深色态。
