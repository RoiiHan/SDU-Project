const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { Pool } = require("pg");

const app = express();

const db = new Pool({
  host: "aws-0-ap-southeast-2.pooler.supabase.com",
  port: 5432,
  user: "postgres.hizkqanomlmnudciwjiq",
  password: "sduportofolio123",
  database: "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});

// =========================
// Koneksi Database
// =========================
(async () => {
  try {
    await db.connect();
    console.log("Database berhasil terhubung");
  } catch (err) {
    console.log("Koneksi gagal");
    console.log(err);
  }
})();

app.use(cors());
app.use(express.json());

// =========================
// Upload Foto Transaksi
// =========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/transaksi");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// =========================
// Upload Foto Profil
// =========================
const storageProfil = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profil");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const uploadProfil = multer({
  storage: storageProfil,
});

const upload = multer({
  storage,
});

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Backend SDU Berjalan");
});

// =========================
// Upload Foto
// =========================
app.post("/upload-foto", upload.single("foto"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Foto tidak ditemukan",
    });
  }

  res.json({
    message: "Upload foto berhasil",
    filename: req.file.filename,
  });
});

// =========================
// Ambil Semua Transaksi
// =========================
app.get("/transaksi", async (req, res) => {
  try {
    const sql = `
      SELECT *
      FROM transaksi
      ORDER BY id DESC
    `;

    const result = await db.query(sql);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data",
    });
  }
});

