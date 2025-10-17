# Kazumi - Dasbor ERP & E-commerce

Aplikasi web modern dan komprehensif yang berfungsi sebagai sistem ERP (Enterprise Resource Planning) internal dan platform E-commerce untuk pelanggan. Dibuat untuk bisnis pakaian, aplikasi ini mengintegrasikan semua aspek operasional mulai dari perhitungan HPP, manajemen produksi, gudang, penjualan, penggajian, hingga interaksi dengan pelanggan.

![App Screenshot Placeholder](https://placehold.co/1200x600/e2e8f0/64748b?text=Screenshot+Aplikasi+Kazumi)

## Fitur Utama

Aplikasi ini dibagi menjadi dua portal utama: Dasbor Internal untuk staf dan Katalog E-commerce untuk pelanggan, dengan fitur-fitur canggih di setiap bagian.

### Dasbor Internal (Staf & Admin)

-   **Otentikasi & Peran:** Sistem login terpisah untuk staf dengan kontrol akses berbasis peran (Super Admin, Admin, Anggota Departemen).
-   **Dasbor Rekapitulasi:** Visualisasi data real-time untuk total pendapatan, item terjual, nilai stok, tren penjualan, dan statistik produksi.
-   **Manajemen Produksi:**
    -   Kalkulator Harga Pokok Produksi (HPP) yang dinamis.
    -   Memproses permintaan produksi dari gudang.
    -   Pencatatan laporan produksi yang otomatis mengurangi stok bahan baku.
-   **Manajemen Gudang:**
    -   Manajemen stok untuk material mentah dan barang jadi.
    -   Penerimaan barang dari produksi.
    -   Alur kerja permintaan produksi ke departemen terkait saat stok menipis.
    -   Proses pesanan online: konfirmasi pembayaran, persiapan, hingga pengiriman.
    -   Fitur penyesuaian stok manual dengan alur persetujuan.
-   **Point of Sale (POS):** Antarmuka kasir untuk mencatat penjualan offline, lengkap dengan manajemen keranjang dan diskon.
-   **Manajemen Akun:**
    -   Persetujuan akun baru untuk staf dan pelanggan.
    -   Pengelolaan profil, peran, departemen, dan gaji pokok.
    -   Fitur sanksi (peringatan, skorsing) hingga proses pemberhentian (terminasi) dengan alur konfirmasi.
-   **Manajemen Kinerja Pegawai:**
    -   Sistem poin kinerja otomatis berdasarkan absensi, disiplin (laporan sholat), dan sanksi.
    -   Pemberian poin manual untuk inisiatif dan produktivitas.
    -   Dasbor visual untuk memantau skor dan riwayat kinerja.
-   **Penggajian (Payroll):**
    -   Memproses gaji bulanan dengan tunjangan dan potongan dinamis.
    -   Riwayat penggajian untuk admin dan pegawai.
    -   Alur konfirmasi penerimaan gaji oleh pegawai.
-   **Manajemen Promo & E-commerce:**
    -   Membuat kode promo (persentase/potongan tetap) dan diskon produk.
    -   Alur persetujuan promo oleh Super Admin.
    -   Memberikan voucher khusus untuk pelanggan setia.
-   **Keterlibatan Pegawai:**
    -   Papan pesan untuk pengumuman internal.
    -   Survei kepuasan pegawai dengan rekapitulasi hasil anonim.
-   **Laporan & Ekspor:**
    -   Laporan penjualan, produksi, dan riwayat stok dengan filter tanggal.
    -   Ekspor laporan penting ke format PDF.
-   **Absensi & Laporan Sholat:** Fitur absensi harian dengan bukti foto dan pelaporan sholat untuk poin disiplin.
-   **Panduan SOP:** Halaman khusus berisi Standar Operasional Prosedur untuk setiap departemen.

### Portal Pelanggan (E-commerce)

-   **Otentikasi Pelanggan:** Sistem pendaftaran dan login terpisah untuk pelanggan.
-   **Katalog Produk:** Galeri produk dengan filter, gambar, dan detail harga (termasuk harga diskon).
-   **Keranjang Belanja:** Fungsionalitas penuh untuk menambah, mengubah jumlah, dan menghapus item.
-   **Proses Checkout:**
    -   Formulir alamat pengiriman yang lengkap.
    -   Integrasi API backend untuk perhitungan ongkos kirim real-time (simulasi).
    -   Penerapan kode promo.
    -   Sistem pembayaran via transfer bank dengan unggah bukti pembayaran.
-   **Manajemen Pesanan:**
    -   Halaman riwayat pesanan untuk melacak status.
    -   Fitur pelacakan paket (simulasi) dengan nomor resi.
-   **Manajemen Profil:** Pelanggan dapat mengelola data pribadi dan alamat pengiriman utama.

## Tumpukan Teknologi

-   **Backend:**
    -   **Runtime:** Node.js
    -   **Framework:** Express.js
    -   **Middleware:** CORS
-   **Frontend:**
    -   **Library:** React, TypeScript
    -   **Styling:** Tailwind CSS
    -   **Animasi:** Framer Motion
    -   **Grafik & Chart:** Chart.js
    -   **PDF Generation:** jsPDF, jspdf-autotable
-   **Database:**
    -   File JSON flat (`db.json`) sebagai database untuk kemudahan portabilitas dan setup (cocok untuk demo/prototipe).

## Struktur Proyek

```
/
├── public/
│   └── uploads/          # Direktori untuk menyimpan gambar yang diunggah
├── components/
│   ├── ui/               # Komponen UI dasar (Button, Card, Modal, dll.)
│   └── ...               # Komponen lain yang lebih kompleks
├── hooks/                # Custom React hooks (useToast)
├── lib/                  # Logika bisnis, data statis, dan helper
│   ├── calculations.ts   # Logika perhitungan HPP
│   ├── data.ts           # Data awal dan konstanta
│   ├── expeditionApi.ts  # Client-side wrapper untuk API ekspedisi
│   ├── performance.ts    # Logika kalkulasi skor kinerja
│   ├── pdfGenerator.ts   # Fungsi untuk membuat laporan PDF
│   └── ...
├── pages/                # Komponen untuk setiap halaman/fitur utama
├── types/                # Definisi tipe TypeScript
├── App.tsx               # Komponen root aplikasi React
├── index.html            # File HTML utama
├── index.tsx             # Titik masuk aplikasi React
├── server.mjs            # Server backend Express.js
├── db.json               # File database
└── README.md             # Dokumentasi proyek
```

## Menjalankan Aplikasi

Aplikasi ini berjalan sebagai proyek full-stack dengan client (React) dan server (Node.js) yang terintegrasi. Server menangani semua penyimpanan data, unggah file, dan panggilan API yang aman.

### Prasyarat

-   **Node.js dan npm:** Pastikan Anda memiliki Node.js (versi 16 atau lebih baru) dan npm. Anda dapat mengunduhnya dari [nodejs.org](https://nodejs.org/).

### Langkah 1: Instal Dependensi

Buka terminal di direktori root proyek dan jalankan perintah berikut untuk menginstal dependensi backend yang diperlukan (seperti Express dan CORS).

```bash
npm install
```

### Langkah 2: Jalankan Server

Setelah dependensi terinstal, Anda dapat memulai server backend.

```bash
npm start
```

Perintah ini akan:
1.  Memulai server web lokal, biasanya di `http://localhost:3001`.
2.  Menyajikan file statis aplikasi React (`index.html`, `index.tsx`, dll.).
3.  Menyediakan endpoint API (misalnya, `/api/data`) yang digunakan aplikasi React untuk membaca dan menulis data.

### Langkah 3: Akses Aplikasi

Buka browser web Anda dan navigasikan ke:

**http://localhost:3001**

Aplikasi akan dimuat, dan setiap perubahan yang Anda buat (misalnya, menambah penjualan atau pengguna baru) akan disimpan ke file `db.json`, membuat data Anda persisten antar sesi browser.

## API Endpoints

Server `server.mjs` menyediakan beberapa endpoint API:

-   `GET /api/data`: Mengambil seluruh state aplikasi dari `db.json`.
-   `PATCH /api/data`: Menerima pembaruan data parsial dari client dan menggabungkannya ke dalam `db.json`. Ini adalah metode penyimpanan utama yang efisien dan aman.
-   `POST /api/upload`: Menerima gambar dalam format base64, menyimpannya di direktori `/public/uploads`, dan mengembalikan URL publik.
-   `POST /api/shipping-cost`: Endpoint aman untuk menghitung ongkos kirim. Menerima data tujuan dan berat, kemudian (dalam aplikasi nyata) akan memanggil API pihak ketiga menggunakan kunci API yang disimpan di backend.
-   `POST /api/track-package`: Endpoint aman untuk melacak paket. Menerima nomor resi dan kurir.

## Rencana Pengembangan (Roadmap)

Meskipun aplikasi ini sudah sangat fungsional untuk tujuan prototipe, beberapa langkah selanjutnya dapat membawanya ke level produksi:

1.  **Migrasi Database:** Pindahkan penyimpanan data dari `db.json` ke sistem database yang lebih kuat seperti **SQLite** (untuk kemudahan) atau **PostgreSQL** (untuk skalabilitas).
2.  **Otentikasi Berbasis Token:** Ganti sistem login saat ini dengan implementasi yang lebih aman menggunakan **JSON Web Tokens (JWT)** untuk melindungi endpoint API.
3.  **Proses Build Frontend:** Integrasikan *build tool* seperti **Vite** atau **Next.js** untuk kompilasi, *bundling*, dan optimasi aset frontend, daripada menggunakan CDN.
4.  **Manajemen Variabel Lingkungan:** Pindahkan informasi sensitif seperti kunci API dan rahasia lainnya ke file `.env` dan gunakan `dotenv` untuk memuatnya di server.
5.  **Paginasi Data:** Untuk daftar data yang panjang (seperti riwayat penjualan atau log aktivitas), implementasikan paginasi di API dan frontend untuk meningkatkan performa.
6.  **Pengujian (Testing):** Tambahkan kerangka kerja pengujian seperti Jest dan React Testing Library untuk menulis unit test dan integration test.
