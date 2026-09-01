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
  ["id=\"canvasSave\"", "Save control"],
  ["id=\"canvasExport\"", "Export control"],
  ["id=\"canvasReset\"", "Reset control"],
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
  ["data-canvas-theme=\"indigo\"", "indigo theme"],
  ["data-canvas-theme=\"rose\"", "rose theme"],
  ["data-canvas-theme=\"graphite\"", "graphite theme"],
  ["data-wb-grid-key", "registered workbench grid"],
  ["data-wb-card-key", "registered workbench card"],
  ["data-wb-edit-scope", "workbench edit scope"],
  ["data-wb-default-grid", "default card grid"],
  ["data-wb-card-grid", "current card grid"],
  ["select-interactions.js", "shared enum-select behavior"],
  ["chart-interactions.js", "shared chart behavior"],
  ["workbench-card-library/tokens.css", "shared tokens stylesheet"],
  ["workbench-card-library/components.css", "shared components stylesheet"]
].forEach(([needle, label]) => requireText(needle, label));

requireAnyText(["id=\"canvasApp\"", 'canvasApp.id = "canvasApp"'], "#canvasApp");

const attributeValues = (attribute) => [...html.matchAll(new RegExp(`${attribute}\\s*=\\s*[\"']([^\"']+)[\"']`, "g"))].map((match) => match[1]);
const workspaceKeys = [...new Set(attributeValues("data-canvas-workspace"))];
const panelKeys = [...new Set(attributeValues("data-canvas-panel"))];

if (workspaceKeys.length === 0) errors.push("No generated workspace tabs were found");
if (workspaceKeys.length !== panelKeys.length || workspaceKeys.some((key) => !panelKeys.includes(key))) {
  errors.push(`Workspace tabs and panels do not match (tabs: ${workspaceKeys.join(", ") || "none"}; panels: ${panelKeys.join(", ") || "none"})`);
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
if (!html.includes("canvasSavedConfiguration")) errors.push("Configuration save path is missing");
if (!html.includes("showSaveFilePicker") && !html.includes("downloadHtmlSource")) warnings.push("Could not find an HTML-save or download fallback");

const localLibraryPaths = [
  "workbench-card-library/tokens.css",
  "workbench-card-library/components.css",
  "workbench-card-library/select-interactions.js",
  "workbench-card-library/chart-interactions.js"
];

for (const libraryPath of localLibraryPaths) {
  const matches = [...html.matchAll(new RegExp(`[\"']([^\"']*${libraryPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})[\"']`, "g"))];
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
warnings.forEach((message) => console.log(`- Warning: ${message}`));
