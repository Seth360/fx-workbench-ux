# AI 识别诊断背景回归结果

版本：`ai-workbench-ux@1.6.2`

## 验证范围

- 144 个目录基础状态与 1296 个 AIPaaS 页面状态。
- 1440×900、1024×768、390×844。
- 中文/英文、浅色/深色、简约/丰富、六套色系。
- AI 识别诊断建议背景必须解析为 `linear-gradient`，并读取共享 `--wb-ai-insight-surface`。
- 页面、预览和注册网格无意外横向溢出。

## 结果

- `verification.json`：全部断言通过，浏览器错误为 0。
- `1440-aipaas-ai-insight.png`、`1024-aipaas-ai-insight.png`、`390-aipaas-ai-insight.png`：确认淡蓝到淡紫渐变、文本可读且无截断。
- `fxiaoke-workbench-canvas.html`：运行时与 standalone 孤立复制校验通过。
