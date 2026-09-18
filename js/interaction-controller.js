/**
 * interaction-controller.js — CONTROLLER
 * ------------------------------------------------------------
 * Interaksi utama:
 * 1. Amplop di layar sampul: diketuk/klik untuk membuka surat,
 *    lalu mengungkap seluruh isi halaman + mulai memutar lagu.
 * 2. Tombol hati di penutup: diketuk untuk memicu ledakan
 *    confetti kecil di sekitar hati, sekaligus memunculkan
 *    ucapan melayang dengan animasi kata demi kata.
 * 3. Tombol share di penutup: menyalin link halaman ini ke
 *    clipboard, lalu menampilkan label "Link tersalin!" sebentar.
 * ------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {
  initEnvelope();
  initHeart();
  WishOverlay.init();
  initShareButton();
});

function initEnvelope() {
  const cover = document.getElementById("cover");
  const envelope = document.getElementById("envelope");
  const site = document.getElementById("site");
  const player = document.getElementById("player");

  let opened = false;

  function openEnvelope() {
    if (opened) return;
    opened = true;

    envelope.classList.add("is-opening");

    // Beri sedikit waktu untuk animasi amplop sebelum surat penuh terbuka.
    window.setTimeout(() => {
      cover.classList.add("is-open");
      site.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "";

      AudioController.reveal();
      AudioController.play();

      // Susun ulang elemen reveal yang sudah ada di viewport awal.
      requestAnimationFrame(() => {
        if (typeof initScrollReveal === "function") initScrollReveal();
      });
    }, 650);
  }

  envelope.addEventListener("click", openEnvelope);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEnvelope();
    }
  });

  // Kunci scroll selagi amplop belum dibuka.
  document.body.style.overflow = "hidden";
}

function initShareButton() {
  const button = document.getElementById("share-button");
  const label = document.getElementById("share-button-label");
  if (!button || !label) return;

  const defaultLabel = CONTENT.share.label;
  const copiedLabel = CONTENT.share.copiedLabel;
  let resetTimer;

  button.addEventListener("click", async () => {
    const url = window.location.href;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        fallbackCopy(url);
      }
    } catch (err) {
      fallbackCopy(url);
    }

    label.textContent = copiedLabel;
    button.classList.add("is-copied");
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      label.textContent = defaultLabel;
      button.classList.remove("is-copied");
    }, 2000);
  });

  function fallbackCopy(text) {
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    try { document.execCommand("copy"); } catch (err) {}
    document.body.removeChild(temp);
  }
}

function initHeart() {
  const button = document.getElementById("heart-button");
  const layer = document.getElementById("confetti-layer");
  if (!button || !layer) return;

  const colors = ["#D98A93", "#C79A4B", "#F3E7DC", "#B65B66"];

  button.addEventListener("click", () => {
    button.classList.remove("is-popped");
    // force reflow supaya animasi bisa diulang berkali-kali
    void button.offsetWidth;
    button.classList.add("is-popped");

    burstConfetti(layer, colors, button);
    WishOverlay.show();
  });
}

/* ------------------------------------------------------------
 * UCAPAN MELAYANG
 * Muncul setelah hati diketuk: kartu yang naik & membesar halus,
 * judul serta pesan yang tampil kata demi kata, dan hati-hati
 * kecil yang melayang naik di belakangnya.
 * Bisa ditutup lewat tombol, klik area gelap, atau tombol Esc,
 * dan bisa dimunculkan berkali-kali.
 * ------------------------------------------------------------ */
