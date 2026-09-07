(function () {
  "use strict";

  var activeInstance = null;
  var instances = new WeakMap();

  function focusOption(options, index) {
    if (!options.length) return;
    options[(index + options.length) % options.length].focus();
  }

  function setupSelect(root) {
    if (instances.has(root)) return instances.get(root);
    var nativeSelect = root.querySelector("[data-wb-select-native]");
    var trigger = root.querySelector("[data-wb-select-trigger]");
    var value = root.querySelector("[data-wb-select-value]");
    var menu = root.querySelector("[data-wb-select-menu]");
    var options = Array.from(root.querySelectorAll("[data-wb-select-option]"));
    if (!nativeSelect || !trigger || !value || !menu || !options.length) return null;
    var nativeOptions = Array.from(nativeSelect.options);
    options.forEach(function (option, index) {
      var nativeOption = nativeOptions[index];
      if (nativeOption && !nativeOption.hasAttribute("value")) nativeOption.value = option.dataset.value;
    });
    var overflowOwner = root.closest(".wb-page-control-group");
    var stackingOwner = root.closest(".wb-rich-header-card");

    var portalAnchor = null;
    var savedMenuStyle = null;

    function positionPortal() {
      if (!portalAnchor) return;
      var rect = trigger.getBoundingClientRect();
      var viewportWidth = document.documentElement.clientWidth;
      var viewportHeight = window.innerHeight;
      menu.style.maxWidth = Math.max(0, viewportWidth - 24) + "px";
      menu.style.minWidth = Math.min(rect.width, viewportWidth - 24) + "px";
      var width = menu.offsetWidth;
      var below = viewportHeight - rect.bottom - 19;
      var above = rect.top - 19;
      var useAbove = below < Math.min(menu.scrollHeight, 180) && above > below;
      menu.style.maxHeight = Math.max(60, useAbove ? above : below) + "px";
      menu.style.left = Math.max(12, Math.min(rect.right - width, viewportWidth - width - 12)) + "px";
      menu.style.top = Math.max(12, useAbove ? rect.top - menu.offsetHeight - 7 : rect.bottom + 7) + "px";
    }

    function mountPortal() {
      savedMenuStyle = menu.getAttribute("style");
      var computed = getComputedStyle(root);
      for (var i = 0; i < computed.length; i++) {
        var property = computed[i];
        if (property.indexOf("--wb-") === 0 || property.indexOf("--canvas-") === 0) menu.style.setProperty(property, computed.getPropertyValue(property));
      }
      portalAnchor = document.createComment("wb-select-menu");
      menu.replaceWith(portalAnchor);
      document.body.appendChild(menu);
      menu.classList.add("wb-select-portal");
      menu.style.position = "fixed";
      menu.style.right = "auto";
      positionPortal();
      window.addEventListener("resize", positionPortal);
      window.addEventListener("scroll", positionPortal, true);
    }

    function selectedOption() {
      return options.find(function (option) { return option.dataset.value === nativeSelect.value; }) || options[0];
    }

    function refresh() {
      var selected = selectedOption();
      options.forEach(function (option) {
        option.setAttribute("aria-selected", String(option === selected));
      });
      value.textContent = selected.textContent.trim();
      positionPortal();
    }

    function close(restoreFocus) {
      menu.hidden = true;
      if (portalAnchor) {
        portalAnchor.replaceWith(menu);
        portalAnchor = null;
        menu.classList.remove("wb-select-portal");
        if (savedMenuStyle === null) menu.removeAttribute("style");
        else menu.setAttribute("style", savedMenuStyle);
        window.removeEventListener("resize", positionPortal);
        window.removeEventListener("scroll", positionPortal, true);
      }
      trigger.setAttribute("aria-expanded", "false");
      root.classList.remove("is-open");
      if (overflowOwner) overflowOwner.classList.remove("has-open-select");
      if (stackingOwner) stackingOwner.classList.remove("has-open-select");
      if (activeInstance === instance) activeInstance = null;
      if (restoreFocus) trigger.focus();
    }

    function open(focusSelected) {
      if (trigger.disabled) return;
      if (activeInstance && activeInstance !== instance) activeInstance.close(false);
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      root.classList.add("is-open");
      if (overflowOwner && overflowOwner.scrollWidth > overflowOwner.clientWidth + 1) {
        if (!portalAnchor) mountPortal();
      } else if (overflowOwner) overflowOwner.classList.add("has-open-select");
      if (stackingOwner) stackingOwner.classList.add("has-open-select");
      activeInstance = instance;
      if (focusSelected) selectedOption().focus();
    }

    function choose(option) {
      var nextValue = option.dataset.value;
      var changed = nativeSelect.value !== nextValue;
      nativeSelect.value = nextValue;
      refresh();
      close(true);
      if (changed) nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }

    var instance = { close: close, open: open, refresh: refresh, contains: function (target) { return root.contains(target) || menu.contains(target); } };
    instances.set(root, instance);
    nativeSelect.tabIndex = -1;
    nativeSelect.setAttribute("aria-hidden", "true");
    trigger.hidden = false;
    root.classList.add("is-ready");
    refresh();

    trigger.addEventListener("click", function () {
      if (menu.hidden) open(false);
      else close(false);
    });
    trigger.addEventListener("keydown", function (event) {
      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        open(true);
        if (event.key === "Home") focusOption(options, 0);
        if (event.key === "End") focusOption(options, options.length - 1);
      }
    });
    menu.addEventListener("keydown", function (event) {
      var index = options.indexOf(document.activeElement);
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        focusOption(options, index + (event.key === "ArrowDown" ? 1 : -1));
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        focusOption(options, event.key === "Home" ? 0 : options.length - 1);
      } else if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      } else if ((event.key === "Enter" || event.key === " ") && index >= 0) {
        event.preventDefault();
        choose(options[index]);
      } else if (event.key === "Tab") {
        close(true);
      }
    });
    options.forEach(function (option) {
      option.addEventListener("click", function () { choose(option); });
    });
    nativeSelect.addEventListener("change", refresh);
    return instance;
  }

  function init(scope) {
    var root = scope || document;
    root.querySelectorAll("[data-wb-select]").forEach(setupSelect);
  }

  function refresh(scope) {
    var root = scope || document;
    root.querySelectorAll("[data-wb-select]").forEach(function (select) {
      var instance = setupSelect(select);
      if (instance) instance.refresh();
    });
  }

  document.addEventListener("pointerdown", function (event) {
    if (activeInstance && !activeInstance.contains(event.target)) activeInstance.close(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeInstance) activeInstance.close(true);
  });

  window.WorkbenchSelect = { init: init, refresh: refresh };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(document); });
  else init(document);
}());
