import { useState } from "react";
import { Link } from "react-router-dom";
import "./style/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="register-container">
      <form
        className="register-form"
        onSubmit={handleSubmit}
      >
        <h1>Daftar Akun SDU</h1>

        <input
          type="text"
          name="nama"
          placeholder="Nama Lengkap"
          value={formData.nama}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Konfirmasi Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">
          Daftar
        </button>

        <p className="btn-reg">
          Sudah punya akun?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;