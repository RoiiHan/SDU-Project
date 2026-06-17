import { useState } from "react";
import { hargaSampah } from "../data/hargaSampah";
import "./style/Transaksi.css";
import Navbar from "../components/Navbar";
import transaksiImg from "../assets/transaksi.png";

function Transaksi() {
  const [kategori, setKategori] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [berat, setBerat] = useState("");
  const [lokasi, setLokasi] = useState("");

  const dataKategori = hargaSampah.find((item) => item.kategori === kategori);

  const harga100gr = dataKategori ? dataKategori.harga100gr : 0;

  const totalharga = berat && harga100gr ? (berat / 100) * harga100gr : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!kategori) {
      alert("Pilih jenis sampah");
      return;
    }

    if (!berat || berat <= 0) {
      alert("Masukkan berat yang valid");
      return;
    }

    const transaksiBaru = {
      user_id: user.id,
      kategori,
      keterangan,
      berat,
      lokasi,
      harga100gr,
      totalharga,
    };

    try {
      const response = await fetch("http://localhost:5000/transaksi", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(transaksiBaru),
      });
      const data = await response.json();

      console.log(data);
      alert("Transaksi berhasil dikirim");
      setKategori("");
      setKeterangan("");
      setBerat("");
      setLokasi("");
    } catch (error) {
      console.error(error);
      alert("Gagal mengirim transaksi");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="transaksi-page">
        <div className="transaksi-kiri">
          <img src={transaksiImg} alt="Transaksi SDU" />
        </div>

        <div className="transaksi-kanan">
          <div className="transaksi-container">
            <h1>Input Transaksi</h1>

            <form onSubmit={handleSubmit}>
              <label>Jenis Sampah</label>

              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              >
                <option value="">Pilih Jenis Sampah</option>

                {hargaSampah.map((item) => (
                  <option key={item.id} value={item.kategori}>
                    {item.kategori}
                  </option>
                ))}
              </select>

              <label>Keterangan</label>

              <textarea
                rows="3"
                placeholder="Contoh : Botol minuman bekas"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              />

              <label>Berat (Gram)</label>

              <input
                type="number"
                placeholder="Masukkan berat"
                value={berat}
                onChange={(e) => setBerat(e.target.value)}
              />

              <label>Lokasi Penjemputan</label>

              <input
                type="text"
                placeholder="Contoh : Padang Barat"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
              />

              <div className="hasil">
                <p>
                  Harga / 100 gram :
                  <strong>Rp {harga100gr.toLocaleString()}</strong>
                </p>

                <h3>Total : Rp {totalharga.toLocaleString()}</h3>
              </div>

              <button
                className="btn-trans"
                type="submit"
                onClick={handleSubmit}
              >
                Kirim Transaksi
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaksi;
