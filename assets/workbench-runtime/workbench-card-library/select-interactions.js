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

    function selectedOption() {
      return options.find(function (option) { return option.dataset.value === nativeSelect.value; }) || options[0];
    }

    function refresh() {
      var selected = selectedOption();
      options.forEach(function (option) {
        option.setAttribute("aria-selected", String(option === selected));
      });
      value.textContent = selected.textContent.trim();
    }

    function close(restoreFocus) {
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      if (activeInstance === instance) activeInstance = null;
      if (restoreFocus) trigger.focus();
    }

    function open(focusSelected) {
      if (trigger.disabled) return;
      if (activeInstance && activeInstance !== instance) activeInstance.close(false);
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
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

    var instance = { close: close, open: open, refresh: refresh };
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
        close(false);
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
    if (activeInstance && !event.target.closest("[data-wb-select]")) activeInstance.close(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeInstance) activeInstance.close(true);
  });

  window.WorkbenchSelect = { init: init, refresh: refresh };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(document); });
  else init(document);
}());
