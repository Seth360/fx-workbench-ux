# 规范目录示例

`../../index.html` 是目录入口；本目录存放九个原有模板的组合样式、偏好状态和目录交互。共享文档外框、预览容器及主题职责位于 `../../components.css`、`../../tokens.css`。

- `card.css`：图表与列表组合、筛选示例分组、目录色系菜单。
- `preferences.js`：保留既有 `ai-workbench-ux-catalog` 存储键、六色系、中英文、深浅色及简约/丰富。
- `catalog.js`：按用途筛选、双语语义搜索、空结果、模板锚点、从预览 DOM 提取语义说明和复制结构。

复制结构是组件片段，需在宿主中引用公共 CSS、SVG sprite 和使用到的 select/chart 运行时。示例 AI/CRM 命令保留入口，但未连接业务服务，不会执行真实写入。
