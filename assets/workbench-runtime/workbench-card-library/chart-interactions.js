(function () {
  "use strict";

  var tooltip = document.createElement("div");
  tooltip.className = "wb-chart-tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.hidden = true;
  tooltip.innerHTML = "<b></b><span></span>";
  document.body.appendChild(tooltip);

  var activeTarget = null;
  var title = tooltip.querySelector("b");
  var detail = tooltip.querySelector("span");

  function localizedValue(target, name) {
    var suffix = document.documentElement.lang.toLowerCase().startsWith("en") ? "En" : "Zh";
    return target.dataset[name + suffix] || target.dataset[name] || "";
  }

  function updateAccessibility() {
    document.querySelectorAll("[data-chart-detail], [data-chart-detail-zh]").forEach(function (target) {
      if (!target.hasAttribute("tabindex")) target.tabIndex = 0;
      if (!target.hasAttribute("role")) target.setAttribute("role", "img");
      target.setAttribute("aria-label", localizedValue(target, "chartDetail"));
    });
  }

  function placeTooltip(target) {
    var rect = target.getBoundingClientRect();
    var tipRect = tooltip.getBoundingClientRect();
    var left = Math.min(window.innerWidth - tipRect.width - 12, Math.max(12, rect.left + rect.width / 2 - tipRect.width / 2));
    var top = rect.top - tipRect.height - 8;
    if (top < 8) top = rect.bottom + 8;
    tooltip.style.left = Math.round(left) + "px";
    tooltip.style.top = Math.round(top) + "px";
  }

  function show(target) {
    if (!target || !target.matches("[data-chart-detail], [data-chart-detail-zh]")) return;
    activeTarget = target;
    title.textContent = localizedValue(target, "chartTitle");
    detail.textContent = localizedValue(target, "chartDetail");
    tooltip.hidden = false;
    placeTooltip(target);
    requestAnimationFrame(function () { tooltip.classList.add("is-visible"); });
  }

  function hide(target) {
    if (target && target !== activeTarget) return;
    activeTarget = null;
    tooltip.classList.remove("is-visible");
    window.setTimeout(function () { if (!activeTarget) tooltip.hidden = true; }, 160);
  }

  document.addEventListener("pointerover", function (event) {
    var target = event.target.closest("[data-chart-detail], [data-chart-detail-zh]");
    if (target && !target.contains(event.relatedTarget)) show(target);
  });
  document.addEventListener("pointerout", function (event) {
    var target = event.target.closest("[data-chart-detail], [data-chart-detail-zh]");
    if (target && !target.contains(event.relatedTarget)) hide(target);
  });
  document.addEventListener("focusin", function (event) { show(event.target); });
  document.addEventListener("focusout", function (event) { hide(event.target); });
  window.addEventListener("resize", function () { if (activeTarget) placeTooltip(activeTarget); });
  document.addEventListener("scroll", function () { if (activeTarget) placeTooltip(activeTarget); }, true);
  new MutationObserver(updateAccessibility).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  updateAccessibility();
}());
