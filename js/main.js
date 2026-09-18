/**
 * main.js — CONTROLLER (inisialisasi & render)
 * ------------------------------------------------------------
 * Mengambil data dari CONTENT (content.js) dan menuliskannya
 * ke elemen-elemen di index.html. File ini tidak berisi teks
 * hardcoded — semua teks datang dari content.js.
 * ------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {
  document.title = CONTENT.meta.siteTitle;

  renderCover();
  renderHero();
  renderCountdown();
  renderLetter();
  renderMoments();
  renderVideo();
  renderClosing();
  renderWish();
  renderShare();
  renderPlayer();
});

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderCover() {
  setText("cover-label", CONTENT.cover.label);
  setText("cover-name", CONTENT.cover.name);
  setText("cover-hint", CONTENT.cover.hint);
}

function renderHero() {
  setText("hero-eyebrow", CONTENT.hero.eyebrow);

  const titleEl = document.getElementById("hero-title");
  titleEl.innerHTML = CONTENT.hero.titleLines
    .map((line) => escapeHtml(line))
    .join("<br />");

  setText("hero-subtitle", CONTENT.hero.subtitle);
  setText("hero-scroll", "");

  const img = document.getElementById("hero-image");
  img.src = CONTENT.hero.image;
  img.alt = CONTENT.hero.imageAlt || "";
  img.addEventListener("error", () => {
    img.closest(".hero__media").style.background =
      "linear-gradient(160deg, #43293a, #201621)";
    img.style.display = "none";
  });
}

function renderCountdown() {
  const target = new Date(CONTENT.meta.birthdayISO + "T00:00:00");
  const now = new Date();

  // Bandingkan hanya tanggal (abaikan jam)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const diffDays = Math.round((startOfTarget - startOfToday) / (1000 * 60 * 60 * 24));

  let message;
  if (diffDays > 0) {
    message = CONTENT.countdown.before(diffDays);
  } else if (diffDays === 0) {
    message = CONTENT.countdown.today;
  } else {
    message = CONTENT.countdown.after;
  }

  setText("hero-countdown", message);
}

function renderLetter() {
  setText("letter-heading", CONTENT.letter.heading);

  const body = document.getElementById("letter-body");
  body.innerHTML = "";
  CONTENT.letter.paragraphs.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    body.appendChild(p);
  });

  setText("letter-signature", CONTENT.letter.signature);
}

function renderMoments() {
  const container = document.getElementById("moments");
  container.innerHTML = "";

  CONTENT.moments.forEach((moment) => {
    const isMarquee = moment.layout === "marquee";

    const section = document.createElement("section");
    section.className = isMarquee ? "moment moment--marquee" : "moment";
    section.id = `moment-${moment.id}`;

    const intro = document.createElement("div");
    intro.className = "moment__intro reveal";
    intro.innerHTML = `
      <p class="moment__number">${escapeHtml(moment.number)}</p>
      <h2 class="moment__title">${escapeHtml(moment.title)}</h2>
      <p class="moment__description">${escapeHtml(moment.description)}</p>
    `;

    section.appendChild(intro);
    section.appendChild(
      isMarquee ? buildMarquee(moment) : buildGrid(moment)
    );

    container.appendChild(section);
  });
}

function buildGrid(moment) {
  const grid = document.createElement("div");
  grid.className = "moment__grid reveal";

  moment.photos.forEach((photo, index) => {
    grid.appendChild(buildPhotoFrame(moment, photo, index));
  });

  return grid;
}

// Baris foto potrait yang bergeser otomatis dan pelan, tanpa perlu diklik.
// Daftar foto diduplikasi sekali supaya perputarannya terlihat menyambung
// tanpa jeda (seamless loop).
function buildMarquee(moment) {
  const viewport = document.createElement("div");
  viewport.className = "moment__marquee-viewport reveal";

  const track = document.createElement("div");
  track.className = "moment__marquee-track";
  // Kecepatan geser dibuat konsisten: makin banyak foto, makin lama durasinya.
  track.style.setProperty("--marquee-duration", `${moment.photos.length * 4.5}s`);

  const doubledPhotos = moment.photos.concat(moment.photos);
  doubledPhotos.forEach((photo, index) => {
    const isDuplicate = index >= moment.photos.length;
    track.appendChild(buildPhotoFrame(moment, photo, index % moment.photos.length, isDuplicate));
  });

  viewport.appendChild(track);
  return viewport;
}

function buildPhotoFrame(moment, photo, index, isDuplicate) {
  const figure = document.createElement("figure");
  figure.className = "photo-frame";
  figure.dataset.missingLabel = "Taruh foto di sini";

  if (isDuplicate) {
    // Salinan kedua (untuk loop tanpa jeda) disembunyikan dari pembaca layar
    // supaya tiap foto tidak diumumkan dua kali.
    figure.setAttribute("aria-hidden", "true");
  } else {
    figure.tabIndex = 0;
  }

  const img = document.createElement("img");
  img.src = moment.folder + photo.file;
  img.alt = isDuplicate ? "" : (photo.caption || `${moment.title} - foto ${index + 1}`);
  img.loading = "lazy";
  img.addEventListener("error", () => {
    figure.classList.add("is-missing");
  });

  const caption = document.createElement("figcaption");
  caption.textContent = photo.caption || "";

  figure.appendChild(img);
  figure.appendChild(caption);
  return figure;
}

function renderVideo() {
  setText("video-heading", CONTENT.video.heading);
  setText("video-description", CONTENT.video.description);

  const source = document.getElementById("video-source");
  source.src = CONTENT.video.src;

  const player = document.getElementById("video-player");
  player.poster = CONTENT.video.poster || "";
  player.load();
}

function renderClosing() {
  setText("closing-heading", CONTENT.closing.heading);

  const body = document.getElementById("closing-body");
  body.innerHTML = "";
  CONTENT.closing.paragraphs.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    body.appendChild(p);
  });

  const img = document.getElementById("closing-image");
  img.src = CONTENT.closing.image;
  img.alt = CONTENT.closing.imageAlt || "";
  img.addEventListener("error", () => {
    img.closest(".closing__media").classList.add("is-missing");
    img.style.display = "none";
  });

  setText("closing-heart-hint", CONTENT.closing.heartHint);
  setText("closing-signature", CONTENT.closing.signature);
}

// Label tombol tutup pada ucapan. Judul & pesannya sendiri dibangun ulang
// tiap kali hati diketuk (lihat interaction-controller.js) supaya animasi
// kata-per-kata bisa diputar berkali-kali.
function renderWish() {
  setText("wish-close", CONTENT.wish.closeLabel);
}

function renderShare() {
  setText("share-button-label", CONTENT.share.label);
}

function renderPlayer() {
  setText("player-title", CONTENT.audio.trackTitle);
  const source = document.getElementById("bgm-source");
  source.src = CONTENT.audio.src;
  document.getElementById("bgm").load();
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}