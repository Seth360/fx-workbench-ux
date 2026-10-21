#!/usr/bin/env node

import { readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const target = process.argv[2];

if (!target) {
  console.error("Usage: node verify_canvas_runtime.mjs <generated-html>");
  process.exit(2);
}

const absoluteTarget = path.resolve(target);
let html;

try {
  html = await readFile(absoluteTarget, "utf8");
} catch (error) {
  console.error(`Unable to read ${absoluteTarget}: ${error.message}`);
  process.exit(2);
}

const errors = [];
const warnings = [];
const requireText = (needle, label = needle) => {
  if (!html.includes(needle)) errors.push(`Missing ${label}`);
};

const requireAnyText = (needles, label) => {
  if (!needles.some((needle) => html.includes(needle))) errors.push(`Missing ${label}`);
};

[
  ["id=\"canvasSettings\"", "#canvasSettings"],
  ["id=\"canvasSettingsOpen\"", "#canvasSettingsOpen"],
  ["id=\"canvasExportPage\"", "page-export control"],
  ["id=\"canvasReset\"", "Reset control"],
  ["id=\"canvasCardHide\"", "card hide control"],
  ["id=\"canvasHiddenBar\"", "hidden-card status capsule"],
  ["id=\"canvasRestoreHidden\"", "restore-all-hidden control"],
  ["restoreCurrentPageHiddenCards", "page-scoped hidden-card restore"],
  [".canvas-root.edit-mode [data-canvas-panel][hidden]", "edit-mode hidden-page precedence"],
  ["id=\"canvasSavedConfiguration\"", "embedded configuration"],
  ["data-canvas-style=\"minimal\"", "minimal style option"],
  ["data-canvas-style=\"rich\"", "rich style option"],
  ["id=\"canvasSpacing\"", "spacing slider"],
  ["id=\"canvasRadius\"", "radius slider"],
  ["id=\"canvasDarkMode\"", "dark-mode toggle"],
  ["data-canvas-language=\"zh\"", "Chinese language option"],
  ["data-canvas-language=\"en\"", "English language option"],
  ["data-canvas-theme=\"classic\"", "classic theme"],
  ["data-canvas-theme=\"spruce\"", "spruce theme"],
  ["data-canvas-theme=\"coral\"", "coral theme"],
  ["data-canvas-theme=\"iris\"", "iris theme"],
  ["data-canvas-theme=\"rose\"", "rose theme"],
  ["data-canvas-theme=\"graphite\"", "graphite theme"],
  ["id=\"canvasHeaderCardSettings\"", "Header card settings section"],
  ["id=\"canvasRoleImage\"", "role-image composite select"],
  ["id=\"canvasRoleImageAssets\"", "embedded role-image asset payload"],
  ["wb-rich-header-card", "shared rich page-header card"],
  ["wb-rich-header-role", "rich page-header role image"],
  ["wb-secondary-page", "secondary-page wrapper contract"],
  ["--wb-secondary-page-header-display", "secondary-page header guard token"],
  ["--wb-rich-header-role-overhang", "rich-header role overhang token"],
  ["--wb-rich-header-role-gradient-from", "role-matched rich-header gradient"],
  ["roleVisuals", "role visual mapping"],
  ["has-open-select", "open page-select overflow release"],
  ["nativeOptions", "stable native option values"],
  ["roleImage", "persisted role-image setting"],
  ["data-wb-grid-key", "registered workbench grid"],
  ["data-wb-card-key", "registered workbench card"],
  ["data-wb-edit-scope", "workbench edit scope"],
  ["data-wb-default-grid", "default card grid"],
  ["data-wb-card-grid", "current card grid"],
  ["hiddenCards", "persisted hidden-card keys"],
  ["hiddenCardState", "hidden-card restoration snapshots"],
  ["--wb-edit-guide-size", "shared edit-guide sizing token"],
  ["--wb-edit-guide-inset", "shared contained edit-guide inset token"],
  ["canvas-card-hide-button", "shared semantic hide action layer"],
  ["canvas-hidden-bar", "shared hidden-card restore capsule"],
  ["select-interactions.js", "shared enum-select behavior"],
  ["chart-interactions.js", "shared chart behavior"],
  ["workbench-card-library/tokens.css", "shared tokens stylesheet"],
  ["workbench-card-library/components.css", "shared components stylesheet"]
].forEach(([needle, label]) => requireText(needle, label));

if (/id=["']canvasSave["']|id=["']canvasExport["']/.test(html)) {
  errors.push("Legacy Save/config-export controls must not remain in canvas settings");
}
for (const [needle, label] of [
  ["WorkbenchCanvasExport", "workspace page-export API"],
  ["buildWorkspaceExports", "per-tab export builder"],
  ["cleanExportPanel", "main-board export cleanup"],
  ["safeExportFilename", "tab-label filename sanitizer"],
  ["showDirectoryPicker", "multi-page folder export"],
  ["showSaveFilePicker", "single-page Save As export"],
  ["downloadHtmlSource", "download fallback"],
  ["canvas-export-mode", "export-only document shell"]
]) requireText(needle, label);

requireAnyText(["id=\"canvasApp\"", 'canvasApp.id = "canvasApp"'], "#canvasApp");

const roleImageMatch = html.match(/<script type="application\/json" id="canvasRoleImageAssets">([\s\S]*?)<\/script>/i);
if (!roleImageMatch) {
  errors.push("Missing embedded role-image asset payload");
} else {
  try {
    const roleImages = JSON.parse(roleImageMatch[1]);
    for (const filename of ["分析师-女.png", "分析师-男.png", "客服.png", "总监.png", "服务工程师.png", "服务总监.png", "用户.png", "销售.png"]) {
      if (!/^data:image\/png;base64,/.test(roleImages[filename] || "")) errors.push(`Role image ${filename} is not embedded as a PNG data URL`);
    }
  } catch (error) {
    errors.push(`Invalid canvasRoleImageAssets JSON: ${error.message}`);
  }
}

const attributeValues = (attribute) => [...html.matchAll(new RegExp(`${attribute}\\s*=\\s*[\"']([^\"']+)[\"']`, "g"))].map((match) => match[1]);
const workspaceKeys = [...new Set(attributeValues("data-canvas-workspace"))];
const panelKeys = [...new Set(attributeValues("data-canvas-panel"))];

const parseAttributes = (source) => {
  const attributes = {};
  for (const match of source.matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    attributes[match[1]] = match[2] ?? match[3] ?? "";
  }
  return attributes;
};
const tagRecords = [...html.matchAll(/<([a-z][\w:-]*)\b([^<>]*?)>/gi)].map((match) => {
  const attributes = parseAttributes(match[2]);
  return {
    name: match[1].toLowerCase(),
    attributes,
    classes: new Set((attributes.class || "").split(/\s+/).filter(Boolean))
  };
});
const semanticContract = {
  "reporting-period": "segmented-control",
  "people-scope": "composite-select",
  "date-range": "composite-select",
  "enum-filter": "composite-select",
  "ai-entry": "ai-composer",
  "ai-summary": "ai-brief",
  "global-search": "search-field",
  "list-search": "search-field",
  "stage-progressor": "stage-progressor",
  "kpi-card": "metric-card",
  "business-list": "business-list",
  "business-table": "data-table"
};
const fieldTypes = new Set(["entity", "text", "enum", "person", "number", "amount", "rate", "date", "datetime", "duration", "status", "action", "query"]);
const semanticRecords = tagRecords.filter((record) => record.attributes["data-wb-semantic"]);

for (const record of semanticRecords) {
  const semantic = record.attributes["data-wb-semantic"];
  const component = record.attributes["data-wb-component"];
  if (!semanticContract[semantic]) {
    errors.push(`Unknown data-wb-semantic value: ${semantic}`);
    continue;
  }
  if (component !== semanticContract[semantic]) {
    errors.push(`Semantic ${semantic} must use data-wb-component="${semanticContract[semantic]}" (found ${component || "none"})`);
  }
  if (!record.attributes["aria-label"] && !record.attributes["aria-labelledby"]) {
    errors.push(`Semantic ${semantic} is missing aria-label or aria-labelledby`);
  }
}

for (const record of tagRecords.filter((item) => item.attributes["data-wb-field-key"])) {
  if (!record.attributes["data-wb-field-type"] && record.name !== "td") {
    errors.push(`Field ${record.attributes["data-wb-field-key"]} is missing data-wb-field-type`);
  } else if (record.attributes["data-wb-field-type"] && !fieldTypes.has(record.attributes["data-wb-field-type"])) {
    errors.push(`Field ${record.attributes["data-wb-field-key"]} has unsupported type ${record.attributes["data-wb-field-type"]}`);
  }
  if (!record.attributes["data-wb-field-label"] && record.name !== "td") {
    errors.push(`Field ${record.attributes["data-wb-field-key"]} is missing data-wb-field-label`);
  }
}

const signatureContracts = [
  ["wb-page-period", new Set(["reporting-period"]), "segmented-control"],
  ["wb-page-filter", new Set(["people-scope", "date-range", "enum-filter"]), "composite-select"],
  ["wb-ai-entry", new Set(["ai-entry"]), "ai-composer"],
  ["wb-ai-summary", new Set(["ai-summary"]), "ai-brief"],
  ["wb-search-field", new Set(["global-search", "list-search"]), "search-field"],
  ["wb-stage-progressor", new Set(["stage-progressor"]), "stage-progressor"],
  ["wb-compact-baseline-card", new Set(["kpi-card"]), "metric-card"],
  ["wb-business-list", new Set(["business-list"]), "business-list"],
  ["wb-table", new Set(["business-table"]), "data-table"]
];

for (const [className, allowedSemantics, component] of signatureContracts) {
  for (const record of tagRecords.filter((item) => item.classes.has(className))) {
    const semantic = record.attributes["data-wb-semantic"];
    if (!allowedSemantics.has(semantic) || record.attributes["data-wb-component"] !== component) {
      errors.push(`.${className} must declare its semantic contract (${[...allowedSemantics].join("|")} -> ${component})`);
    }
  }
}

for (const match of html.matchAll(/<table\b([^>]*)data-wb-semantic=["']business-table["']([^>]*)>([\s\S]*?)<\/table>/gi)) {
  const headers = [...match[3].matchAll(/<th\b([^>]*)>/gi)].map((header) => parseAttributes(header[1]));
  if (!headers.length) errors.push("Semantic business-table has no column headers");
  headers.forEach((header, index) => {
    if (header.scope !== "col") errors.push(`Semantic business-table header ${index + 1} must use scope="col"`);
    if (!header.id) errors.push(`Semantic business-table header ${index + 1} is missing a stable id`);
    ["data-wb-field-key", "data-wb-field-label", "data-wb-field-type"].forEach((attribute) => {
      if (!header[attribute]) errors.push(`Semantic business-table header ${index + 1} is missing ${attribute}`);
    });
  });
  for (const row of match[3].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...row[1].matchAll(/<td\b([^>]*)>/gi)].map((cell) => parseAttributes(cell[1]));
    cells.forEach((cell, index) => {
      const header = headers[index];
      if (!header) {
        errors.push(`Semantic business-table row has more cells than its ${headers.length} headers`);
        return;
      }
      if (!cell.headers?.split(/\s+/).includes(header.id)) {
        errors.push(`Semantic business-table cell ${index + 1} must reference header ${header.id || "without-id"}`);
      }
      if (cell["data-wb-field-key"] !== header["data-wb-field-key"]) {
        errors.push(`Semantic business-table cell ${index + 1} must use field key ${header["data-wb-field-key"] || "without-key"}`);
      }
    });
  }
}

if (workspaceKeys.length === 0) errors.push("No generated workspace tabs were found");
if (workspaceKeys.length !== panelKeys.length || workspaceKeys.some((key) => !panelKeys.includes(key))) {
  errors.push(`Workspace tabs and panels do not match (tabs: ${workspaceKeys.join(", ") || "none"}; panels: ${panelKeys.join(", ") || "none"})`);
}
if (html.includes("data-canvas-settings-workspace") || html.includes("wb-settings-page-tabs")) {
  errors.push("Settings drawer must not duplicate the top-level workspace tabs");
}
if (!html.includes('"总监.png": { from: "rgba(229, 238, 255, 0.20)", to: "rgba(144, 181, 255, 0.20)"')) {
  errors.push("Default director role must retain the specified blue gradient");
}
if (html.includes("wb-rich-header-card > :is(.wb-page-control-group, .wb-compact-action-group) { width: max-content; max-width: 100%; grid-column: 1; grid-row: 3; align-self: end; justify-self: start; overflow-x: auto; }")) {
  errors.push("Rich-header page controls must not permanently clip open select menus");
}
if (!html.includes("entry.workspace === state.workspace") && !html.includes("?.workspace === state.workspace")) {
  errors.push("Hidden-card count and restore must be scoped to the active settings page");
}

const cardKeys = attributeValues("data-wb-card-key");
const duplicateCardKeys = [...new Set(cardKeys.filter((key, index) => cardKeys.indexOf(key) !== index))];
if (duplicateCardKeys.length) errors.push(`Duplicate data-wb-card-key values: ${duplicateCardKeys.join(", ")}`);

const gridKeys = attributeValues("data-wb-grid-key");
const duplicateGridKeys = [...new Set(gridKeys.filter((key, index) => gridKeys.indexOf(key) !== index))];
if (duplicateGridKeys.length) errors.push(`Duplicate data-wb-grid-key values: ${duplicateGridKeys.join(", ")}`);

if (!html.includes("state.editing = true") || !html.includes("state.editing = false")) {
  errors.push("Settings open/close no longer clearly controls edit mode");
}
const colorThemeSettingsIndex = html.indexOf("<h2>色彩主题</h2>");
const headerCardSettingsIndex = html.indexOf('id="canvasHeaderCardSettings"');
if (colorThemeSettingsIndex < 0 || headerCardSettingsIndex < colorThemeSettingsIndex) {
  errors.push("Header card settings must appear directly after Color theme");
}
if (!html.includes('const defaultRoleImage = "总监.png"')) errors.push("Rich header must reset to 总监.png");
if (!html.includes("canvasApp.dataset.colorTheme = state.theme")) {
  errors.push("Canvas palette must be stored in data-color-theme");
}
if (!html.includes('canvasApp.dataset.theme = state.dark ? "dark" : "light"')) {
  errors.push("Canvas light/dark state must be stored in data-theme");
}
if (html.includes("canvasApp.dataset.theme = state.theme")) {
  errors.push("Canvas palette must not overwrite data-theme");
}
if (!html.includes("canvasSavedConfiguration")) errors.push("Embedded initial configuration is missing");

const localLibraryPaths = [
  "workbench-card-library/tokens.css",
  "workbench-card-library/components.css",
  "workbench-card-library/select-interactions.js",
  "workbench-card-library/chart-interactions.js"
];

for (const libraryPath of localLibraryPaths) {
  const escapedPath = libraryPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = [
    ...html.matchAll(new RegExp(`<link\\b[^>]*\\bhref=[\"']([^\"']*${escapedPath})[\"']`, "gi")),
    ...html.matchAll(new RegExp(`<script\\b[^>]*\\bsrc=[\"']([^\"']*${escapedPath})[\"']`, "gi"))
  ];
  if (!matches.length) continue;
  const reference = matches[0][1].split(/[?#]/, 1)[0];
  if (/^[a-z]+:/i.test(reference)) continue;
  try {
    await access(path.resolve(path.dirname(absoluteTarget), reference), constants.R_OK);
  } catch {
    errors.push(`Library path cannot be read from output: ${reference}`);
  }
}

if (errors.length) {
  console.error(`Canvas runtime validation failed for ${absoluteTarget}`);
  errors.forEach((message) => console.error(`- ${message}`));
  warnings.forEach((message) => console.error(`- Warning: ${message}`));
  process.exit(1);
}

console.log(`Canvas runtime validation passed: ${absoluteTarget}`);
console.log(`- ${workspaceKeys.length} generated workspace tab(s): ${workspaceKeys.join(", ")}`);
console.log(`- ${cardKeys.length} registered card(s), ${gridKeys.length} registered grid(s)`);
console.log(`- ${semanticRecords.length} semantic component root(s) validated`);
warnings.forEach((message) => console.log(`- Warning: ${message}`));
