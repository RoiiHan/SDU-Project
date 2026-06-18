const express = require("express");
const cors = require("cors");

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
  console.log("MySQL berhasil terhubung");
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend SDU Berjalan");
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
    harga100gr,
    totalharga,
  } = req.body;

  const sql = `INSERT INTO transaksi (user_id,kategori,keterangan,berat,lokasi,harga100gr,totalharga,status) VALUES (?,?,?,?,?,?,?,?)`;

  db.query(
    sql,
    [
      user_id,
      kategori,
      keterangan,
      berat,
      lokasi,
      harga100gr,
      totalharga,
      status,
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
  const { nama, no_hp, password } = req.body;
  const role = "user";

  const sql = "INSERT INTO user (nama,no_hp, password,role) VALUES (?,?,?,?)";

  db.query(sql, [nama, no_hp, password, role], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Gagal membuat akun",
      });
    }

    res.json({
      message: "Registrasi Berhasil ",
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

app.listen(5000, () => {
  console.log("Server Berjalan di port 5000");
});
