# FX Workbench UX 分享指南

`fx-workbench-ux` 用于将提示词、文档、图片、现有 HTML 或 Markdown 转成可直接打开的多页签工作台 HTML。输出会保留右侧画布设置：丰富/简约、间距、圆角、六套色彩主题、深色模式、中英文、布局拖拽、卡片隐藏/全部还原、保存、导出和重置。

当前规范版本为 `ai-workbench-ux@1.4.32`。分享时必须发送完整 ZIP（包含 `assets/workbench-runtime/`、`references/regression-feedback.md` 和验证脚本），不能只发送 `SKILL.md`；设置抽屉的顶栏、隐藏/还原和保存能力都来自 bundled runtime。

## 安装

1. 解压最新的 `fx-workbench-ux-<date>.zip`。
2. 将解压后的 `fx-workbench-ux` 文件夹复制到本机 Codex 的 `~/.codex/skills/` 目录。
3. 新开一个 Codex 任务；在技能列表中确认可以看到 `FX Workbench UX`。

## 使用

在请求开头写 `$fx-workbench-ux`，然后说明需要生成的工作台、页签顺序和来源材料。可以直接附加 Word、PDF、图片、HTML 或 Markdown。

直接说“按照 Skill 美化一下这个 HTML”“优化这个页面”或“调整成工作台风格”也会进入完整重生成模式：现有 HTML 用于提取业务事实与交互，结果从 bundled canvas 按规范结构重新生成，不是在旧页面上追加一层 CSS。只有明确要求保留 DOM、只修指定问题或最小改动时，才执行增量编辑。

```text
使用 $fx-workbench-ux 生成以下工作台：

1. 公司经营工作台
2. 我的管理范围工作台

页签顺序与上面一致。根据附件中的业务数据生成页面，保留其中的指标、单位、筛选条件和操作入口；不要编造缺失数据。输出到 ./generated-workbench/，文件名为 operating-workbench.html。
```

每个明确要求的工作台对应一个顶栏页签。上例只会生成“公司经营”和“我的管理范围”两个页签；不会额外增加模板库或示例页签。

## 输出与检查

技能会把内置画布运行时与卡片库复制到输出目录，并在根目录生成 HTML，因此结果无需服务器即可打开。生成完成后，打开右上角设置图标，检查主题、语言、保存、导出、重置、四方向布局拖拽，以及卡片隐藏计数和全部还原。

可在技能目录执行以下命令检查生成页面的关键运行时能力和资源路径：

```bash
node scripts/verify_canvas_runtime.mjs /absolute/path/to/generated-workbench/operating-workbench.html
```

默认应额外检查 `1440x900`、`1024x768`、`390x844`，并分别验证设置抽屉关闭和打开时的布局。

收到“生成后 UI 有问题”的 HTML 或截图时，按 [regression-feedback.md](references/regression-feedback.md) 记录 DOM/CSS 证据并区分 runtime、共享组件、页面适配和数据问题；不要把单页私有修补直接当作 Skill 规范。