// =========================
// Transaksi Berdasarkan User
// =========================
app.get("/transaksi/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const sql = `
      SELECT *
      FROM transaksi
      WHERE user_id = $1
      ORDER BY id DESC
    `;

    const result = await db.query(sql, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data",
    });
  }
});

// =========================
// Tambah Transaksi
// =========================
app.post("/transaksi", async (req, res) => {
  try {
    const status = "Menunggu";

    const {
      user_id,
      kategori,
      keterangan,
      berat,
      lokasi,
      latitude,
      longitude,
      harga100gr,
      totalharga,
      foto,
    } = req.body;

    const sql = `
      INSERT INTO transaksi
      (
        user_id,
        kategori,
        keterangan,
        berat,
        lokasi,
        latitude,
        longitude,
        harga100gr,
        totalharga,
        status,
        foto
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
      )
      RETURNING *
    `;

    const result = await db.query(sql, [
      user_id,
      kategori,
      keterangan,
      berat,
      lokasi,
      latitude,
      longitude,
      harga100gr,
      totalharga,
      status,
      foto,
    ]);

    res.status(201).json({
      message: "Transaksi berhasil disimpan",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal menyimpan transaksi",
    });
  }
});

// =========================
// Dashboard Admin
// =========================
app.get("/dashboard", async (req, res) => {
  try {
    const sql = `
      SELECT
        COUNT(*) AS "totalTransaksi",
        COALESCE(SUM(berat),0) AS "totalBerat",
        COALESCE(SUM(totalharga),0) AS "totalPendapatan"
      FROM transaksi
    `;

    const result = await db.query(sql);

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data dashboard",
    });
  }
});

// =========================
// Dashboard User
// =========================
app.get("/dashboard/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const sql = `
      SELECT
        COUNT(*) AS "totalTransaksi",
        COALESCE(SUM(berat),0) AS "totalBerat",
        COALESCE(SUM(totalharga),0) AS "totalPendapatan"
      FROM transaksi
      WHERE user_id = $1
    `;

    const result = await db.query(sql, [userId]);

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data dashboard",
    });
  }
});

// =========================
// Register
// =========================
app.post("/register", async (req, res) => {
  try {
    const { nama, no_hp, alamat, password } = req.body;

    if (!nama || !no_hp || !alamat || !password) {
      return res.status(400).json({
        message: "Semua data wajib diisi",
      });
    }

    const role = "user";

    const sql = `
      INSERT INTO "user"
      (
        nama,
        no_hp,
        alamat,
        password,
        role
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `;

    await db.query(sql, [nama, no_hp, alamat, password, role]);

    res.json({
      message: "Registrasi berhasil",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal membuat akun",
    });
  }
});

// =========================
// Login
// =========================
app.post("/login", async (req, res) => {
  try {
    const { no_hp, password } = req.body;

    const sql = `
      SELECT *
      FROM "user"
      WHERE no_hp = $1
      AND password = $2
    `;

    const result = await db.query(sql, [no_hp, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Nomor HP atau password salah",
      });
    }

    res.json({
      message: "Login Berhasil",
      user: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =========================
// Semua Transaksi Admin
// =========================
app.get("/admin/transaksi", async (req, res) => {
  try {
    const sql = `
      SELECT
        transaksi.*,
        "user".nama,
        "user".no_hp
      FROM transaksi
      JOIN "user"
      ON transaksi.user_id = "user".id
      ORDER BY transaksi.id DESC
    `;

    const result = await db.query(sql);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data transaksi",
    });
  }
});

// =========================
// Update Status
// =========================
app.put("/admin/transaksi/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const sql = `
      UPDATE transaksi
      SET status = $1
      WHERE id = $2
    `;

    await db.query(sql, [status, id]);

    res.json({
      message: "Status berhasil diperbarui",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengupdate status",
    });
  }
});

// =========================
// Dashboard Admin
// =========================
app.get("/admin/dashboard", async (req, res) => {
  try {
    const sql = `
      SELECT
        (SELECT COUNT(*) FROM "user") AS "totalUser",
        COUNT(*) AS "totalTransaksi",
        COALESCE(SUM(berat),0) AS "totalBerat",
        COALESCE(SUM(totalharga),0) AS "totalPendapatan"
      FROM transaksi
    `;

    const result = await db.query(sql);

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data dashboard",
    });
  }
});

// =========================
// Statistik Status
// =========================
app.get("/admin/status-transaksi", async (req, res) => {
  try {
    const sql = `
      SELECT
        status,
        COUNT(*) AS total
      FROM transaksi
      GROUP BY status
    `;

    const result = await db.query(sql);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil statistik status",
    });
  }
});

// =========================
// Transaksi Terbaru
// =========================
app.get("/admin/transaksi-terbaru", async (req, res) => {
  try {
    const sql = `
      SELECT
        transaksi.*,
        "user".nama
      FROM transaksi
      JOIN "user"
      ON transaksi.user_id = "user".id
      ORDER BY transaksi.created_at DESC
      LIMIT 5
    `;

    const result = await db.query(sql);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil transaksi terbaru",
    });
  }
});

// =========================
// User Terbaru
// =========================
app.get("/admin/user-terbaru", async (req, res) => {
  try {
    const sql = `
      SELECT
        id,
        nama,
        no_hp,
        created_at
      FROM "user"
      WHERE role = 'user'
      ORDER BY created_at DESC
      LIMIT 5
    `;

    const result = await db.query(sql);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil user terbaru",
    });
  }
});

// =========================
// Grafik Transaksi Bulanan
// =========================
app.get("/admin/grafik-transaksi", async (req, res) => {
  try {
    const sql = `
      SELECT
        EXTRACT(MONTH FROM created_at) AS bulan,
        COUNT(*) AS total
      FROM transaksi
      GROUP BY EXTRACT(MONTH FROM created_at)
      ORDER BY EXTRACT(MONTH FROM created_at)
    `;

    const result = await db.query(sql);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data grafik",
    });
  }
});

// =========================
// Grafik Kategori Sampah
// =========================
app.get("/admin/grafik-kategori", async (req, res) => {
  try {
    const sql = `
      SELECT
        kategori,
        COUNT(*) AS total
      FROM transaksi
      GROUP BY kategori
      ORDER BY total DESC
    `;

    const result = await db.query(sql);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data kategori",
    });
  }
});

// =========================
// Harga Sampah
// =========================
app.get("/harga", async (req, res) => {
  try {
    const sql = `
      SELECT *
      FROM harga_sampah
    `;

    const result = await db.query(sql);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data harga",
    });
  }
});

// =========================
// Update Harga (User)
// =========================
app.put("/harga/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { harga } = req.body;

    const sql = `
      UPDATE harga_sampah
      SET harga = $1
      WHERE id = $2
    `;

    await db.query(sql, [harga, id]);

    res.json({
      message: "Harga berhasil diperbarui",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengupdate harga",
    });
  }
});

// =========================
// Semua Harga (Admin)
// =========================
app.get("/admin/harga", async (req, res) => {
  try {
    const sql = `
      SELECT *
      FROM harga_sampah
      ORDER BY id ASC
    `;

    const result = await db.query(sql);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data harga",
    });
  }
});

// =========================
// Update Harga Admin
// =========================
app.put("/admin/harga/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { harga } = req.body;

    const sql = `
      UPDATE harga_sampah
      SET harga = $1
      WHERE id = $2
    `;

    await db.query(sql, [harga, id]);

    res.json({
      message: "Harga berhasil diupdate",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengupdate harga",
    });
  }
});

// =========================
// Semua User (Admin)
// =========================
app.get("/admin/user", async (req, res) => {
  try {
    const sql = `
      SELECT
        "user".id,
        "user".nama,
        "user".no_hp,
        COUNT(transaksi.id) AS "totalTransaksi",
        COALESCE(SUM(transaksi.berat),0) AS "totalBerat",
        COALESCE(SUM(transaksi.totalharga),0) AS "totalPendapatan"
      FROM "user"
      LEFT JOIN transaksi
      ON "user".id = transaksi.user_id
      WHERE "user".role = 'user'
      GROUP BY
        "user".id,
        "user".nama,
        "user".no_hp
      ORDER BY "user".nama ASC
    `;

    const result = await db.query(sql);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data user",
    });
  }
});

// =========================
// Detail User (Admin)
// =========================
app.get("/admin/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sqlUser = `
      SELECT
        "user".id,
        "user".nama,
        "user".no_hp,
        "user".alamat,
        "user".foto_profil,
        COUNT(transaksi.id) AS "totalTransaksi",
        COALESCE(SUM(transaksi.berat),0) AS "totalBerat",
        COALESCE(SUM(transaksi.totalharga),0) AS "totalPendapatan"
      FROM "user"
      LEFT JOIN transaksi
      ON "user".id = transaksi.user_id
      WHERE "user".id = $1
      GROUP BY
        "user".id,
        "user".nama,
        "user".no_hp,
        "user".alamat,
        "user".foto_profil
    `;

    const sqlTransaksi = `
      SELECT *
      FROM transaksi
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;

    const userResult = await db.query(sqlUser, [id]);

    const transaksiResult = await db.query(sqlTransaksi, [id]);

    res.json({
      user: userResult.rows[0],
      transaksi: transaksiResult.rows,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil data user",
    });
  }
});

// =========================
// Profil User
// =========================
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT
        id,
        nama,
        no_hp,
        alamat,
        foto_profil
      FROM "user"
      WHERE id = $1
    `;

    const result = await db.query(sql, [id]);

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil profil",
    });
  }
});

// =========================
// Update Profil
// =========================
app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { nama, no_hp, alamat, foto_profil } = req.body;

    const sql = `
      UPDATE "user"
      SET
        nama = $1,
        no_hp = $2,
        alamat = $3,
        foto_profil = $4
      WHERE id = $5
    `;

    await db.query(sql, [nama, no_hp, alamat, foto_profil, id]);

    res.json({
      message: "Profil berhasil diperbarui",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Gagal update profil",
    });
  }
});

// =========================
// Upload Foto Profil
// =========================
app.post("/upload-profil", uploadProfil.single("foto"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Foto tidak ditemukan",
    });
  }

  res.json({
    filename: req.file.filename,
  });
});

// =========================
// Jalankan Server
// =========================
app.listen(5000, () => {
  console.log("Server Berjalan di port 5000");
});
