const express = require("express");
const cors = require("cors");

const app = express();

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
  console.log(req.body);

  res.json({
    message: "Transaksi berhasil diterima",
  });
});

app.listen(5000, () => {
  console.log("Server Berjalan di port 5000");
});
