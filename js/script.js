(function () {
    "use strict";

    var STORAGE_KEY = "portfolio-theme";
    var root = document.documentElement;
    var toggleBtn = document.getElementById("theme-toggle");

    function applyTheme(theme) {
        root.setAttribute("data-bs-theme", theme);
        if (toggleBtn) {
            toggleBtn.textContent = theme === "dark" ? "Modo claro" : "Modo escuro";
        }
    }

    function getPreferredTheme() {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    applyTheme(getPreferredTheme());

    var anoAtual = document.getElementById("ano-atual");
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            var current = root.getAttribute("data-bs-theme");
            var next = current === "dark" ? "light" : "dark";
            applyTheme(next);
            localStorage.setItem(STORAGE_KEY, next);
        });
    }

    // Destaca o link de navegação da seção visível no momento
    var sections = document.querySelectorAll("main section[id]");
    var navLinks = document.querySelectorAll(".nav-link");

    function setActiveLink() {
        var scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var bottom = top + section.offsetHeight;
            var link = document.querySelector('.nav-link[href="#' + section.id + '"]');
            if (!link) return;
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(function (l) { l.classList.remove("active"); });
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveLink);
    setActiveLink();

    // Fecha o menu colapsado (mobile) ao clicar em um link
    var navCollapse = document.getElementById("navbarNav");
    if (navCollapse) {
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) bsCollapse.hide();
            });
        });
    }
})();
