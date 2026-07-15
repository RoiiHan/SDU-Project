const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sdu_db",
});

db.connect((err) => {
  if (err) {
    console.log("koneksi gagal");
    console.log(err);
    return;
  }
  console.log("Database berhasil terhubung");
});

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/transaksi");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

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

app.post("/upload-foto", upload.single("foto"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "foto tidak ditemukan",
    });
  }

  res.json({
    message: "upload foto berhasil",
    filename: req.file.filename,
  });
});

app.get("/transaksi", (req, res) => {
  const sql = "SELECT * FROM transaksi ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil data",
      });
    }

    res.json(result);
  });
});

app.get("/transaksi/user/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = "SELECT * FROM transaksi WHERE user_id = ? ORDER BY id DESC";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil data",
      });
    }

    res.json(result);
  });
});

app.post("/transaksi", (req, res) => {
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

  const sql = `INSERT INTO transaksi (user_id,kategori,keterangan,berat,lokasi,latitude,longitude,harga100gr,totalharga,status,foto) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

  db.query(
    sql,
    [
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
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Gagal menyimpan transaksi",
        });
      }

      res.json({
        message: "Transaksi berhasil disimpan",
      });
    },
  );
});

app.get("/dashboard", (req, res) => {
  const sql = `SELECT COUNT(*) AS totalTransaksi,SUM(berat) AS totalBerat,SUM(totalharga) AS totalPendapatan FROM transaksi`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Gagal mengambil data dashboard",
      });
    }
    res.json(result[0]);
  });
});

app.get("/dashboard/user/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `SELECT COUNT(*) AS totalTransaksi, SUM(berat) AS totalBerat,SUM(totalharga) AS totalPendapatan FROM transaksi WHERE user_id = ? `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil data dashboard",
      });
    }

    res.json(result[0]);
  });
});

app.post("/register", (req, res) => {
  const { nama, no_hp, alamat, password } = req.body;
  if (!nama || !no_hp || !alamat || !password) {
    return res.status(400).json({
      message: "Semua data wajib diisi",
    });
  }

  const role = "user";

  const sql = `
    INSERT INTO user
    (
      nama,
      no_hp,
      alamat,
      password,
      role
    )
    VALUES (?,?,?,?,?)
  `;

  db.query(sql, [nama, no_hp, alamat, password, role], (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal membuat akun",
      });
    }

    res.json({
      message: "Registrasi berhasil",
    });
  });
});

app.post("/login", (req, res) => {
  const { no_hp, password } = req.body;

  const sql = "SELECT * FROM user WHERE no_hp =? AND password=?";

  db.query(sql, [no_hp, password], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Server Eror",
      });
    }
    if (result.length === 0) {
      return res.status(401).json({
        message: "Nomor HP atau password salah",
      });
    }

    res.json({
      message: "Login Berhasil",
      user: result[0],
    });
  });
});

app.get("/admin/transaksi/", (req, res) => {
  const sql = `SELECT transaksi.*,user.nama,user.no_hp FROM transaksi JOIN user ON transaksi.user_id = user.id ORDER BY transaksi.id DESC`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil data transaksi",
      });
    }

    res.json(result);
  });
});

app.put("/admin/transaksi/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE transaksi SET status = ? WHERE id=?";

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengupdate status ",
      });
    }

    res.json({
      message: "Status berhasil di perbarui",
    });
  });
});

app.get("/admin/dashboard", (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM user) AS totalUser,
      COUNT(*) AS totalTransaksi,
      SUM(berat) AS totalBerat,
      SUM(totalharga) AS totalPendapatan
    FROM transaksi
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil data dashboard",
      });
    }

    res.json(result[0]);
  });
});

app.get("/admin/status-transaksi", (req, res) => {
  const sql = `
    SELECT
      status,
      COUNT(*) AS total
    FROM transaksi
    GROUP BY status
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil statistik status",
      });
    }

    res.json(result);
  });
});

app.get("/admin/transaksi-terbaru", (req, res) => {
  const sql = `SELECT transaksi.*, user.nama FROM transaksi JOIN user ON transaksi.user_id = user.id ORDER BY transaksi.created_at DESC LIMIT 5`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Gagal mengambil transaksi terbaru",
      });
    }

    res.json(result);
  });
});

