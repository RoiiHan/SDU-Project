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
    console.log("koneksi berhasil");
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
  res.json([
    {
      id: 1,
      kategori: "Plastik",
      berat: 500,
      totalharga: 10000,
    },
    {
      id: 2,
      kategori: "Kertas",
      berat: 300,
      totalHarga: 5000,
    },
  ]);
});

app.post("/transaksi", (req, res) => {
  const { kategori, keterangan, berat, lokasi, harga100gr, totalharga } =
    req.body;

  const sql = `INSERT INTO transaksi (kategori,keterangan,berat,lokasi,harga100gr,totalharga) VALUES (?,?,?,?,?,?)`;

  db.query(
    sql,
    [kategori, keterangan, berat, lokasi, harga100gr, totalharga],
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

app.listen(5000, () => {
  console.log("Server Berjalan di port 5000");
});
