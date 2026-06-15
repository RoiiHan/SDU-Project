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

app.post("/transaksi", (req, res) => {
  const status = "Menunggu";
  const { kategori, keterangan, berat, lokasi, harga100gr, totalharga } =
    req.body;

  const sql = `INSERT INTO transaksi (kategori,keterangan,berat,lokasi,harga100gr,totalharga,status) VALUES (?,?,?,?,?,?,?)`;

  db.query(
    sql,
    [kategori, keterangan, berat, lokasi, harga100gr, totalharga, status],
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
  const sql = `SELECT COUNT(*) AS totalTransaksi,SUM(berat) AS totalBerat,SUM(totalharga) AS totalPendapatan FROM transaksi `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal mengambil data dashboard",
      });
    }

    res.json(result[0]);
  });
});

app.get("/dashboard", (req, res) => {
  const sql = `SELECT COUNT (*) AS totalTransaksi, SUM(berat) AS totalBerat, SUM(totalharga) AS totalPendapatan FROM transaksi`;

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

app.listen(5000, () => {
  console.log("Server Berjalan di port 5000");
});
