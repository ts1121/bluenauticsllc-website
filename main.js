// ==========================================
// BlueNautics LLC — main.js
// Polished behavior: mobile nav, active links,
// scroll progress bar, current year.
// ==========================================

(function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const progressBar = document.querySelector(".scroll-progress");

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("open")) {
          navMenu.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("click", (e) => {
      const clickedInsideNav = e.target.closest(".nav");
      if (!clickedInsideNav && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const sectionIds = navLinks
    .map((a) => a.getAttribute("href"))
    .filter((href) => href && href.startsWith("#"))
    .map((href) => href.slice(1));

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const headerOffset = 90;

  function setActiveLink(activeId) {
    navLinks.forEach((a) => {
      const id = a.getAttribute("href")?.slice(1);
      if (id === activeId) a.classList.add("active");
      else a.classList.remove("active");
    });
  }

  function onScrollActiveSection() {
    const scrollPos = window.scrollY + headerOffset;
    let current = sections[0]?.id || "";
    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    }
    if (current) setActiveLink(current);
  }

  window.addEventListener("scroll", onScrollActiveSection, { passive: true });
  onScrollActiveSection();
})();
