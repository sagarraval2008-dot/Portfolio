/* ============================================================
   SAGAR RAVAL — PORTFOLIO SCRIPT
   Vanilla JS only. Organized by feature, each self-contained
   so sections can be added/removed without breaking others.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- 1. LOADING SCREEN ---------- */
  // Hide the loader once the page has fully loaded, with a small
  // minimum display time so it never just "flashes" on fast networks.
  const loader = document.getElementById("loader");
  const MIN_LOADER_MS = 500;
  const startTime = Date.now();

  window.addEventListener("load", () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
    setTimeout(() => {
      loader.classList.add("loaded");
    }, remaining);
  });

  /* ---------- 2. SCROLL PROGRESS BAR ---------- */
  const progressBar = document.getElementById("scroll-progress");
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
  }

  /* ---------- 3. NAVBAR: scroll state + scrollspy ---------- */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main .section, .hero");
  const backToTop = document.getElementById("back-to-top");

  function updateNavbarState() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    backToTop.classList.toggle("visible", window.scrollY > 600);
  }

  // Scrollspy: highlight the nav link for whichever section is in view
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.dataset.section === id
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => {
    if (section.id) spyObserver.observe(section);
  });

  // Combine scroll-driven updates into a single rAF-throttled handler
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        updateNavbarState();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateScrollProgress();
  updateNavbarState();

  /* ---------- 4. MOBILE NAVIGATION ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navLinksList = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinksList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu whenever a link is tapped
  navLinksList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinksList.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 5. TYPING ANIMATION ---------- */
  const typingEl = document.getElementById("typing-text");
  const roles = [
    "Full-Stack Web Developer",
    "Engineering Student",
    "Firebase Enthusiast",
  ];

  function typeLoop() {
    if (prefersReducedMotion) {
      // Show the primary role statically; skip the animation loop entirely.
      typingEl.textContent = roles[0];
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const TYPE_SPEED = 65;
    const DELETE_SPEED = 35;
    const HOLD_MS = 1600;

    function tick() {
      const currentRole = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typingEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === currentRole.length) {
          deleting = true;
          setTimeout(tick, HOLD_MS);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        typingEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    }
    tick();
  }
  typeLoop();

  /* ---------- 6. SCROLL-REVEAL ANIMATIONS ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small stagger for elements that reveal together in a grid
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => {
              entry.target.classList.add("in-view");
            }, delay);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el, i) => {
      // Stagger cards that sit in the same grid row for a nicer cascade
      const group = el.closest(".skills-grid, .projects-grid, .contact-grid");
      if (group) {
        const indexInGroup = [...group.children].indexOf(el);
        el.dataset.revealDelay = indexInGroup * 90;
      }
      revealObserver.observe(el);
    });
  }

  /* ---------- 7. BACK TO TOP ---------- */
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });

  /* ---------- 8. FOOTER: AUTO-UPDATING YEAR ---------- */
  document.getElementById("current-year").textContent = new Date().getFullYear();

  /* ---------- 9. PARTICLE BACKGROUND (hero only) ---------- */
  // Lightweight canvas particle field. Skips entirely on reduced-motion
  // to respect the user's system preference.
  const canvas = document.getElementById("particles");
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let width, height;
    let animationId;

    function resizeCanvas() {
      const hero = document.querySelector(".hero");
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
    }

    function createParticles() {
      // Density scales with screen area but is capped for performance
      const count = Math.min(70, Math.floor((width * height) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.15,
      }));
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 190, 77, 1)"; // matches --accent-400

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap particles around the edges instead of bouncing
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(drawParticles);
    }

    function initParticles() {
      resizeCanvas();
      createParticles();
      cancelAnimationFrame(animationId);
      drawParticles();
    }

    initParticles();

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initParticles, 200);
    });

    // Pause the animation loop when the hero isn't visible (e.g. user has
    // scrolled deep into the page) to save battery/CPU.
    const heroVisibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!animationId) drawParticles();
        } else {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      });
    });
    heroVisibilityObserver.observe(document.querySelector(".hero"));
  }

  /* ---------- 10. SMOOTH ANCHOR SCROLL FALLBACK ---------- */
  // CSS `scroll-behavior: smooth` already handles most browsers; this is
  // a safety net for older engines and ensures the mobile menu is closed
  // before scrolling begins.
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
        }
      }
    });
  });
});