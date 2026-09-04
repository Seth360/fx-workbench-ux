# Workbench Semantic Component Contract

Read the bundled normative contract at `../assets/workbench-runtime/workbench-card-library/SEMANTIC_COMPONENTS.md` whenever a source or prompt contains filters, AI entry points, search, stage progress, KPI summaries, business lists, or tables.

The contract defines the required `data-wb-semantic` to `data-wb-component` mapping, ARIA requirements, field metadata, shared classes, theme behavior, and validation gates. Treat a semantic match as a component-reuse decision, not as a styling hint. Preserve source values, units, options, events, ordering, and routes while applying the mapped shared component.

Page-level hierarchy is also semantic: `.wb-header.wb-rich-header-card` belongs to top-level workspaces only. Customer/opportunity detail pages, list pages, and other drill-down secondary pages use `.wb-secondary-page`, omit page-level `wb-header` markup, and begin with their record, first business metric, or list card. The shared `.wb-secondary-page > .wb-header` rule is a regression guard; it does not hide card-level `.wb-flush-head` elements or remove detail actions, breadcrumbs, fields, or business facts.
