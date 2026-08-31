# FX Workbench UX 分享指南

`fx-workbench-ux` 用于将提示词、文档、图片、现有 HTML 或 Markdown 转成可直接打开的多页签工作台 HTML。输出会保留右侧画布设置：丰富/简约、间距、圆角、六套色彩主题、深色模式、中英文、布局拖拽、保存、导出和重置。

## 安装

1. 解压 `fx-workbench-ux.zip`。
2. 将解压后的 `fx-workbench-ux` 文件夹复制到本机 Codex 的 `~/.codex/skills/` 目录。
3. 新开一个 Codex 任务；在技能列表中确认可以看到 `FX Workbench UX`。

## 使用

在请求开头写 `$fx-workbench-ux`，然后说明需要生成的工作台、页签顺序和来源材料。可以直接附加 Word、PDF、图片、HTML 或 Markdown。

```text
使用 $fx-workbench-ux 生成以下工作台：

1. 公司经营工作台
2. 我的管理范围工作台

页签顺序与上面一致。根据附件中的业务数据生成页面，保留其中的指标、单位、筛选条件和操作入口；不要编造缺失数据。输出到 ./generated-workbench/，文件名为 operating-workbench.html。
```

每个明确要求的工作台对应一个顶栏页签。上例只会生成“公司经营”和“我的管理范围”两个页签；不会额外增加模板库或示例页签。

## 输出与检查

技能会把内置画布运行时与卡片库复制到输出目录，并在根目录生成 HTML，因此结果无需服务器即可打开。生成完成后，打开右上角设置图标，检查主题、语言、保存、导出、重置和布局拖拽。

可在技能目录执行以下命令检查生成页面的关键运行时能力和资源路径：

```bash
node scripts/verify_canvas_runtime.mjs /absolute/path/to/generated-workbench/operating-workbench.html
```

默认应额外检查 `1440x900`、`1024x768`、`390x844`，并分别验证设置抽屉关闭和打开时的布局。