app.get("/admin/user-terbaru", (req, res) => {
  const sql = `
    SELECT id, nama, no_hp, created_at
    FROM user
    WHERE role = 'user'
    ORDER BY created_at DESC
    LIMIT 5
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil user terbaru",
      });
    }

    res.json(result);
  });
});

app.get("/admin/grafik-transaksi", (req, res) => {
  const sql = `
    SELECT
      MONTH(created_at) AS bulan,
      COUNT(*) AS total
    FROM transaksi
    GROUP BY MONTH(created_at)
    ORDER BY MONTH(created_at)
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil data grafik",
      });
    }

    res.json(result);
  });
});

app.get("/admin/grafik-kategori", (req, res) => {
  const sql = `
    SELECT
      kategori,
      COUNT(*) AS total
    FROM transaksi
    GROUP BY kategori
    ORDER BY total DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil data kategori",
      });
    }

    res.json(result);
  });
});

app.get("/harga", (req, res) => {
  const sql = "SELECT * FROM harga_sampah";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "gagal mengambil data harga",
      });
    }

    res.json(result);
  });
});

app.put("/harga/:id", (req, res) => {
  const { id } = req.params;
  const { harga } = req.body;

  const sql = "UPDATE harga_sampah SET harga100gr = ? WHERE id = ?";

  db.query(sql, [harga100gr, id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengupdate harga",
      });
    }

    res.json({
      message: "Harga berhasil di perbarui",
    });
  });
});

app.get("/admin/harga", (req, res) => {
  const sql = "SELECT * FROM harga_sampah ORDER BY id ASC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil data harga",
      });
    }

    res.json(result);
  });
});

app.put("/admin/harga/:id", (req, res) => {
  const { id } = req.params;
  const { harga } = req.body;

  const sql = "UPDATE harga_sampah SET harga = ? WHERE id= ? ";

  db.query(sql, [harga, id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengupdate harga",
      });
    }

    res.json({
      message: "Harga berhasil di update",
    });
  });
});

app.get("/admin/user", (req, res) => {
  const sql = `
    SELECT
      user.id,
      user.nama,
      user.no_hp,
      COUNT(transaksi.id) AS totalTransaksi,
      COALESCE(SUM(transaksi.berat), 0) AS totalBerat,
      COALESCE(SUM(transaksi.totalharga), 0) AS totalPendapatan
    FROM user
    LEFT JOIN transaksi ON user.id = transaksi.user_id
    WHERE user.role = 'user'
    GROUP BY user.id
    ORDER BY user.nama ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil data user",
      });
    }

    res.json(result);
  });
});

app.get("/admin/user/:id", (req, res) => {
  const { id } = req.params;

  const sqlUser = `
  SELECT
    user.id,
    user.nama,
    user.no_hp,
    user.alamat,
    user.foto_profil,
    COUNT(transaksi.id) AS totalTransaksi,
    COALESCE(SUM(transaksi.berat),0) AS totalBerat,
    COALESCE(SUM(transaksi.totalharga),0) AS totalPendapatan
  FROM user
  LEFT JOIN transaksi
    ON user.id = transaksi.user_id
  WHERE user.id = ?
  GROUP BY user.id
`;

  const sqlTransaksi = `
    SELECT *
    FROM transaksi
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sqlUser, [id], (err, userResult) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Gagal mengambil data user",
      });
    }

    db.query(sqlTransaksi, [id], (err, transaksiResult) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Gagal mengambil transaksi user",
        });
      }

      res.json({
        user: userResult[0],
        transaksi: transaksiResult,
      });
    });
  });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      id,
      nama,
      no_hp,
      alamat,
      foto_profil
    FROM user
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal mengambil profil",
      });
    }

    res.json(result[0]);
  });
});

app.put("/user/:id", (req, res) => {
  const { id } = req.params;

  const { nama, no_hp, alamat, foto_profil } = req.body;

  const sql = `
    UPDATE user
    SET
      nama = ?,
      no_hp = ?,
      alamat = ?,
      foto_profil = ?
    WHERE id = ?
  `;

  db.query(sql, [nama, no_hp, alamat, foto_profil, id], (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Gagal update profil",
      });
    }

    res.json({
      message: "Profil berhasil diperbarui",
    });
  });
});

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

app.listen(5000, () => {
  console.log("Server Berjalan di port 5000");
});
