// Theme toggle. Pair with the .top-bar / .pill-group styles in lang-switch.css.
//
// Markup contract, alongside .lang-switch inside .top-bar:
//   <div class="pill-group theme-toggle">
//     <button data-theme="dark" aria-label="Dark mode">☾</button>
//     <button data-theme="light" aria-label="Light mode">☀</button>
//   </div>
//
// Dark is the default (matches the dark values on bare :root in style.css) —
// this only needs to act when the user explicitly picks a theme.

(function () {
  var STORAGE_KEY = "agentic-ai-theme";
  var SUPPORTED = ["light", "dark"];

  function apply(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    document.querySelectorAll(".theme-toggle button").forEach(function (btn) {
      var active = btn.dataset.theme === theme;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function init() {
    var saved = localStorage.getItem(STORAGE_KEY);
    var theme = SUPPORTED.indexOf(saved) !== -1 ? saved : "dark";
    apply(theme);

    document.querySelectorAll(".theme-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var theme = btn.dataset.theme;
        localStorage.setItem(STORAGE_KEY, theme);
        apply(theme);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
