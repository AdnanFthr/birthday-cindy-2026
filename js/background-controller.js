/**
 * background-controller.js — CONTROLLER
 * ------------------------------------------------------------
 * Mengisi lapisan ambient (lihat .bg-ambience di index.html)
 * dengan dua hal:
 *   1. Bintang kecil yang berkedip pelan, jumlahnya tetap,
 *      dibuat sekali saat halaman dimuat (#bg-stars).
 *   2. Bintang jatuh (shooting star) yang melintas sesekali,
 *      dijadwalkan berulang dengan jeda acak (#bg-shooting-stars).
 * Posisi/ukuran/waktu diacak sedikit supaya terasa alami dan
 * tidak berulang — polanya sama seperti hati kecil di
 * loading-controller.js.
 * ------------------------------------------------------------
 */

(function () {
  const STAR_COUNT = 46;

  const SHOOTING_STAR_MIN_DELAY_MS = 100;
  const SHOOTING_STAR_MAX_DELAY_MS = 800;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Bintang kedip (statis, dibuat sekali) ----------

  function buildStar() {
    const star = document.createElement("span");
    star.className = "star";

    const left = Math.random() * 100; // posisi horizontal (%)
    const top = Math.random() * 100; // posisi vertikal (%)
    const size = 1 + Math.random() * 2; // px
    const duration = 2600 + Math.random() * 4200; // ms, kecepatan kedip
    const delay = Math.random() * 6000; // ms, supaya tidak berkedip bareng
    const peak = 0.6 + Math.random() * 0.4; // opacity puncak saat kedip (lebih terang)

    star.style.setProperty("--x", `${left.toFixed(2)}%`);
    star.style.setProperty("--y", `${top.toFixed(2)}%`);
    star.style.setProperty("--s", `${size.toFixed(2)}px`);
    star.style.setProperty("--peak", peak.toFixed(2));
    star.style.animationDuration = `${duration.toFixed(0)}ms`;
    star.style.animationDelay = `${delay.toFixed(0)}ms`;

    return star;
  }

  function buildStarField() {
    const container = document.getElementById("bg-stars");
    if (!container) return;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < STAR_COUNT; i++) {
      fragment.appendChild(buildStar());
    }
    container.appendChild(fragment);
  }

  // ---------- Bintang jatuh (dinamis, muncul lalu hilang) ----------

  function spawnShootingStar() {
    const container = document.getElementById("bg-shooting-stars");
    if (!container) return;

    const star = document.createElement("span");
    star.className = "shooting-star";

    const top = Math.random() * 45; // % dari atas, biar melintas di area langit
    const left = Math.random() * 70; // % dari kiri
    const angle = -16 - Math.random() * 16; // derajat kemiringan lintasan
    const length = 90 + Math.random() * 70; // px, panjang ekor cahaya
    const travel = 260 + Math.random() * 240; // px, jarak tempuh
    const duration = 850 + Math.random() * 500; // ms, kecepatan melintas

    star.style.setProperty("--top", `${top.toFixed(2)}%`);
    star.style.setProperty("--left", `${left.toFixed(2)}%`);
    star.style.setProperty("--angle", `${angle.toFixed(1)}deg`);
    star.style.setProperty("--travel", `${travel.toFixed(0)}px`);
    star.style.width = `${length.toFixed(0)}px`;
    star.style.animationDuration = `${duration.toFixed(0)}ms`;

    container.appendChild(star);

    // Bersihkan elemen setelah animasinya selesai supaya DOM tidak menumpuk.
    window.setTimeout(() => star.remove(), duration + 150);
  }

  function scheduleNextShootingStar() {
    const delay =
      SHOOTING_STAR_MIN_DELAY_MS +
      Math.random() * (SHOOTING_STAR_MAX_DELAY_MS - SHOOTING_STAR_MIN_DELAY_MS);

    window.setTimeout(() => {
      spawnShootingStar();
      scheduleNextShootingStar();
    }, delay);
  }

  function init() {
    buildStarField();

    // Kalau pengunjung minta gerakan diminimalkan, cukup tampilkan
    // bintang kedip yang statis; jangan jadwalkan bintang jatuh.
    if (!prefersReducedMotion) {
      scheduleNextShootingStar();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();