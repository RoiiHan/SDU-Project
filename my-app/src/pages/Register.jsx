import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faPhone,
  faLocationDot,
  faLock,
  faLeaf,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo.png";
import { getRegisAuth } from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    nama: "",
    no_hp: "",
    alamat: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.nama.trim() ||
      !formData.no_hp.trim() ||
      !formData.alamat.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      alert("Semua kolom wajib diisi");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok");
      return;
    }

    try {
      const data = await getRegisAuth(formData);

      alert(data.message);
      navigate("/login");

      setFormData({
        nama: "",
        no_hp: "",
        alamat: "",
        password: "",
        confirmPassword: "",
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="auth-page">
      {/* ===== PANEL KIRI - BRANDING ===== */}
      <div className="auth-branding">
        <div className="branding-blob branding-blob-1" />
        <div className="branding-blob branding-blob-2" />

        <div className="branding-content">
          <div className="branding-logo">
            <img src={logo} alt="Logo SDU" />
          </div>
          <h2>SDU</h2>
          <p className="branding-tagline">
            Transaksi Sampah Daur Ulang Yang Mudah
          </p>

          <div className="branding-quote">
            <FontAwesomeIcon icon={faLeaf} className="quote-icon" />
            <p>
              Bergabunglah dengan ratusan warga lain yang sudah mulai
              berkontribusi menjaga lingkungan sejak hari ini.
            </p>
          </div>
        </div>
      </div>

      {/* ===== PANEL KANAN - FORM ===== */}
      <div className="auth-form-section">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-icon-badge">
            <FontAwesomeIcon icon={faUserPlus} />
          </div>
          <h1>Daftar Akun SDU</h1>
          <p className="form-subtitle">
            Lengkapi data diri untuk mulai bertransaksi
          </p>

          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faUser} /> Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              placeholder="Masukkan nama lengkap"
              required
              value={formData.nama}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faPhone} /> Nomor HP
            </label>
            <input
              type="text"
              name="no_hp"
              placeholder="Masukkan nomor telepon"
              required
              value={formData.no_hp}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faLocationDot} /> Alamat
            </label>
            <textarea
              name="alamat"
              placeholder="Masukkan alamat lengkap"
              required
              value={formData.alamat}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faLock} /> Password
            </label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faLock} /> Konfirmasi Password
            </label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Daftar
          </button>

          <p className="btn-reg">
            Sudah punya akun? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
