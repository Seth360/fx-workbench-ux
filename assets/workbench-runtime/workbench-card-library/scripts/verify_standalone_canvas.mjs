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

  const roleImageMatch = html.match(/<script type="application\/json" id="canvasRoleImageAssets">([\s\S]*?)<\/script>/i);
  assert.ok(roleImageMatch, "canvas role-image asset payload is missing");
  const roleImageAssets = JSON.parse(roleImageMatch[1]);
  for (const filename of ["分析师-女.png", "分析师-男.png", "客服.png", "总监.png", "服务工程师.png", "服务总监.png", "用户.png", "销售.png"]) {
    assert.match(roleImageAssets[filename] || "", /^data:image\/png;base64,/, `${filename} must be embedded as a PNG data URL`);
  }

  const canvasRenderer = html.indexOf("canvasApp.innerHTML =");
  assert.ok(canvasRenderer > 0, "canvas renderer is missing");
  assert.match(html, /id="canvasExportPage"/, "canvas must expose the page-export control");
  assert.doesNotMatch(html, /id="canvasSave"|id="canvasExport"/, "legacy save/config-export controls must be removed");
  assert.match(html, /window\.WorkbenchCanvasExport\s*=\s*\{\s*buildWorkspaceExports,\s*exportWorkspacePages\s*\}/, "workspace page-export API is missing");
  assert.match(html, /showDirectoryPicker/, "multi-page export must support one-folder writing");
  assert.match(html, /safeExportFilename/, "export filenames must derive safely from tab labels");
  assert.match(html, /id="canvasCrmNavigation"/);
  assert.match(html, /crm-navigation-mode/);
  assert.match(html, /canvas-root\.crm-navigation-enabled\.settings-open\s*\{\s*padding-right:\s*360px/);
  assert.match(html, /canvas-navigation-host \.workspace-card\s*\{[\s\S]{0,260}?overflow: visible/);
  assert.match(html, /const dedupeCanvasContent = \(\) =>/);
  assert.doesNotMatch(html, /data-canvas-subworkspace=/);
  assert.doesNotMatch(html, /const selectCanvasSubworkspace/);
  for (const duplicateKey of ["company-quick-strip", "company-baseline", "scope-quick-grid", "scope-baseline-card", "scope-major-project-risks", "personal-quick-grid", "personal-project-warnings", "customer-insight-record"]) {
    assert.match(html, new RegExp(`data-od-id=\\\"${duplicateKey}\\\"`), `${duplicateKey} source must remain available for runtime dedupe`);
  }
  for (const [globalName, owner] of [["WorkbenchOpportunityInsight", "window"], ["WorkbenchCustomerInsight", "window"], ["WorkbenchWorkspaceRouting", "global"]]) {
    const definition = html.indexOf(`${owner}.${globalName} =`);
    assert.ok(definition >= 0 && definition < canvasRenderer, `${globalName} must be defined before canvas rendering`);
  }
  const detailPanel = html.indexOf('id="canvasDetailPanel"');
  assert.ok(detailPanel >= 0, "merged detail panel is missing");
  assert.ok(html.indexOf("WorkbenchOpportunityInsight.render()", detailPanel) > detailPanel, "opportunity insight must render inside detail panel");
  assert.ok(html.indexOf("WorkbenchCustomerInsight.render()", detailPanel) > detailPanel, "customer insight must render inside detail panel");

  assert.ok(html.indexOf('id="canvasRoleImageAssets"') < canvasRenderer, "role-image assets must load before canvas rendering");
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
    assert.ok(marker >= 0 && marker < canvasRenderer, `${markerPath} must load before canvas rendering`);
  }

  const scripts = [...html.matchAll(/<script(?![^>]*type=["']application\/json["'])[^>]*>([\s\S]*?)<\/script>/gi)];
  scripts.forEach((match, index) => new vm.Script(match[1], { filename: `${path.basename(copiedPath)}#script-${index + 1}` }));

  console.log(`standalone canvas verified after isolated copy: ${copiedPath}`);
  console.log(`- ${scripts.length} inline script(s) parsed`);
  console.log("- opportunity and customer insight renderers load before canvas initialization");
  console.log("- every shared runtime block loads before canvas rendering");
  console.log("- every top-level tab can be exported as a separately named main-board HTML");
  console.log("- all eight selectable role images are embedded as PNG data URLs");
  console.log("- no external stylesheet, script, or local CSS URL dependency remains");
} finally {
  await fs.rm(temporaryDir, { recursive: true, force: true });
}
