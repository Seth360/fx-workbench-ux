# Source Component Coverage Inventory

Use this table before building any workbench from a supplied HTML page, screenshot, document, or prototype. One row represents one visible source capability, not merely one visual card.

| Stable key | Source label and location | Business data and units | Interaction / state | Target component or renderer | Disposition |
| --- | --- | --- | --- | --- | --- |
| `header-scope` | Header scope selector | Current user or team | Opens enumeration filter | `wb-select wb-page-filter` | Reused |
| `header-ai-entry` | Header AI entry | Placeholder or source prompt | Submit / open agent | Source-backed AI entry adapter | Equivalent rebuild |
| `header-search` | Global search | Source query placeholder | Submit / open search result | Global search adapter | Equivalent rebuild |
| `transaction-progress` | Contract to collection lifecycle | Stage, count, facts, status | Stage drill-down | `wb-transaction-progress` | Reused |

`Disposition` must be exactly one of:

- `Reused`: the original renderer or shared component remains in use.
- `Equivalent rebuild`: the output uses a different component structure but preserves all source data, user-visible state, and interaction.
- `User-approved omission`: the user explicitly agreed this source capability is not an output requirement. Record that approval in the delivery report.

## Completion Gate

Before delivery, compare the rendered output against the source and require a row for every visible component that has business meaning or a user action. A component may move, combine with a parent container, or change visual treatment, but it cannot disappear. For a combined container, keep one row per contained source capability and state where it is rendered.

Do not use `User-approved omission` for an item simply because its source values are sparse, the component is hard to restyle, or another metric seems similar.
