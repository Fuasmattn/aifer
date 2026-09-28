// Language switcher. Pair with lang-switch.css.
//
// Content markup contract — tag any translatable block with data-i18n:
//   <p data-i18n="en">...</p>
//   <p data-i18n="de">...</p>
//   <p data-i18n="es">...</p>
// Whole components (a quiz-question, a list, a glossary-term) should be
// tripled wholesale rather than mixing languages inside one element.
//
// Switcher markup contract, placed once near the top of <body>:
//   <div class="lang-switch">
//     <button data-lang="en">EN</button>
//     <button data-lang="de">DE</button>
//     <button data-lang="es">ES</button>
//   </div>

(function () {
  var STORAGE_KEY = "agentic-ai-lang";
  var SUPPORTED = ["en", "de", "es"];

  // Explicit per-tag display value — inline styles beat the stylesheet's
  // blanket `[data-i18n] { display: none }`, but only if the value isn't
  // empty. An empty string doesn't override anything, so "show" must set
  // a real display value, not clear the inline style.
  function displayFor(el) {
    switch (el.tagName) {
      case "A":
      case "SPAN":
      case "STRONG":
      case "EM":
        return "inline";
      case "LI":
        return "list-item";
      default:
        return "block";
    }
  }

  function apply(lang) {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.style.display = el.getAttribute("data-i18n") === lang ? displayFor(el) : "none";
    });

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function init() {
    var saved = localStorage.getItem(STORAGE_KEY);
    var lang = SUPPORTED.indexOf(saved) !== -1 ? saved : "es";
    apply(lang);

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.dataset.lang;
        localStorage.setItem(STORAGE_KEY, lang);
        apply(lang);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
