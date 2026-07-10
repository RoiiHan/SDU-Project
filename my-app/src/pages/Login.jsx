import { useState, useEffect } from "react";
import "./style/Login.css";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPhone,
  faLock,
  faLeaf,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo.png";
import { getLoginAuth } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  const [no_hp, setNoHp] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getLoginAuth(no_hp, password);

      localStorage.setItem("user", JSON.stringify(data.user));
      alert(data.message);

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.message);
    }
  };

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
              Setiap sampah yang kamu daur ulang, adalah langkah kecil untuk
              perubahan besar.
            </p>
          </div>
        </div>
      </div>

      {/* ===== PANEL KANAN - FORM ===== */}
      <div className="auth-form-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-icon-badge">
            <FontAwesomeIcon icon={faRecycle} />
          </div>
          <h1>Selamat Datang Kembali</h1>
          <p className="form-subtitle">Masuk untuk melanjutkan transaksi</p>

          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faPhone} /> Nomor HP
            </label>
            <input
              type="text"
              placeholder="Masukkan nomor HP"
              value={no_hp}
              onChange={(e) => setNoHp(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faLock} /> Password
            </label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn-login"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Masuk
          </button>

          <p className="link-regis">
            Belum punya akun? <Link to="/register">Registrasi</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
