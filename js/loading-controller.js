/**
 * loading-controller.js — CONTROLLER
 * ------------------------------------------------------------
 * Menampilkan layar loading dengan hati-hati kecil yang melayang
 * naik, selagi halaman (font, gambar hero, dll) masih dimuat.
 * Layar ini memudar begitu semuanya siap DAN durasi tampil
 * minimum sudah lewat (supaya animasinya tidak "kedip" sekilas
 * kalau koneksi kencang).
 * ------------------------------------------------------------
 */

(function () {
  const MIN_VISIBLE_MS = 1400;
  const SAFETY_TIMEOUT_MS = 4000;
  const HEART_COUNT = 14;
  const HEART_PATH =
    "M12 21s-7.5-4.6-10.2-9.3C.2 8.9 1.4 5.7 4.3 4.8c2-.6 4 .1 5.2 1.9L12 9.4l2.5-2.7c1.2-1.8 3.2-2.5 5.2-1.9 2.9.9 4.1 4.1 2.5 6.9C19.5 16.4 12 21 12 21z";

  function buildHeart() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.classList.add("loading-heart");
    svg.setAttribute("aria-hidden", "true");

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", HEART_PATH);
    path.setAttribute("fill", "currentColor");
    svg.appendChild(path);

    const left = 4 + Math.random() * 92; // posisi horizontal (%)
    const size = 12 + Math.random() * 16; // px
    const duration = 2600 + Math.random() * 2200; // ms
    const delay = Math.random() * 1800; // ms
    const drift = (Math.random() - 0.5) * 70; // px, geser kiri/kanan selama melayang

    svg.style.left = `${left}%`;
    svg.style.width = `${size}px`;
    svg.style.height = `${size}px`;
    svg.style.animationDuration = `${duration}ms`;
    svg.style.animationDelay = `${delay}ms`;
    svg.style.setProperty("--drift", `${drift}px`);

    return svg;
  }

  function buildScene() {
    const scene = document.getElementById("loading-scene");
    if (!scene) return;
    for (let i = 0; i < HEART_COUNT; i++) {
      scene.appendChild(buildHeart());
    }
  }

  function hideLoadingScreen() {
    const screen = document.getElementById("loading-screen");
    if (!screen) return;
    screen.classList.add("is-hidden");
    screen.setAttribute("aria-hidden", "true");
    window.setTimeout(() => screen.remove(), 700);
  }

  function init() {
    buildScene();

    const start = Date.now();
    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(hideLoadingScreen, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      // Jaring pengaman kalau ada aset yang gagal/lambat dimuat,
      // supaya pengunjung tidak terjebak di layar loading selamanya.
      window.setTimeout(finish, SAFETY_TIMEOUT_MS);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();