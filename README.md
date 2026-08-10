# Anantalia Rental — Web Rental Mobil Direct-to-WhatsApp

Landing page katalog mobil + panel admin, dengan arsitektur **decoupled**:

```
rental-app/
├── frontend/   → React + Vite + Tailwind CSS (UI publik & admin)
└── backend/    → Node.js + Express + Prisma ORM (REST API + JWT Auth)
```

Database: **PostgreSQL** (disarankan pakai Supabase sebagai host Postgres — tapi diakses lewat Prisma di backend, bukan Supabase client di frontend).

---

## 0. Prasyarat

- Node.js versi 18 atau lebih baru
- Akun [Supabase](https://supabase.com) (atau Postgres lain) untuk connection string database
- npm

---

## 1. Setup Environment Variables

### 1.1 Backend — `backend/.env`

Salin dari contoh, lalu isi:

```bash
cd backend
cp .env.example .env
```

Isi `backend/.env`:

```env
# Ambil dari Supabase Dashboard → Project Settings → Database → Connection String
# DATABASE_URL: pakai connection pooling (port 6543) untuk runtime app
# DIRECT_URL: pakai direct connection (port 5432) untuk migrate/db push
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Buat secret acak, contoh: openssl rand -hex 32
JWT_SECRET="ganti-dengan-secret-yang-sangat-rahasia"

PORT=4000
CORS_ORIGIN="http://localhost:5173"
NODE_ENV=development
```

### 1.2 Frontend — `frontend/.env`

```bash
cd frontend
cp .env.example .env
```

Isi `frontend/.env`:

```env
VITE_API_BASE_URL="http://localhost:4000/api"
```

---

## 2. Install Dependencies

Dari **root folder** proyek (butuh `concurrently` untuk menjalankan dev server bareng):

```bash
npm install
npm run install:all
```

Atau manual satu-satu:

```bash
cd backend && npm install
cd ../frontend && npm install
```

---

## 3. Setup Database

Dari folder `backend/`:

### 3.1 Push schema Prisma ke database

Ini akan membuat tabel `cars`, `settings`, dan `admins` sesuai `prisma/schema.prisma`.

```bash
cd backend
npx prisma db push
```

### 3.2 Generate Prisma Client

Biasanya otomatis jalan setelah `db push`, tapi kalau perlu manual:

```bash
npx prisma generate
```

---

## 4. Seed Data Awal

Masih dari folder `backend/`:

### 4.1 Buat akun admin pertama

Wajib isi email & password sendiri sebagai argumen:

```bash
npm run seed:admin -- admin@anantalia.id passwordAman123 "Owner Anantalia"
```

Kalau dijalankan ulang dengan email yang sama, password akan di-update (bukan duplikat).

### 4.2 Isi data armada contoh

```bash
npm run seed:cars
```

Ini akan menambahkan 5 unit contoh (Avanza, Innova Zenix, Brio, Fortuner, Alphard) ke katalog. Aman dijalankan berkali-kali — data di-update berdasarkan nama unit, bukan duplikat.

### 4.3 Isi data tabel harga sewa contoh

```bash
npm run seed:rates
```

Menambahkan 5 baris tarif (Ayla/Agya, Xpander, Fortuner VRZ, Alphard, Hiace Premio) ke tabel "Daftar Harga Sewa Lengkap". Sama seperti seed lain, aman dijalankan berkali-kali.

> Perintah `npm run seed` = alias untuk `seed:cars` + `seed:rates` sekaligus (karena `seed:admin` butuh email/password custom, jadi sengaja dipisah).

---

## 5. Menjalankan Aplikasi (Development)

### Opsi A — Sekaligus dari root (disarankan)

```bash
npm run dev
```

Ini akan menjalankan **backend di port 4000** dan **frontend di port 5173** secara bersamaan, dengan log berwarna terpisah di satu terminal.

### Opsi B — Manual, dua terminal terpisah

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
→ berjalan di `http://localhost:4000`, cek kesehatan API di `http://localhost:4000/api/health`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
→ berjalan di `http://localhost:5173`

---

## 6. Mengakses Aplikasi

| Halaman | URL |
|---|---|
| Landing page (publik) | `http://localhost:5173` |
| Login admin | `http://localhost:5173/admin/login` |
| Dashboard admin (setelah login) | `http://localhost:5173/admin` |
| Pengaturan nomor WhatsApp | `http://localhost:5173/admin/pengaturan` |
| Kelola tabel harga sewa | `http://localhost:5173/admin/harga-sewa` |

Login admin pakai email & password yang kamu buat di langkah **4.1**.

---

## 7. Struktur API Backend (ringkas)

| Method | Endpoint | Akses | Keterangan |
|---|---|---|---|
| GET | `/api/health` | Publik | Cek server hidup |
| POST | `/api/auth/login` | Publik | Login admin, dapat JWT |
| GET | `/api/auth/me` | Protected | Validasi sesi/token |
| GET | `/api/cars` | Publik | List semua armada |
| GET | `/api/cars/:id` | Publik | Detail satu unit |
| POST | `/api/cars` | Protected | Tambah unit baru |
| PUT | `/api/cars/:id` | Protected | Edit unit |
| DELETE | `/api/cars/:id` | Protected | Hapus unit |
| GET | `/api/settings` | Publik | Ambil nomor WhatsApp aktif |
| PUT | `/api/settings` | Protected | Update nomor WhatsApp |
| GET | `/api/price-rates` | Publik | List tabel harga sewa lengkap |
| POST | `/api/price-rates` | Protected | Tambah tipe kendaraan baru di tabel harga |
| PUT | `/api/price-rates/:id` | Protected | Edit tarif satu tipe kendaraan |
| DELETE | `/api/price-rates/:id` | Protected | Hapus baris tarif |

Route **Protected** butuh header `Authorization: Bearer <token>` (token didapat dari response login, dan otomatis disisipkan oleh `frontend/src/services/api.js` setelah login lewat form admin).

---

## 8. Troubleshooting Cepat

- **Frontend error "Network Error" / gagal fetch** → pastikan backend jalan di port 4000 dan `VITE_API_BASE_URL` di `frontend/.env` sudah benar.
- **CORS error di console browser** → cek `CORS_ORIGIN` di `backend/.env` sudah sama persis dengan URL frontend (`http://localhost:5173`).
- **`prisma db push` gagal konek** → cek ulang `DATABASE_URL`/`DIRECT_URL`, pastikan password di connection string sudah di-decode dengan benar (karakter spesial perlu di-encode) dan IP kamu tidak diblokir Supabase network restrictions.
- **Login admin gagal padahal sudah seed** → pastikan menjalankan `npm run seed:admin -- <email> <password>` dari folder `backend/`, bukan root.
