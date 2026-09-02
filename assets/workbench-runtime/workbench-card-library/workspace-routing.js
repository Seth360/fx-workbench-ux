(function (global) {
  "use strict";

  const ROUTES = Object.freeze({
    list: "list",
    customer: "customer-insight",
    opportunity: "opportunity-insight"
  });

  const exactRoutes = new Map([
    ["销售线索", ROUTES.list],
    ["客户", ROUTES.customer],
    ["团队客户", ROUTES.customer],
    ["活跃客户", ROUTES.customer],
    ["客户拜访", ROUTES.customer],
    ["项目商机", ROUTES.opportunity],
    ["商机项目", ROUTES.opportunity],
    ["商机项目需求", ROUTES.opportunity],
    ["在途商机", ROUTES.opportunity],
    ["我的在途商机", ROUTES.opportunity],
    ["高风险项目", ROUTES.opportunity],
    ["试料验证", ROUTES.opportunity],
    ["试料通过率", ROUTES.opportunity],
    ["试料申请", ROUTES.opportunity],
    ["报价申请", ROUTES.opportunity],
    ["报价管理", ROUTES.opportunity],
    ["赢单项目", ROUTES.opportunity],
    ["终止项目", ROUTES.opportunity],
    ["本期暂停项目", ROUTES.opportunity]
  ]);

  const blockedCommand = /^(?:新建|创建|添加|处理|维护|补充|修订|填写|继续|导出|刷新)/;

  function resolveAction(action) {
    const label = String(action || "").trim();
    if (!label || blockedCommand.test(label)) return "";
    if (exactRoutes.has(label)) return exactRoutes.get(label);
    if (/客户洞察$/.test(label) || /^联系.+/.test(label)) return ROUTES.customer;
    if (/商机洞察$/.test(label) || /^查看.+商机$/.test(label)) return ROUTES.opportunity;
    if (/^(?:需求确认|方案匹配|试料验证|商务报价|客户导入)阶段$/.test(label)) return ROUTES.opportunity;
    if (/(?:商务接触|试样|导入|量产)阶段商机(?:项目需求)?$/.test(label)) return ROUTES.opportunity;
    if (/^(?:试料待反馈|报价材料待反馈|多次试料失败项目)$/.test(label)) return ROUTES.opportunity;
    if (/^(?:推进|跟进).+/.test(label)) return ROUTES.opportunity;
    return "";
  }

  function register(root, workspaceKeys) {
    if (!root?.querySelectorAll) return [];
    const allowed = new Set(workspaceKeys || ["home", "detail", "list"]);
    const routeTargets = new Set(Object.values(ROUTES));
    const registered = [];
    root.querySelectorAll("[data-canvas-panel] [data-workbench-action]").forEach((element) => {
      const panel = element.closest("[data-canvas-panel]");
      if (!panel || !allowed.has(panel.dataset.canvasPanel)) return;
      const explicitTarget = String(element.dataset.wbRoute || "").trim();
      const target = routeTargets.has(explicitTarget) ? explicitTarget : resolveAction(element.dataset.workbenchAction);
      if (!target) return;
      element.dataset.wbRoute = target;
      element.classList.add("wb-route-target");
      registered.push(element);
    });
    return registered;
  }

  global.WorkbenchWorkspaceRouting = Object.freeze({ ROUTES, register, resolveAction });
})(window);
