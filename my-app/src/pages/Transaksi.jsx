import { useState, useEffect } from "react";
import "./style/Transaksi.css";
import Navbar from "../components/Navbar";
import transaksiImg from "../assets/transaksi.png";
import MapPicker from "../components/MapPicker";

function Transaksi() {
  const [hargaSampah, setHargaSampah] = useState([]);

  const [kategori, setKategori] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [berat, setBerat] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [foto, setFoto] = useState([null]);

  useEffect(() => {
    fetch("http://localhost:5000/harga")
      .then((res) => res.json())
      .then((data) => {
        setHargaSampah(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dataKategori = hargaSampah.find((item) => item.kategori === kategori);

  const harga100gr = dataKategori ? Number(dataKategori.harga) : 0;

  const hargaPerKg = harga100gr * 10;

  const beratKg = Number(berat) || 0;
  const beratGram = beratKg * 1000;

  const totalharga =
    beratGram > 0 && harga100gr > 0 ? (beratGram / 100) * harga100gr : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!kategori) {
      alert("Pilih jenis sampah");
      return;
    }

    if (!berat || beratKg <= 0) {
      alert("Masukkan berat yang valid");
      return;
    }

    if (!lokasi) {
      alert("Masukkan lokasi penjemputan");
      return;
    }

    if (!latitude || !longitude) {
      alert("silahkan pilih lokasi pada peta");
      return;
    }

    if (!foto) {
      alert("Masukkan Foto Sampah ");
      return;
    }

    let namaFileFoto = "";

    const formData = new FormData();

    formData.append("foto", foto);

    const uploadResponse = await fetch("http://localhost:5000/upload-foto", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadResponse.json();

    namaFileFoto = uploadData.filename;

    const transaksiBaru = {
      user_id: user.id,
      kategori,
      keterangan,
      berat: beratGram,
      lokasi,
      latitude,
      longitude,
      harga100gr,
      totalharga,
      foto: namaFileFoto,
    };

    try {
      const response = await fetch("http://localhost:5000/transaksi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaksiBaru),
      });

      const data = await response.json();

      alert(data.message);

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

              <label>Berat (Kilogram)</label>

              <input
                type="number"
                step="0.1"
                min="0"
                placeholder="Contoh : 5.7"
                value={berat}
                onChange={(e) => setBerat(e.target.value)}
              />

              <label>Lokasi Penjemputan</label>
              <MapPicker
                setLatitude={setLatitude}
                setLongitude={setLongitude}
              />
              <label>Foto Sampah</label>
              <input
                type="file"
                accept="image/"
                onChange={(e) => setFoto(e.target.files[0])}
              />
              <p>
                Latitude: {latitude} Longitude: {longitude}
              </p>

              <input
                type="text"
                placeholder="Contoh : Padang Barat"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
              />

              <div className="hasil">
                <p>
                  Harga / Kg :<strong> Rp {hargaPerKg.toLocaleString()}</strong>
                </p>

                <p>
                  Berat :<strong> {beratKg} Kg</strong>
                </p>

                <p>
                  Konversi :<strong> {beratGram.toLocaleString()} Gram</strong>
                </p>

                <h3>Total : Rp {totalharga.toLocaleString()}</h3>
              </div>
              <button className="btn-trans" type="submit">
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
