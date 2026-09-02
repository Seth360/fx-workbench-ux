import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const libraryDir = path.resolve(scriptDir, "..");
const canvasPath = path.resolve(libraryDir, "..", "fxiaoke-workbench-canvas.html");
const source = fs.readFileSync(path.join(libraryDir, "workspace-routing.js"), "utf8");
const canvas = fs.readFileSync(canvasPath, "utf8");
const context = { window: {} };
vm.runInNewContext(source, context, { filename: "workspace-routing.js" });

const { register, resolveAction } = context.window.WorkbenchWorkspaceRouting;

const expectedRoutes = new Map([
  ["销售线索", "list"],
  ["客户", "customer-insight"],
  ["团队客户", "customer-insight"],
  ["活跃客户", "customer-insight"],
  ["注塑客户洞察", "customer-insight"],
  ["项目商机", "opportunity-insight"],
  ["商机项目", "opportunity-insight"],
  ["我的在途商机", "opportunity-insight"],
  ["试料验证阶段", "opportunity-insight"],
  ["报价管理", "opportunity-insight"],
  ["试样阶段商机项目需求", "opportunity-insight"],
  ["查看华芯电子商机", "opportunity-insight"],
  ["追觅商机洞察", "opportunity-insight"]
]);

for (const [action, route] of expectedRoutes) assert.equal(resolveAction(action), route, action);
for (const action of ["新建客户", "新建商机项目", "处理技术可行性待协调", "维护报价反馈", "填写本月月报"]) {
  assert.equal(resolveAction(action), "", action);
}

const explicitRouteElement = {
  dataset: { workbenchAction: "客户", wbRoute: "list" },
  classList: { add() {} },
  closest() { return { dataset: { canvasPanel: "company" } }; }
};
register({ querySelectorAll() { return [explicitRouteElement]; } });
assert.equal(explicitRouteElement.dataset.wbRoute, "list", "explicit route takes precedence over action inference");

function panelActions(panelKey) {
  const marker = `data-canvas-panel="${panelKey}"`;
  const start = canvas.indexOf(marker);
  assert.notEqual(start, -1, `missing panel ${panelKey}`);
  const next = canvas.indexOf("data-canvas-panel=", start + marker.length);
  const panel = canvas.slice(start, next === -1 ? canvas.length : next);
  return [...panel.matchAll(/data-workbench-action="([^"]+)"/g)].map((match) => match[1]);
}

const homeTargets = new Set(panelActions("home").map(resolveAction).filter(Boolean));
assert.ok(homeTargets.has("customer-insight"), "home customer route");
assert.ok(homeTargets.has("opportunity-insight"), "home opportunity route");
assert.ok(homeTargets.has("list"), "home list route");

const explicitRouteCounts = [...canvas.matchAll(/data-wb-route="([^"]+)"/g)]
  .reduce((counts, match) => counts.set(match[1], (counts.get(match[1]) || 0) + 1), new Map());
assert.ok((explicitRouteCounts.get("list") || 0) >= 2, "explicit list routes");
assert.ok((explicitRouteCounts.get("customer-insight") || 0) >= 3, "explicit customer routes");
assert.ok((explicitRouteCounts.get("opportunity-insight") || 0) >= 3, "explicit opportunity routes");

assert.match(canvas, /workspace-routing\.js/);
assert.match(canvas, /WorkbenchWorkspaceRouting\.register\(canvasApp\)/);
assert.match(canvas, /const navigateToWorkspace = \(target, trigger\)/);
assert.match(canvas, /const returnWorkspace = workspaceReturnTarget\(\)/);
assert.match(canvas, /state\.routeOriginWorkspace = routeOriginWorkspace/);
assert.match(canvas, /window\.scrollTo\(\{ top: 0, left: 0, behavior: "auto" \}\)/);
assert.match(canvas, /data-wb-route="customer-insight"/);
assert.match(canvas, /data-wb-route="opportunity-insight"/);
assert.match(canvas, /data-od-id="company-quick-customers"[^>]+data-wb-route="list"/);
assert.match(canvas, /data-od-id="company-metric-high-risk"[^>]+data-wb-route="list"/);
assert.match(canvas, /--wb-accent:\s*var\(--canvas-accent\)/);
assert.match(canvas, /--wb-text:\s*var\(--canvas-text\)/);
assert.equal((canvas.match(/class="wb-entity-link wb-route-target"[^>]+data-wb-route="opportunity-insight"/g) || []).length, 3, "three project field routes");
assert.ok((canvas.match(/class="wb-entity-link wb-route-target[^"]*"[^>]+data-wb-route="customer-insight"/g) || []).length >= 9, "customer field routes");
assert.match(canvas, /id="listCanvasDetail"/);
assert.match(canvas, /const openListCanvasDetail = \(trigger\)/);
assert.match(canvas, /openListCanvasDetail\(listOpen\)/);
assert.doesNotMatch(canvas, /showToast\(`打开「\$\{listOpen\.dataset\.listOpen\}」详情`\)/);
assert.equal((canvas.match(/data-list-detail-value=/g) || []).length, 7, "seven source fields in lead detail");

console.log(`workspace routing verified: ${expectedRoutes.size} routes, explicit-route precedence, 5 command exclusions, merged home/detail panels, 7 detail fields`);
