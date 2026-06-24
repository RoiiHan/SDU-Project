import React from "react";
import Ellipse from "../assets/Ellipse 395.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faUser,
  faStar,
  faArrowRightFromBracket,
  faPlusMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./style/navbar.css";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const toogleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };
  return (
    <nav>
      <div className="logo">
        <div className="logo-img">
          <img src={Logo} alt="logo" />
        </div>
        <div className="logo-text">
          <p>
            <Link to="/">SDU</Link>
          </p>
        </div>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/transaksi" className="nav-link">
            Transaksi
          </Link>
        </li>
        <li>
          <Link to="/riwayat" className="nav-link">
            Riwayat
          </Link>
        </li>
      </ul>

      <div className="profil">
        <span className="profil-nama">{user?.nama}</span>
        <img
          src={
            user?.foto_profil
              ? `http://localhost:5000/uploads/profil/${user.foto_profil}`
              : Ellipse
          }
          alt="fotoProfil"
          className="toogle"
          onClick={toogleMenu}
        />

        {menuOpen && (
          <div className="menu">
            <ul>
              <Link to="/profil">
                <li>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ color: "rgb(255, 255, 255)" }}
                  />{" "}
                  Profil Saya
                </li>
              </Link>
              <Link to="/login">
                <li onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    style={{ color: "rgb(255, 255, 255)" }}
                  />{" "}
                  Keluar
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
