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

  // Set year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu on link click (mobile)
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("open")) {
          navMenu.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      const clickedInsideNav = e.target.closest(".nav");
      if (!clickedInsideNav && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Scroll progress bar
  function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Active section highlighting (nav)
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

    // Find the last section above the scroll position
    let current = sections[0]?.id || "";
    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    }
    if (current) setActiveLink(current);
  }

  window.addEventListener("scroll", onScrollActiveSection, { passive: true });
  onScrollActiveSection();
})();
