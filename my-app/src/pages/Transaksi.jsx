import { useState, useEffect } from "react";
import "./style/Transaksi.css";
import Navbar from "../components/Navbar";
import MapPicker from "../components/MapPicker";
import { useNavigate } from "react-router-dom";
import { createTransaksi, uploadFoto } from "../services/transaksiService";
import { getHargaSampah } from "../services/hargaServices";
import { getAlamatUser } from "../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faWeightScale,
  faClipboardCheck,
  faPaperPlane,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    icon: faListCheck,
    title: "Pilih Jenis Sampah",
    desc: "Pilih kategori sampah yang akan kamu daur ulang.",
  },
  {
    icon: faWeightScale,
    title: "Masukkan Berat",
    desc: "Timbang sampah dan masukkan berat dalam satuan kilogram.",
  },
  {
    icon: faClipboardCheck,
    title: "Lengkapi Data",
    desc: "Isi informasi yang diperlukan dengan benar.",
  },
  {
    icon: faPaperPlane,
    title: "Ajukan Transaksi",
    desc: "Periksa kembali data dan ajukan transaksi kamu.",
  },
  {
    icon: faCircleCheck,
    title: "Tunggu Konfirmasi",
    desc: "Tunggu konfirmasi dari pengepul dan transaksi selesai.",
  },
];

function Transaksi() {
  const [hargaSampah, setHargaSampah] = useState([]);

  const [kategori, setKategori] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [berat, setBerat] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [foto, setFoto] = useState(null);
  const navigate = useNavigate();
  const dataKategori = hargaSampah.find((item) => item.kategori === kategori);
  const harga100gr = dataKategori ? Number(dataKategori.harga) : 0;
  const hargaPerKg = harga100gr * 10;
  const beratKg = Number(berat) || 0;
  const beratGram = beratKg * 1000;
  const totalharga =
    beratGram > 0 && harga100gr > 0 ? (beratGram / 100) * harga100gr : 0;

  useEffect(() => {
    const loadData = async () => {
      const data = await getHargaSampah();
      setHargaSampah(data);

      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        const data = await getAlamatUser(user.id);
        setLokasi(data.alamat);
      }
    };

    loadData();
  }, []);

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

    const uploadData = await uploadFoto(formData);
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
      const data = await createTransaksi(transaksiBaru);

      alert(data.message);
      navigate("/dashboard");

      setKategori("");
      setKeterangan("");
      setBerat("");
      setFoto(null);
    } catch (error) {
      console.error(error);
      alert("Gagal mengirim transaksi");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="transaksi-page">
        {/* ===== ATAS: PANDUAN STEP BY STEP (HORIZONTAL) ===== */}
        <div className="panduan-box">
          <h1 className="panduan-title">Tata Cara Mengisi Transaksi</h1>

          <div className="panduan-steps">
            {steps.map((step, index) => (
              <div className="panduan-step" key={index}>
                <div className="step-card">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-icon">
                    <FontAwesomeIcon icon={step.icon} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>

                {index < steps.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </div>

        {/* ===== BAWAH: FORM TRANSAKSI ===== */}
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
                accept="image/*"
                onChange={(e) => setFoto(e.target.files[0])}
              />

              <label>Alamat Penjemputan</label>
              <input
                type="text"
                placeholder="Alamat diambil dari profil, bisa diubah"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
              />

              <div className="hasil">
                <p>
                  Harga / Kg <strong>Rp {hargaPerKg.toLocaleString()}</strong>
                </p>
                <p>
                  Berat <strong>{beratKg} Kg</strong>
                </p>
                <p>
                  Konversi <strong>{beratGram.toLocaleString()} Gram</strong>
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
