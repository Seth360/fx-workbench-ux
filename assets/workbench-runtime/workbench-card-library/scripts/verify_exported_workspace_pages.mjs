#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error("Usage: node verify_exported_workspace_pages.mjs <workspace-page.html> [...more.html]");
  process.exit(2);
}

for (const target of targets) {
  const absolutePath = path.resolve(target);
  const html = await fs.readFile(absolutePath, "utf8");
  const visibleMarkup = html
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
  const filename = path.basename(absolutePath, path.extname(absolutePath));

  assert.match(html, /^<!doctype html>/i, `${absolutePath}: document doctype is missing`);
  assert.ok(title, `${absolutePath}: document title is missing`);
  assert.equal(title, filename, `${absolutePath}: filename must match its workspace tab label`);
  assert.match(visibleMarkup, /<main class="canvas-stage">/, `${absolutePath}: main canvas stage is missing`);
  assert.match(visibleMarkup, /id="canvasBoard"/, `${absolutePath}: main canvas board is missing`);
  assert.equal((visibleMarkup.match(/data-canvas-panel=/g) || []).length, 1, `${absolutePath}: export must contain exactly one workspace panel`);
  assert.doesNotMatch(visibleMarkup, /canvas-toolbar|workspace-tab-list|canvasSettingsOpen/, `${absolutePath}: workspace tab toolbar must not be exported`);
  assert.doesNotMatch(visibleMarkup, /id="canvasSettings"|canvas-settings/, `${absolutePath}: settings drawer must not be exported`);
  assert.doesNotMatch(visibleMarkup, /class="[^"]*(?:global-rail|crm-sidebar)|data-od-id="crm-navigation"/, `${absolutePath}: CRM navigation must not be exported`);
  assert.doesNotMatch(visibleMarkup, /data-wb-hidden="true"/, `${absolutePath}: hidden cards must not be exported`);
  assert.doesNotMatch(html, /<script\b[^>]*\bsrc\s*=/i, `${absolutePath}: external scripts are not allowed`);
  assert.doesNotMatch(html, /<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref\s*=/i, `${absolutePath}: external stylesheets are not allowed`);

  const styles = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]).join("\n");
  const localCssUrls = [...styles.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)]
    .map((match) => match[1])
    .filter((value) => !/^(?:data:|https?:|#)/i.test(value));
  assert.deepEqual(localCssUrls, [], `${absolutePath}: local CSS URLs are not allowed`);

  const scripts = [...html.matchAll(/<script(?![^>]*type=["']application\/json["'])[^>]*>([\s\S]*?)<\/script>/gi)];
  scripts.forEach((match, index) => new vm.Script(match[1], { filename: `${path.basename(absolutePath)}#script-${index + 1}` }));
  console.log(`exported workspace page verified: ${absolutePath}`);
  console.log(`- title/filename: ${title}`);
  console.log(`- one main-board panel, ${scripts.length} inline script(s), no editor/navigation DOM or external dependencies`);
}
