import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getRegisAuth } from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    nama: "",
    no_hp: "",
    alamat: "",
    password: "",
    confirmPassword: "",
  });

  const Navigate = useNavigate();

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
      Navigate("/login");

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
  const [ShowConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Daftar Akun SDU</h1>

        <input
          type="text"
          name="nama"
          placeholder="Nama Lengkap"
          required
          value={formData.nama}
          onChange={handleChange}
        />

        <input
          type="text"
          name="no_hp"
          placeholder="nomor telepon"
          required
          value={formData.no_hp}
          onChange={handleChange}
        />
        <textarea
          name="alamat"
          placeholder="Alamat Lengkap"
          required
          value={formData.alamat}
          onChange={handleChange}
          rows="3"
        />

        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
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

        <div className="password-input-confirm">
          <input
            type={ShowConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="button"
            className="eye-btn-confirm"
            onClick={() => setShowConfirmPassword(!ShowConfirmPassword)}
          >
            <FontAwesomeIcon icon={ShowConfirmPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        <button type="submit">Daftar</button>

        <p className="btn-reg">
          Sudah punya akun?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