const WishOverlay = (() => {
  const HEART_COUNT = 18;
  const HEART_PATH =
    "M12 21s-7.5-4.6-10.2-9.3C.2 8.9 1.4 5.7 4.3 4.8c2-.6 4 .1 5.2 1.9L12 9.4l2.5-2.7c1.2-1.8 3.2-2.5 5.2-1.9 2.9.9 4.1 4.1 2.5 6.9C19.5 16.4 12 21 12 21z";

  // Posisi tetap untuk tiap foto polaroid di sekitar kartu, disusun manual
  // supaya terasa "ditebar" secara alami tanpa saling menumpuk parah.
  // top/left dalam % relatif ke layar, rotate dalam derajat.
  const PHOTO_LAYOUT = [
    { top: 10, left: 10, rotate: -9, size: 128 },
    { top: 14, left: 84, rotate: 8,  size: 118 },
    { top: 78, left: 12, rotate: 7,  size: 122 },
    { top: 82, left: 86, rotate: -7, size: 112 },
    { top: 6,  left: 47, rotate: -5, size: 100 },
    { top: 50, left: 4,  rotate: 5,  size: 104 },
    { top: 46, left: 95, rotate: -6, size: 104 },
    { top: 90, left: 50, rotate: 4,  size: 96  }
  ];

  let overlay, card, heading, message, closeBtn, heartsLayer, photosLayer;
  let isOpen = false;
  let lastFocused = null;

  function cache() {
    if (overlay) return true;
    overlay = document.getElementById("wish");
    card = document.getElementById("wish-card");
    heading = document.getElementById("wish-heading");
    message = document.getElementById("wish-message");
    closeBtn = document.getElementById("wish-close");
    heartsLayer = document.getElementById("wish-hearts");
    photosLayer = document.getElementById("wish-photos");
    return Boolean(overlay && heading && message);
  }

  // Pecah teks jadi kata-kata terpisah supaya bisa muncul berurutan.
  // Spasi tetap dipertahankan sebagai jarak antar-<span>.
  function buildWords(target, text, startDelay, step) {
    target.innerHTML = "";
    text.split(/\s+/).filter(Boolean).forEach((word, index) => {
      const span = document.createElement("span");
      span.className = "wish__word";
      span.textContent = word;
      span.style.animationDelay = `${startDelay + index * step}ms`;
      target.appendChild(span);
      target.appendChild(document.createTextNode(" "));
    });
  }

  function buildHeart() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.classList.add("wish__heart");
    svg.setAttribute("aria-hidden", "true");

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", HEART_PATH);
    path.setAttribute("fill", "currentColor");
    svg.appendChild(path);

    const size = 10 + Math.random() * 18;
    svg.style.left = `${4 + Math.random() * 92}%`;
    svg.style.width = `${size}px`;
    svg.style.height = `${size}px`;
    svg.style.animationDuration = `${2800 + Math.random() * 2400}ms`;
    svg.style.animationDelay = `${Math.random() * 1600}ms`;
    svg.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);

    return svg;
  }

  function buildHearts() {
    if (!heartsLayer) return;
    heartsLayer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < HEART_COUNT; i++) {
      fragment.appendChild(buildHeart());
    }
    heartsLayer.appendChild(fragment);
  }

  // Foto-foto polaroid yang bertebaran di sekeliling kartu ucapan.
  // Posisinya dari PHOTO_LAYOUT, sumber fotonya dari CONTENT.wish.photos.
  // Kalau salah satu foto belum ada/gagal dimuat, foto itu langsung
  // disembunyikan (bukan menampilkan kotak rusak).
  function buildPhotos() {
    if (!photosLayer) return;
    photosLayer.innerHTML = "";

    const photos = (CONTENT.wish && CONTENT.wish.photos) || [];
    const fragment = document.createDocumentFragment();

    photos.forEach((src, index) => {
      const layout = PHOTO_LAYOUT[index % PHOTO_LAYOUT.length];

      const frame = document.createElement("figure");
      frame.className = "wish__photo";
      frame.style.top = `${layout.top}%`;
      frame.style.left = `${layout.left}%`;
      frame.style.setProperty("--rotate", `${layout.rotate}deg`);
      frame.style.width = `${layout.size}px`;
      frame.style.animationDelay = `${900 + index * 140}ms`;

      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      img.addEventListener("error", () => {
        frame.style.display = "none";
      });

      frame.appendChild(img);
      fragment.appendChild(frame);
    });

    photosLayer.appendChild(fragment);
  }

  function show() {
    if (!cache() || isOpen) return;
    isOpen = true;
    lastFocused = document.activeElement;

    buildWords(heading, CONTENT.wish.heading, 260, 110);
    buildWords(message, CONTENT.wish.message, 620, 65);
    buildHearts();
    buildPhotos();

    // Reset animasi kartu supaya bisa diputar ulang tiap kali dibuka.
    card.classList.remove("is-in");
    void card.offsetWidth;
    card.classList.add("is-in");

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (closeBtn) {
      window.setTimeout(() => closeBtn.focus(), 400);
    }
  }

  function hide() {
    if (!isOpen) return;
    isOpen = false;

    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Bersihkan hati & foto melayang setelah overlay selesai memudar.
    window.setTimeout(() => {
      if (!isOpen && heartsLayer) heartsLayer.innerHTML = "";
      if (!isOpen && photosLayer) photosLayer.innerHTML = "";
    }, 600);

    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function init() {
    if (!cache()) return;

    if (closeBtn) closeBtn.addEventListener("click", hide);

    // Klik di area gelap (bukan kartunya) juga menutup.
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target === heartsLayer) hide();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hide();
    });
  }

  return { init, show, hide };
})();

function burstConfetti(layer, colors, originEl) {
  const rect = originEl.getBoundingClientRect();
  const layerRect = layer.getBoundingClientRect();
  const originX = rect.left - layerRect.left + rect.width / 2;
  const originY = rect.top - layerRect.top + rect.height / 2;

  const pieceCount = 26;

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";

    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 160;
    const drift = Math.cos(angle) * distance;
    const spin = 200 + Math.random() * 360;

    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--drift", `${drift}px`);
    piece.style.setProperty("--spin", `${spin}deg`);
    piece.style.animationDuration = `${900 + Math.random() * 700}ms`;
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";

    layer.appendChild(piece);

    piece.addEventListener("animationend", () => piece.remove());
    // Jaring pengaman kalau animationend tidak terpicu
    window.setTimeout(() => piece.remove(), 2200);
  }
}