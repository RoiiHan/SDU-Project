import { useState, useEffect } from "react";
import "./style/LandingPage.css";
import dashboardImg from "../assets/DashboardIMG.png";
import logo from "../assets/Logo.png";

// Asumsi: Kamu perlu membuat fungsi ini di file transaksiService.js
// yang memanggil endpoint API publik untuk mengambil total keseluruhan data.
import { getStatistikLandingPage } from "../services/transaksiService";

function LandingPage() {
  // 1. State untuk menyimpan data statistik real-time
  const [statistik, setStatistik] = useState({
    totalTransaksi: 0,
    totalBerat: 0, // Asumsi dari backend dikirim dalam bentuk Gram
    totalPengguna: 0,
    totalKategori: 5, // Bisa dibuat statis atau dinamis
  });

  // 2. Ambil data saat halaman pertama kali dimuat
  useEffect(() => {
    const loadStatistik = async () => {
      try {
        const data = await getStatistikLandingPage();
        if (data) {
          // Update state jika ada balasan dari backend
          setStatistik((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Gagal memuat statistik landing page:", error);
      }
    };

    loadStatistik();
  }, []);

  // 3. Fungsi pintar untuk memformat berat otomatis
  // Jika lebih dari 1000 Kg, tampilkan dalam Ton. Jika kurang, tampilkan Kg.
  const formatBeratSampah = (beratGram) => {
    const beratKg = Number(beratGram || 0) / 1000;

    if (beratKg >= 1000) {
      const beratTon = beratKg / 1000;
      return `${beratTon.toLocaleString("id-ID", { maximumFractionDigits: 1 })} Ton`;
    }

    return `${beratKg.toLocaleString("id-ID", { maximumFractionDigits: 1 })} Kg`;
  };

  return (
    <div className="landing-page">
      {/* HERO */}
      <div className="hero">
        <img src={dashboardImg} alt="Hero SDU" className="hero-image" />
      </div>

      {/* TENTANG SDU */}
      <section className="tentang">
        <div className="tentang-card">
          <div className="tentang-kiri">
            <img src={logo} alt="Tentang SDU" />
          </div>
          <div className="tentang-kanan">
            <h2>Apa Itu SDU ?</h2>
            <p>
              SDU (Sistem Daur Ulang) adalah platform yang membantu masyarakat
              menjual sampah daur ulang seperti plastik, kardus, kaleng, besi
              dan pecah belah.
            </p>
            <p>
              Melalui SDU, masyarakat dapat berkontribusi menjaga lingkungan
              sekaligus memperoleh nilai ekonomi dari sampah yang dikumpulkan.
            </p>
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section className="cara-kerja">
        <h2>Cara Kerja SDU</h2>
        <div className="cara-container">
          <div className="cara-card">
            <h3>1</h3>
            <p>Pilih Jenis Sampah</p>
          </div>
          <div className="cara-card">
            <h3>2</h3>
            <p>Masukkan Berat</p>
          </div>
          <div className="cara-card">
            <h3>3</h3>
            <p>Ajukan Transaksi</p>
          </div>
          <div className="cara-card">
            <h3>4</h3>
            <p>Terima Pembayaran</p>
          </div>
        </div>
      </section>

      {/* JENIS SAMPAH */}
      <section className="jenis-sampah">
        <h2>Jenis Sampah yang Diterima</h2>
        <div className="sampah-container">
          <div className="sampah-card">
            ♻️
            <p>Plastik</p>
          </div>
          <div className="sampah-card">
            📦
            <p>Kardus</p>
          </div>
          <div className="sampah-card">
            🥫
            <p>Kaleng</p>
          </div>
          <div className="sampah-card">
            🔩
            <p>Besi</p>
          </div>
          <div className="sampah-card">
            🍶
            <p>Pecah Belah</p>
          </div>
        </div>
      </section>

      {/* STATISTIK */}
      <section className="statistik">
        <h2>Dampak SDU</h2>
        <div className="statistik-container">
          <div className="stat-card">
            {/* Format titik ribuan dan tanda + */}
            <h3>
              {(Number(statistik.totalTransaksi) || 0).toLocaleString("id-ID")}+
            </h3>
            <p>Transaksi</p>
          </div>

          <div className="stat-card">
            {/* Format otomatis Ton/Kg menggunakan fungsi di atas */}
            <h3>{formatBeratSampah(statistik.totalBerat)}</h3>
            <p>Sampah Terkumpul</p>
          </div>

          <div className="stat-card">
            <h3>
              {(Number(statistik.totalPengguna) || 0).toLocaleString("id-ID")}+
            </h3>
            <p>Pengguna Aktif</p>
          </div>

          <div className="stat-card">
            <h3>{statistik.totalKategori}</h3>
            <p>Kategori Sampah</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>SDU - Sistem Daur Ulang</h3>
        <p>
          Mari bersama menjaga lingkungan yang lebih bersih dan berkelanjutan.
        </p>
        <p>© 2026 SDU</p>
      </footer>
    </div>
  );
}

export default LandingPage;
