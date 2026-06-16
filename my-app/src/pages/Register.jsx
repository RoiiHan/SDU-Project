import { useState } from "react";
import { Link } from "react-router-dom";
import "./style/Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [formData, setFormData] = useState({
    nama: "",
    no_hp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: formData.nama,
          no_hp: formData.no_hp,
          password: formData.password,
        }),
      });
      const data = await response.json();

      alert(data.message);

      setFormData({
        nama: "",
        no_hp: "",
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
          value={formData.nama}
          onChange={handleChange}
        />

        <input
          type="text"
          name="no_hp"
          placeholder="nomor telepon"
          value={formData.no_hp}
          onChange={handleChange}
        />

        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
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
