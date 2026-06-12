import "./style/LandingPage.css";
import dashboardImg from "../assets/DashboardIMG.png";
import logo from "../assets/Logo.png";

function LandingPage() {
  return (
    <div className="landing-page">

      {/* HERO */}
      <div className="hero">
        <img
          src={dashboardImg}
          alt="Hero SDU"
          className="hero-image"
        />
      </div>

      {/* TENTANG SDU */}
      <section className="tentang">
        <div className="tentang-card">

          <div className="tentang-kiri">
            <img
              src={logo}
              alt="Tentang SDU"
            />
          </div>

          <div className="tentang-kanan">
            <h2>Apa Itu SDU ?</h2>

            <p>
              SDU (Sistem Daur Ulang) adalah platform
              yang membantu masyarakat menjual sampah
              daur ulang seperti plastik, kardus,
              kaleng, besi dan pecah belah.
            </p>

            <p>
              Melalui SDU, masyarakat dapat
              berkontribusi menjaga lingkungan sekaligus
              memperoleh nilai ekonomi dari sampah yang
              dikumpulkan.
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
            <h3>500+</h3>
            <p>Transaksi</p>
          </div>

          <div className="stat-card">
            <h3>1.2 Ton</h3>
            <p>Sampah Terkumpul</p>
          </div>

          <div className="stat-card">
            <h3>300+</h3>
            <p>Pengguna Aktif</p>
          </div>

          <div className="stat-card">
            <h3>5</h3>
            <p>Kategori Sampah</p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">

        <h3>SDU - Sistem Daur Ulang</h3>

        <p>
          Mari bersama menjaga lingkungan yang lebih
          bersih dan berkelanjutan.
        </p>

        <p>© 2026 SDU</p>

      </footer>

    </div>
  );
}

export default LandingPage;