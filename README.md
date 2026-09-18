# Untuk Cindy — Mini Website Ucapan Ulang Tahun

Website ucapan ulang tahun untuk **Cindy Aulia Nurhikmah**, 19 September 2026.
Konsep: "surat malam" — amplop yang dibuka, surat singkat, tiga babak kenangan
foto, satu video highlight, lagu latar, dan penutup interaktif.

## 1. Cara membuka di komputer kamu

Tidak perlu instalasi apa pun. Cukup:

1. Pastikan struktur folder tetap seperti ini (lihat bagian 3).
2. Buka file `index.html` langsung di browser (Chrome/Safari/Firefox),
   **atau** — lebih disarankan — jalankan local server kecil supaya video/audio
   pasti termuat dengan benar:
   - Kalau ada Python: buka terminal di folder `Birthday-Project`, jalankan
     `python3 -m http.server 8000`, lalu buka `http://localhost:8000` di browser.
   - Kalau pakai VS Code: install extension "Live Server", klik kanan
     `index.html` → "Open with Live Server".

## 2. Isi dengan foto, video, dan lagu kamu sendiri

Ganti file-file placeholder di `assets/` dengan file asli kamu, **gunakan nama
file yang sama persis** (atau sesuaikan nama di `js/content.js`):

| Taruh di sini | Untuk apa |
|---|---|
| `assets/images/hero.jpg` | Foto utama di layar hero (setelah amplop dibuka) |
| `assets/images/moment-cafe/foto1.jpg` … `foto10.jpg` | Babak "Ngopi & Santai" (10 foto) |
| `assets/images/moment-friends/foto1.jpg` … `foto8.jpg` | Babak "Bareng Teman-Teman" (8 foto potrait, geser otomatis) |
| `assets/images/moment-night/foto1.jpg` … `foto4.jpg` | Babak "Tiada Tempat Tanpa Foto" (4 foto) |
| `assets/images/closing.jpg` | Foto di section penutup |
| `assets/video/highlight-reel.mp4` | Video highlight/recap |
| `assets/audio/what-if-i-call.mp3` | Lagu latar |

Tips:
- Kompres video & foto dulu (misalnya lewat HandBrake / TinyPNG) supaya halaman
  tetap cepat dibuka, terutama di HP.
- Foto sebaiknya rasio potret (4:5) atau lanskap (16:10) — grid sudah didesain
  untuk kombinasi keduanya.
- Khusus babak "Bareng Teman-Teman": semua 8 foto tampil dalam rasio **potret
  (4:5)** dan bergeser otomatis ke samping secara pelan, tanpa perlu diklik.
  Pakai foto yang memang orientasi potret supaya tidak terpotong aneh.
- Kalau jumlah foto per babak mau ditambah/dikurangi, edit array `photos` di
  `js/content.js` (tidak perlu sentuh HTML/CSS).

## 3. Mengubah teks / kata-kata

Semua teks (judul, surat, caption foto, pesan penutup) ada di satu file:
**`js/content.js`**. Edit teks di sana, simpan, refresh browser — selesai.

## 4. Struktur folder

```
Birthday-Project/
├── index.html
├── README.md
├── css/
│   ├── style.css
│   └── animations.css
├── js/
│   ├── content.js
│   ├── main.js
│   ├── scroll-controller.js
│   ├── audio-controller.js
│   └── interaction-controller.js
└── assets/
    ├── images/
    │   ├── hero.jpg
    │   ├── moment-cafe/
    │   ├── moment-friends/
    │   ├── moment-night/
    │   └── closing.jpg
    ├── video/
    │   └── highlight-reel.mp4
    └── audio/
        └── what-if-i-call.mp3
```

## 5. Deploy / kirim ke Cindy

Cara termudah supaya bisa dibuka lewat link tanpa install apa-apa:

- **Netlify Drop** (paling gampang): buka https://app.netlify.com/drop, seret
  folder `Birthday-Project` ke halaman itu, langsung dapat link publik.
- **GitHub Pages**: upload isi folder ke repo GitHub, aktifkan GitHub Pages di
  Settings → Pages, pilih branch `main`.
- Atau zip seluruh folder dan kirim langsung — bisa dibuka lokal dengan klik
  dua kali `index.html`.

## 6. Catatan teknis singkat

- File audio otomatis mencoba diputar begitu amplop diketuk (butuh interaksi
  pengguna karena kebijakan browser). Ada tombol play/pause & mute mengambang
  di kiri bawah.
- Section "Countdown" di bawah judul hero dihitung otomatis dari tanggal hari
  ini dibandingkan `meta.birthdayISO` (19 September 2026) di `content.js`.
- Kalau ada foto/video/lagu yang belum ditaruh, halaman tidak akan rusak — foto
  yang hilang akan menampilkan kotak placeholder halus bertuliskan
  "Taruh foto di sini".
- Sudah responsif untuk HP (layout satu kolom, player jadi lebar penuh) dan
  desktop (layout dua kolom, grid foto lebih lega).