import { useState, useEffect } from "react";
import "./style/Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login SDU</h1>

        <div className="input-group">
          <label>NoHP</label>
          <input
            type="text"
            placeholder="Masukkan NoHP"
            value={no_hp}
            onChange={(e) => setNoHp(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
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
          Belum Punya Akun ? <Link to="/register">Registrasi</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
