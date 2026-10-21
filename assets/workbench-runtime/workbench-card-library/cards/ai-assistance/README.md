# AI待协助

规范版本：`ai-workbench-ux@1.6.34`。

目录入口：`index.html#aipaas-information-list` 第04例，语义为 `ai-assistance -> ai-assistance-list`。共享外观位于 `tokens.css` / `components.css`；本目录CSS只限定预览宽度。

只渲染未处理通知，已处理示例和筛选按钮/分组/类别文字全部从DOM删除。标题右侧仅保留一个共享信息列表样式的加粗数量，字段为 `pending-count`；0时隐藏，空队列显示“暂无需要你处理的AI通知”。运行时监听列表增删与记录状态变化，移除非pending记录并同步数量和空状态。

保留事项、来源对话、Agent名称浅色标签、标题前橙点、共享分隔线、32px强调色实底“去处理”按钮、双语ARIA和稳定字段元数据；协助类型仅保留隐藏字段。未接服务时只显示目录演示反馈，不模拟授权、批复或处理成功。

示例明确标注演示数据：确认客户拜访重点、完成企业ERP授权来自用户需求，对话名称及Agent名称用于展示结构。

验证命令：`WB_PLAYWRIGHT_MODULE=<playwright module path> node workbench-card-library/cards/ai-assistance/verify.mjs`。本次专项192个布局状态及完整目录1728个状态全部通过，脚本错误0；覆盖三个指定尺寸及658px宽度、六色系、中英文、浅深色与丰富/简约，四个尺寸代表截图已检查。报告：`qa/ai-assistance-20261019-v1634/report.json`、`qa/catalog-ai-assistance-20261019-v1634/verification.json`。
