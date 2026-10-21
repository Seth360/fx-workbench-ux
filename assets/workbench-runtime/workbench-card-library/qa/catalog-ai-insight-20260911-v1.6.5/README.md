# AI 识别诊断背景回归结果

版本：`ai-workbench-ux@1.6.5`

## 验证范围

- 1440x900、1024x768、390x844。
- 中文/英文、浅色/深色、简约/丰富、六套色系。
- 144 个目录状态与 1296 个 AIPaaS 页面状态。
- AI 识别建议背景精确断言 `linear-gradient(96deg, #FFFFFF 0.58%, #EBF2FF 102.07%)` 与 `1px solid rgba(79, 104, 255, 0.2)`。
- 页面、卡片、预览和注册网格无意外横向溢出。

## 结果

- `verification.json`：全部断言通过，浏览器错误为 0。
- `*-aipaas-ai-insight.png`：确认三档视口下的浅色背景、文本可读性与卡片边界。
- `*-dark-en.png`：确认深色英文目录状态。
- 同版本 runtime、standalone 孤立复制和工作区路由校验均通过。
