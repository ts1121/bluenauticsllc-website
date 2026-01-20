(function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const yearEl = document.getElementById("year");

  // Footer year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu toggle
  function setMenuOpen(isOpen) {
    navMenu.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.contains("is-open");
      setMenuOpen(!open);
    });

    // Close menu when a link is clicked (mobile)
    navMenu.querySelectorAll("a.nav-link").forEach((a) => {
      a.addEventListener("click", () => setMenuOpen(false));
    });

    // Close menu when clicking outside (mobile)
    document.addEventListener("click", (e) => {
      const target = e.target;
      const clickedInside = navMenu.contains(target) || navToggle.contains(target);
      if (!clickedInside) setMenuOpen(false);
    });

    // Close menu on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    });
  }

  // Better scroll offset for sticky header
  // (prevents section titles being hidden under header)
  function scrollWithOffset(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-h")
      .trim();
    const headerPx = parseInt(headerH.replace("px", ""), 10) || 70;

    const y = el.getBoundingClientRect().top + window.pageYOffset - (headerPx + 10);
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // Intercept nav clicks to apply offset
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      scrollWithOffset(id);

      // Update URL hash without jump
      history.pushState(null, "", "#" + id);
    });
  });
})();

