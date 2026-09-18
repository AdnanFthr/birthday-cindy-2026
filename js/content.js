/**
 * content.js — MODEL
 * ------------------------------------------------------------
 * Semua teks, judul, caption, dan path file ada di sini.
 * Kalau mau ganti kata-kata / foto / video / lagu, cukup edit
 * file ini. Tidak perlu sentuh HTML, CSS, atau file JS lain.
 * ------------------------------------------------------------
 * CARA MENAMBAH / MENGURANGI FOTO:
 * Tambahkan atau hapus object { file: "...", caption: "..." }
 * di dalam array `photos` pada tiap babak (moment).
 * ------------------------------------------------------------
 */

const CONTENT = {

  meta: {
    fullName: "Cindy Aulia Nurhikmah",
    nickname: "Cindy",
    birthdayISO: "2026-09-19", // format: YYYY-MM-DD
    siteTitle: "Untuk Cindy, 19 September"
  },

  // Layar sampul — amplop yang harus disentuh/klik untuk dibuka
  cover: {
    label: "Sebuah surat kecil untuk",
    name: "Cindy Aulia Nurhikmah",
    hint: "Ketuk amplopnya untuk membuka"
  },

  // Bagian hero, muncul setelah amplop dibuka
  hero: {
    eyebrow: "19 September 2026",
    titleLines: ["Selamat Ulang Tahun,", "Cindy Aulia Nurhikmah."],
    subtitle: "Hari ini, dunia sedang merayakan hal terbaik yang pernah ada. Aku bersyukur karena kamu telah hadir didunia pada tanggal ini dan aku jadikan hari ini hari yang selalu spesial buat kamu.",
    image: "assets/images/hero.jpg",
    imageAlt: "Foto Cindy",
    scrollHint: "Gulir ke bawah"
  },

  // Pesan hitungan hari, dihitung otomatis oleh JavaScript
  countdown: {
    before: (days) => `${days} hari lagi menuju harimu. Aku sudah tidak sabar.`,
    today: "Hari ini harimu, Cindy. Selamat ulang tahun. 🎉",
    after: "Semoga hari itu jadi salah satu hari favoritmu tahun ini. 🤍"
  },

  // Surat pembuka sebelum masuk ke galeri kenangan
  letter: {
    heading: "Sebelum kamu lanjut scroll...",
    paragraphs: [
      "Aku bukan orang yang pandai merangkai kata di depan kamu langsung, jadi aku titipkan saja lewat halaman kecil ini.",
      "Setahun ini banyak hal berubah, tapi satu yang selalu sama: rasanya lega dan hangat setiap kali ada kamu di sekitarku.",
      "Yuk, kita putar ulang sedikit momen kita tahun ini. Sambil dengar lagu ini, ya."
    ],
    signature: "— dari aku, untuk Cindy"
  },

  // Babak-babak kenangan foto. Tambah/kurangi foto di array `photos`.
  moments: [
    {
      id: "cafe",
      number: "01",
      title: "Ngopi & Santai",
      description: "Banyak tempat yang sudah kita datangi bersama dan banyak hal yang sudah kita bicarakan. Obrolan panjang yang nggak pernah kerasa lama, di meja kecil yang sama.",
      folder: "assets/images/moment-cafe/",
      photos: [
        { file: "foto1.jpg", caption: "Kopken tiba-tiba banyak cabangnya, kita nyobain dech." },
        { file: "foto2.jpg", caption: "Pulang salon mampir ke cafe, Jarang banget ke Jati Asih 😏." },
        { file: "foto3.jpg", caption: "Masih masuk List aku, Foto ter-de beesstt ❤️." },
        { file: "foto4.jpg", caption: "kaget ternyata ada FM di deket Danau Duta." },
        { file: "foto5.jpg", caption: "Cafe Kai Rooftop, pulang nonton nich." },
        { file: "foto6.jpg", caption: "Kaizen nich..." },
        { file: "foto7.jpg", caption: "Bajawa tempat first date dan jadi langganan bet disitu." },
        { file: "foto8.jpg", caption: "Rooftop lagi di Agus Salim, Lupa nama Cafenya." },
        { file: "foto9.jpg", caption: "Rain cafe couple-lan tema outfit putih." },
        { file: "foto10.jpg", caption: "Bogor nich di Daong Hutan Pinus." }
      ]
    },
    {
      id: "friends",
      number: "02",
      title: "Single Shot",
      description: "Siapa nyak ini nyaaak 😘❤️❤️.",
      folder: "assets/images/moment-single-photo/",
      layout: "marquee", // baris foto potrait yang geser otomatis, pelan, tanpa perlu diklik
      photos: [
        { file: "foto1.jpg", caption: "Hari yang penuh tawa bareng orang-orang baik." },
        { file: "foto2.jpg", caption: "Kamu paling heboh kalau sudah kumpul." },
        { file: "foto3.jpg", caption: "Foto yang diambil diam-diam pas kamu nggak sadar kamera." },
        { file: "foto4.jpg", caption: "Salah satu hari terbaik tahun ini." },
        { file: "foto5.jpg", caption: "Rame, hangat, dan penuh cerita." },
        { file: "foto6.jpg", caption: "Ketawa yang nggak berhenti-berhenti malam itu." },
        { file: "foto7.jpg", caption: "Kumpul yang selalu bikin kangen kalau sudah bubar." },
        { file: "foto8.jpg", caption: "Satu lagi foto yang wajib disimpan baik-baik." }
      ]
    },
    {
      id: "night",
      number: "03",
      title: "Tiada Tempat Tanpa Foto",
      description: "Ke mana pun kita pergi, selalu ada satu jepretan yang bikin momen itu abadi.",
      folder: "assets/images/moment-night/",
      photos: [
        { file: "foto1.jpg", caption: "Malam yang aku simpan baik-baik di kepala." },
        { file: "foto2.jpg", caption: "Cahaya lampu jalan, dan senyum kamu yang lebih terang." },
        { file: "foto3.jpg", caption: "Salah satu malam paling tenang tahun ini." },
        { file: "foto4.jpg", caption: "Kita, dan waktu yang berjalan pelan sekali." },
        { file: "foto5.jpg", caption: "Tulis caption foto ke-5 di sini." },
        { file: "foto6.jpg", caption: "Tulis caption foto ke-6 di sini." }
      ]
    }
  ],

  // Video highlight reel
  video: {
    heading: "Satu video kecil, kumpulan dari semuanya",
    description: "Kalau foto-foto di atas belum cukup, ini versi bergeraknya.",
    src: "assets/video/VideoSingkat.mp4",
    poster: "assets/images/hero.jpg"
  },

  // Lagu latar
  audio: {
    trackTitle: "Mashup",
    src: "assets/audio/MASHUP_Multo-WhereWeAre-MerindukanmuLagi-JakartaHariIni-Serana.mp3",
    playLabel: "Putar lagu",
    pauseLabel: "Jeda lagu"
  },

  // Penutup
  closing: {
    heading: "Terima kasih sudah jadi kamu.",
    paragraphs: [
      "Terima kasih untuk setiap tahun yang sudah kita lewati, dan untuk setiap tahun yang akan datang.",
      "Selamat ulang tahun, Cindy Aulia Nurhikmah. Semoga selalu ada alasan untuk tersenyum, hari ini dan seterusnya."
    ],
    image: "assets/images/closing.jpg",
    imageAlt: "Foto Cindy",
    heartHint: "Ketuk hatinya",
    signature: "Dengan sayang, dari aku."
  },

  // Ucapan yang muncul dengan animasi setelah tombol hati diketuk.
  // Teks di `message` boleh dipecah jadi beberapa kalimat — tiap kata
  // akan muncul berurutan secara otomatis.
  wish: {
    heading: "Happy Birthday Sayang",
    message: "Wish u all the best, tetep semangat berkarir-nya, dan makin sayang sama cuami-nya 🫂😘❤️❤️❤️",
    closeLabel: "Tutup",
    // Foto-foto kecil yang bertebaran di sekitar kartu ucapan, mirip polaroid.
    // Tambah/kurangi/ganti path di sini saja.
    photos: [
      "assets/images/closing.jpg",
      "assets/images/moment-cafe/foto3.jpg",
      "assets/images/moment-cafe/foto6.jpg",
      "assets/images/moment-cafe/foto7.jpg",
      "assets/images/moment-cafe/foto1.jpg",
      "assets/images/moment-night/foto5.jpg",
      "assets/images/moment-single-photo/foto1.jpg",
      "assets/images/moment-single-photo/foto6.jpg"
    ]
  },

  // Tombol kecil untuk menyalin link halaman ini
  share: {
    label: "Salin link",
    copiedLabel: "Link tersalin!"
  }
};