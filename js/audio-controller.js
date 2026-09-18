/**
 * audio-controller.js — CONTROLLER
 * ------------------------------------------------------------
 * Mengendalikan pemutar lagu mengambang: play/pause dan mute.
 * Lagu baru boleh mulai diputar setelah ada interaksi pengguna
 * (amplop diketuk) karena kebijakan autoplay browser.
 * ------------------------------------------------------------
 */

const AudioController = (() => {
  let audio, player, toggleBtn, muteBtn;
  let iconPlay, iconPause, iconSound, iconMuted;

  function init() {
    audio = document.getElementById("bgm");
    player = document.getElementById("player");
    toggleBtn = document.getElementById("player-toggle");
    muteBtn = document.getElementById("player-mute");

    iconPlay = toggleBtn.querySelector(".icon-play");
    iconPause = toggleBtn.querySelector(".icon-pause");
    iconSound = muteBtn.querySelector(".icon-sound");
    iconMuted = muteBtn.querySelector(".icon-muted");

    toggleBtn.addEventListener("click", togglePlay);
    muteBtn.addEventListener("click", toggleMute);

    audio.addEventListener("play", () => setPlayingState(true));
    audio.addEventListener("pause", () => setPlayingState(false));
    audio.addEventListener("error", () => {
      player.querySelector(".player__title").textContent = "Lagu belum ditemukan";
    });

    initVideoSync();
  }

  function reveal() {
    player.classList.add("is-visible");
    player.setAttribute("aria-hidden", "false");
  }

  function play() {
    const promise = audio.play();
    if (promise && promise.catch) {
      promise.catch(() => {
        // Autoplay diblokir browser — tunggu ketukan tombol manual.
      });
    }
  }

  function pause() {
    audio.pause();
  }

  // Musik latar otomatis jeda saat video highlight diputar,
  // dan lanjut lagi saat video dijeda atau selesai.
  function initVideoSync() {
    const video = document.getElementById("video-player");
    if (!video) return;

    video.addEventListener("play", pause);
    video.addEventListener("pause", play);
    video.addEventListener("ended", play);
  }

  function togglePlay() {
    if (audio.paused) {
      play();
    } else {
      audio.pause();
    }
  }

  function toggleMute() {
    audio.muted = !audio.muted;
    iconSound.style.display = audio.muted ? "none" : "";
    iconMuted.style.display = audio.muted ? "" : "none";
  }

  function setPlayingState(isPlaying) {
    player.classList.toggle("is-playing", isPlaying);
    iconPlay.style.display = isPlaying ? "none" : "";
    iconPause.style.display = isPlaying ? "" : "none";
    toggleBtn.setAttribute(
      "aria-label",
      isPlaying ? CONTENT.audio.pauseLabel : CONTENT.audio.playLabel
    );
  }

  return { init, reveal, play, pause };
})();

document.addEventListener("DOMContentLoaded", AudioController.init);