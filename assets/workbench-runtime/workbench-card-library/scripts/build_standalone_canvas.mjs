#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const libraryDir = path.resolve(scriptDir, "..");
const workspaceDir = path.resolve(libraryDir, "..");
const inputPath = path.resolve(process.argv[2] || path.join(workspaceDir, "fxiaoke-workbench-canvas.html"));
const outputPath = path.resolve(process.argv[3] || inputPath);

const resources = [
  { type: "style", reference: "./workbench-card-library/tokens.css" },
  { type: "style", reference: "./workbench-card-library/components.css" },
  { type: "style", reference: "./workbench-card-library/cards/opportunity-project-insight/card.css" },
  { type: "style", reference: "./workbench-card-library/cards/customer-operating-insight/card.css" },
  { type: "script", reference: "./workbench-card-library/cards/opportunity-project-insight/card.js" },
  { type: "script", reference: "./workbench-card-library/cards/customer-operating-insight/card.js" },
  { type: "script", reference: "./workbench-card-library/workspace-routing.js" },
  { type: "script", reference: "./workbench-card-library/select-interactions.js" },
  { type: "script", reference: "./workbench-card-library/chart-interactions.js" }
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function stripLocalImports(source) {
  return source.replace(/^\s*@import\s+url\(["'][^"']+["']\);\s*$/gm, "").trim();
}

function inlineBlock(resource, source) {
  const markerPath = resource.reference.replace(/^\.\//, "");
  const start = `<!-- WB_INLINE_START ${markerPath} -->`;
  const end = `<!-- WB_INLINE_END ${markerPath} -->`;
  const content = resource.type === "style"
    ? stripLocalImports(source).replace(/<\/style/gi, "<\\/style")
    : source.trim().replace(/<\/script/gi, "<\\/script");
  const tag = resource.type === "style" ? "style" : "script";
  return `${start}\n<${tag}>\n/* inlined from ${markerPath} */\n${content}\n</${tag}>\n${end}`;
}

function replaceResource(html, resource, block) {
  const markerPath = resource.reference.replace(/^\.\//, "");
  const start = `<!-- WB_INLINE_START ${markerPath} -->`;
  const end = `<!-- WB_INLINE_END ${markerPath} -->`;
  const existingBlock = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`);
  if (existingBlock.test(html)) return html.replace(existingBlock, block);

  const reference = escapeRegExp(resource.reference);
  const externalTag = resource.type === "style"
    ? new RegExp(`<link\\b(?=[^>]*\\brel=["']stylesheet["'])(?=[^>]*\\bhref=["']${reference}["'])[^>]*>`, "i")
    : new RegExp(`<script\\b(?=[^>]*\\bsrc=["']${reference}["'])[^>]*>\\s*<\\/script>`, "i");
  if (!externalTag.test(html)) throw new Error(`Missing resource hook for ${resource.reference}`);
  return html.replace(externalTag, block);
}

function moveRuntimeBeforeSavedConfiguration(html, reference) {
  const markerPath = reference.replace(/^\.\//, "");
  const start = `<!-- WB_INLINE_START ${markerPath} -->`;
  const end = `<!-- WB_INLINE_END ${markerPath} -->`;
  const blockPattern = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`);
  const match = html.match(blockPattern);
  if (!match) throw new Error(`Missing inline runtime block for ${reference}`);
  const configurationMarker = '<script type="application/json" id="canvasSavedConfiguration">';
  const currentConfigurationIndex = html.indexOf(configurationMarker);
  if (currentConfigurationIndex < 0) throw new Error("Missing canvasSavedConfiguration marker");
  if (match.index < currentConfigurationIndex) return html;
  const withoutBlock = html.replace(blockPattern, "");
  const markerIndex = withoutBlock.indexOf(configurationMarker);
  return `${withoutBlock.slice(0, markerIndex)}${match[0]}\n  ${withoutBlock.slice(markerIndex)}`;
}

let html = await fs.readFile(inputPath, "utf8");
for (const resource of resources) {
  const sourcePath = path.resolve(workspaceDir, resource.reference);
  const source = await fs.readFile(sourcePath, "utf8");
  html = replaceResource(html, resource, inlineBlock(resource, source));
}
for (const reference of [
  "./workbench-card-library/select-interactions.js",
  "./workbench-card-library/chart-interactions.js"
]) {
  html = moveRuntimeBeforeSavedConfiguration(html, reference);
}

await fs.mkdir(path.dirname(outputPath), { recursive: true });
const temporaryPath = `${outputPath}.tmp-${process.pid}`;
await fs.writeFile(temporaryPath, html, "utf8");
await fs.rename(temporaryPath, outputPath);
console.log(`Standalone canvas written: ${outputPath} (${Buffer.byteLength(html)} bytes)`);
