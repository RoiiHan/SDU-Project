import { useState } from "react";
import "./style/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ){
      console.log("Login admin");
      localStorage.setItem(
        "user",
        JSON.stringify({
          role : "admin",
          email: email  
        })
      );
      navigate("/admin/dashboard");
      return;
    }
    
    if (
      email === "user@gmail.com" &&
      password === "user123"
    ){
      console.log("Login user");
      localStorage.setItem(
        "user",
        JSON.stringify({ 
          role : "user",
          email: email
        })
      )
      navigate("/dashboard");
      return;
    }

    alert("Email atau password salah");
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h1>Login SDU</h1>

        <div className="input-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <button type="submit">
          Masuk
        </button>
      </form>
    </div>
  );
}

export default Login;