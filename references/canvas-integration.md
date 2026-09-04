# Canvas Integration Contract

## Canonical Runtime

The bundled `assets/workbench-runtime/fxiaoke-workbench-canvas.html` is the canonical standalone canvas runtime. It contains both the visible canvas shell and the behavior behind the current right-side `#canvasSettings` panel. Treat the implementation as one runtime even though the panel markup is inlined rather than stored as a separate file.

The generated HTML must preserve these elements and their live behavior:

| Capability | Required baseline contract |
| --- | --- |
| Canvas shell | `#canvasApp`, `.canvas-toolbar.workspace-tabs`, `#canvasBoard`, and a trailing `#canvasSettingsOpen` control |
| Generated navigation | `.wb-workspace-tab-list` entries with `data-canvas-workspace`, matching `data-canvas-panel` panels, ARIA tab semantics, and arrow/Home/End navigation; this top list remains the sole page switcher while settings are open |
| Settings | `#canvasSettings`, rich/minimal style options, spacing/radius sliders, six theme buttons, a Header card section below Color theme with the shared role-image composite dropdown in rich style, dark-mode toggle, Chinese/English tabs, Export pages, and Reset; it must not duplicate the top-level workspace tabs or retain the legacy Save/config-export controls |
| Configuration | `#canvasSavedConfiguration` for embedded initial configuration, persisted `roleImage`, `hiddenCards` plus `hiddenCardState`, and local persistence for the editable canvas |
| Page export | `#canvasExportPage` traverses top-level workspaces and writes one self-contained HTML per visible tab label. Each output contains exactly one main-board panel and excludes the workspace toolbar, settings drawer, CRM shell, other panels, edit affordances, and hidden cards while preserving current theme/language/layout/content |
| Edit mode | Opening settings sets `editing: true`; closing it clears editing; stable page and nested-card keys restore order, span, and cross-grid ownership; opaque accent drag guides and contained resize handles remain visible |
| Card visibility | `#canvasCardHide` exposes one semantic hide action for the hovered/focused card; `#canvasHiddenBar` counts hidden cards only on the workspace selected in the top tab list and `#canvasRestoreHidden` restores only that page while all hidden keys remain persisted |
| Library behavior | `tokens.css`, `components.css`, `select-interactions.js`, and `chart-interactions.js` are linked with paths valid from the output HTML; an open composite select releases page-control overflow clipping until close |
| Semantic components | Every recognized control/card follows `workbench-card-library/SEMANTIC_COMPONENTS.md`: exact `data-wb-semantic`/`data-wb-component` mapping, accessible name, and field-level metadata |
| Theme binding | The canvas root stores the six-color palette in `data-color-theme` and stores only `light` or `dark` in `data-theme`; shared dark Surface/Table/Control tokens must activate in dark mode |
| Rich page header | `.wb-header.wb-rich-header-card` uses the 220px layout with title/description at top-left, controls at bottom-left, and a bottom-aligned `.wb-rich-header-role` whose visible head is calibrated 26px above the desktop card. Eight assets map to seven clothing-color pale gradients and switch together; minimal style removes the card Surface and image. The files in `workbench-card-library/role-image/` must be embedded in `#canvasRoleImageAssets` for standalone switching, with `总监.png` as the reset default |
| Secondary page hierarchy | Customer/opportunity detail, list, and other drill-down pages use `.wb-secondary-page` and omit page-level `.wb-header`; the first visible block is the record, first business metric, or list card. The shared direct-child header rule is a regression guard and does not hide card-level `.wb-flush-head` or remove detail actions and fields. |

Do not replace these mechanisms with a separate React app, a simplified static panel, or a localStorage-only implementation.

## Allowed Content Changes

Adapt the generated output by changing the document title, visible generated tab list, matching panels, business data, source-backed interactions, localization entries, and card registration/default-layout data. Keep the canvas settings selectors and state shape compatible with the baseline.

Before writing page-private markup, classify reporting periods, people/department and date selectors, AI entry/summary, global/list search, enum filters, stage progressors, KPI cards, business lists, and tables using `references/semantic-components.md`. A match is a mandatory shared-component reuse decision, not an optional visual hint. Preserve the source values, units, options, events, ordering, field identities, and routes inside the mapped component.

The baseline contains example workspaces. They are source material, not a mandatory output shape. A generated page with two requested workbenches must show two top-level tabs, not two generated tabs plus the baseline examples.

## Regenerating Supplied HTML

When the user broadly asks to beautify, optimize, restyle, improve, or adapt a supplied HTML according to this Skill, treat the request as full regeneration even if the wording does not explicitly say "rebuild". The supplied file is evidence for the coverage inventory, not the default implementation base.

Build a new complete document from the bundled runtime, replace its example workspace inventory with the source-backed inventory, and reconstruct retained cards and interactions through shared components or adapters. Do not append a page-level override stylesheet to the supplied file, keep a defective or incomplete settings runtime because it already exists, or deliver only a visual patch.

This interpretation changes only when the user explicitly requests a bounded edit that preserves the current implementation, such as fixing one named defect or retaining the existing DOM. A full regeneration must still preserve all source business facts and interactions or record an explicitly approved omission.

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
