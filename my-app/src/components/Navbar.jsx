import React from "react";
import Ellipse from "../assets/Ellipse 395.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faUser,
  faStar,
  faArrowRightFromBracket,
  faPlusMinus,
  faXmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./style/navbar.css";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const toogleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toogleMenuMobile = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };
  return (
    <nav>
      {/* Baris Atas: Logo Profil */}
      <div className="navbar-top">
        <div className="navbar-kiri">
          <div className="logo-img">
            <img src={Logo} alt="logo" />
          </div>
          <div>
            <Link to="/">SDU</Link>
            <p className="logo-desc">Transaksi Sampah Daur Ulang Yang Mudah</p>
          </div>
        </div>

        <div className="navbar-kanan">
          <div>
            <span className="profil-nama">{user?.nama}</span>
            <span>Warga sawahlunto</span>
          </div>
          <div className="profil">
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
                  <Link to="/login">
                    <li onClick={handleLogout}>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} /> Keluar
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
          <button className="hamburger-btn" onClick={toogleMenuMobile}>
            <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>

      {/* Baris Bawah: Menu Navigasi */}
      <div className={`navbar-bottom ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <ul className="nav-links">
          <li>
            <Link
              to="/dashboard"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/transaksi"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Transaksi
            </Link>
          </li>
          <li>
            <Link
              to="/riwayat"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Riwayat
            </Link>
          </li>
          <li>
            <Link to="/profil" className="nav-link">
              Profil
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
