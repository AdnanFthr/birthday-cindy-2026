/**
 * scroll-controller.js — CONTROLLER
 * ------------------------------------------------------------
 * Menambahkan class "is-visible" ke elemen ber-class "reveal"
 * ketika elemen tersebut masuk ke area pandang (viewport),
 * sehingga muncul dengan animasi fade + slide-up halus.
 * Dijalankan ulang setiap kali moments baru dirender.
 * ------------------------------------------------------------
 */

function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal:not(.is-observed)");

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => {
    el.classList.add("is-observed");
    observer.observe(el);
  });
}

// Jalankan setelah DOM (dan render dari main.js) siap.
document.addEventListener("DOMContentLoaded", () => {
  // Beri jeda singkat agar elemen dari main.js sudah ada di DOM.
  requestAnimationFrame(() => {
    initScrollReveal();
  });
});
