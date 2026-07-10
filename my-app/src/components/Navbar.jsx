import React from "react";
import Ellipse from "../assets/Ellipse 395.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faXmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./style/navbar.css";
import Logo from "../assets/Logo.png";

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
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav>
      {/* Baris Atas: Logo & Profil */}
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
            <span>Warga Sawahlunto</span>
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
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transaksi"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Transaksi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/riwayat"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Riwayat
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profil"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Profil
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;