# Canvas Integration Contract

## Canonical Runtime

The bundled `assets/workbench-runtime/fxiaoke-workbench-canvas.html` is the canonical standalone canvas runtime. It contains both the visible canvas shell and the behavior behind the current right-side `#canvasSettings` panel. Treat the implementation as one runtime even though the panel markup is inlined rather than stored as a separate file.

The generated HTML must preserve these elements and their live behavior:

| Capability | Required baseline contract |
| --- | --- |
| Canvas shell | `#canvasApp`, `.canvas-toolbar.workspace-tabs`, `#canvasBoard`, and a trailing `#canvasSettingsOpen` control |
| Generated navigation | `.wb-workspace-tab-list` entries with `data-canvas-workspace`, matching `data-canvas-panel` panels, ARIA tab semantics, and arrow/Home/End navigation |
| Settings | `#canvasSettings`, rich/minimal style options, spacing/radius sliders, six theme buttons, dark-mode toggle, Chinese/English tabs, Save, Export, Reset |
| Configuration | `#canvasSavedConfiguration`, embedded configuration loading, local persistence as an optional cache, and Save's HTML-writing or downloaded-HTML fallback |
| Edit mode | Opening settings sets `editing: true`; closing it clears editing; stable page and nested-card keys restore order, span, and cross-grid ownership |
| Library behavior | `tokens.css`, `components.css`, `select-interactions.js`, and `chart-interactions.js` are linked with paths valid from the output HTML |

Do not replace these mechanisms with a separate React app, a simplified static panel, or a localStorage-only implementation.

## Allowed Content Changes

Adapt the generated output by changing the document title, visible generated tab list, matching panels, business data, source-backed interactions, localization entries, and card registration/default-layout data. Keep the canvas settings selectors and state shape compatible with the baseline.

The baseline contains example workspaces. They are source material, not a mandatory output shape. A generated page with two requested workbenches must show two top-level tabs, not two generated tabs plus the baseline examples.

## Stable Key Pattern

Choose human-readable keys that cannot collide across generated pages:

```text
workspace key: company-operations
page grid key: company-operations-main
page edit scope: company-operations
card key: company-operations-operating-baseline
```

Nested grids remain inside the same workspace edit scope but need their own grid keys. Keep `data-wb-default-grid` unchanged as the reset destination and persist `data-wb-card-grid` as the current destination. Never move a card across a workspace scope or into its own descendant grid.

## Page Inventory Example

For the request "生成公司经营工作台和我的管理范围工作台":

| Display label | Workspace key | Tab source |
| --- | --- | --- |
| 公司经营 | `company-operations` | Explicit request |
| 我的管理范围 | `management-scope` | Explicit request |

This inventory produces exactly two tabs. It does not add "模板库" because that label was not requested.

## Output Boundaries

- Create a new output directory by default. Copy the bundled `workbench-runtime` contents into it, then create the generated HTML at that directory's root so its relative library links remain valid. Do not overwrite either the bundled baseline or a user file without explicit permission.
- A card's canonical source belongs in the copied `workbench-card-library/cards/<card-name>/`; its use in the output must be traceable to that source or a shared renderer.
- Do not embed assets or icons made from visible text. Use the canvas's existing SVG sprite or an approved semantic icon library.
- When paths to library assets would be invalid from the selected output folder, either adjust the relative paths or keep the generated file in a location where the library remains reachable. Verify this before delivery.
