# FX Workbench UX

`fx-workbench-ux` is a Codex skill for generating static, multi-tab Fxiaoke workbench HTML from prompts, documents, images, existing HTML, and Markdown.

The bundled `ai-workbench-ux@1.4.28` runtime preserves the canvas settings experience, including rich/minimal styles, spacing and radius controls, six palettes, dark mode, Chinese/English, editable grid order, save, export, reset, shared workspace routing, and standalone single-file delivery.

## Install

Clone the repository into the Codex skills directory:

```bash
git clone https://github.com/Seth360/fx-workbench-ux.git ~/.codex/skills/fx-workbench-ux
```

Start a new Codex task after installation, then invoke the skill with `$fx-workbench-ux`.

To update an existing installation:

```bash
git -C ~/.codex/skills/fx-workbench-ux pull --ff-only
```

See [SHARE_GUIDE.md](./SHARE_GUIDE.md) for the Chinese installation and usage guide, and [SKILL.md](./SKILL.md) for the complete generation contract.

## Included Runtime

- Standalone Fxiaoke workbench canvas
- Shared tokens and components
- Opportunity-project and customer-operating insight cards
- Composite select and chart interactions
- Cross-workspace routing
- Standalone canvas build and verification scripts

## Verify

Validate the bundled canvas runtime:

```bash
node scripts/verify_canvas_runtime.mjs assets/workbench-runtime/fxiaoke-workbench-canvas.html
```

Validate isolated single-file portability:

```bash
node assets/workbench-runtime/workbench-card-library/scripts/verify_standalone_canvas.mjs \
  assets/workbench-runtime/fxiaoke-workbench-canvas.html
```

Validate shared routing:

```bash
node assets/workbench-runtime/workbench-card-library/scripts/verify_workspace_routing.mjs
```
