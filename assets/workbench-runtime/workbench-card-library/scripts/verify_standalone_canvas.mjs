#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";

const target = process.argv[2];
if (!target) {
  console.error("Usage: node verify_standalone_canvas.mjs <canvas-html>");
  process.exit(2);
}

const sourcePath = path.resolve(target);
const temporaryDir = await fs.mkdtemp(path.join(os.tmpdir(), "wb-standalone-"));
const copiedPath = path.join(temporaryDir, path.basename(sourcePath));

try {
  await fs.copyFile(sourcePath, copiedPath);
  const html = await fs.readFile(copiedPath, "utf8");

  if (/<script\b[^>]*\bsrc\s*=/i.test(html)) throw new Error("standalone canvas must not load external scripts");
  if (/<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref\s*=/i.test(html)) throw new Error("standalone canvas must not load external stylesheets");

  const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]).join("\n");
  const cssUrls = [...styles.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)].map((match) => match[1]);
  const localCssUrls = cssUrls.filter((value) => !/^(?:data:|https?:|#)/i.test(value));
  if (localCssUrls.length) throw new Error(`standalone canvas contains local CSS URLs: ${localCssUrls.join(", ")}`);

  const canvasRenderer = html.indexOf("canvasApp.innerHTML =");
  assert.ok(canvasRenderer > 0, "canvas renderer is missing");
  for (const [globalName, owner] of [["WorkbenchOpportunityInsight", "window"], ["WorkbenchCustomerInsight", "window"], ["WorkbenchWorkspaceRouting", "global"]]) {
    const definition = html.indexOf(`${owner}.${globalName} =`);
    assert.ok(definition >= 0 && definition < canvasRenderer, `${globalName} must be defined before canvas rendering`);
  }
  assert.match(html, /data-canvas-panel="opportunity-insight"[\s\S]{0,500}?WorkbenchOpportunityInsight\.render\(\)/);
  assert.match(html, /data-canvas-panel="customer-insight"[\s\S]{0,500}?WorkbenchCustomerInsight\.render\(\)/);

  const sourceCapture = html.indexOf("const sourceHtmlAtLoad =");
  assert.ok(sourceCapture > 0 && sourceCapture < canvasRenderer, "saved-source capture must precede canvas rendering");
  for (const markerPath of [
    "workbench-card-library/tokens.css",
    "workbench-card-library/components.css",
    "workbench-card-library/cards/opportunity-project-insight/card.css",
    "workbench-card-library/cards/customer-operating-insight/card.css",
    "workbench-card-library/cards/opportunity-project-insight/card.js",
    "workbench-card-library/cards/customer-operating-insight/card.js",
    "workbench-card-library/workspace-routing.js",
    "workbench-card-library/select-interactions.js",
    "workbench-card-library/chart-interactions.js"
  ]) {
    const marker = html.indexOf(`WB_INLINE_START ${markerPath}`);
    assert.ok(marker >= 0 && marker < sourceCapture, `${markerPath} must load before saved-source capture`);
  }

  const scripts = [...html.matchAll(/<script(?![^>]*type=["']application\/json["'])[^>]*>([\s\S]*?)<\/script>/gi)];
  scripts.forEach((match, index) => new vm.Script(match[1], { filename: `${path.basename(copiedPath)}#script-${index + 1}` }));

  console.log(`standalone canvas verified after isolated copy: ${copiedPath}`);
  console.log(`- ${scripts.length} inline script(s) parsed`);
  console.log("- opportunity and customer insight renderers load before canvas initialization");
  console.log("- every shared runtime block loads before saved-source capture");
  console.log("- no external stylesheet, script, or local CSS URL dependency remains");
} finally {
  await fs.rm(temporaryDir, { recursive: true, force: true });
}
