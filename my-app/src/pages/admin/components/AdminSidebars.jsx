import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./style/AdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCashRegister,
  faTag,
  faUser,
  faUsers,
  faArrowRightFromBracket,
  faLeaf,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Ellipse from "../../../assets/Ellipse 395.png";

function AdminSidebar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const admin = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const toogleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <div className="admin-sidebar">
      {/* ===== BRAND ===== */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <FontAwesomeIcon icon={faLeaf} />
        </div>
        <div>
          <h2>SDU</h2>
          <p>Admin Panel</p>
        </div>
      </div>

      {/* ===== PROFIL (TEPAT DI BAWAH BRAND) ===== */}
      <div className="sidebar-profil">
        <div className="profil-admin" onClick={toogleMenu}>
          <img
            src={
              admin?.foto_profil
                ? `http://localhost:5000/uploads/profil/${admin.foto_profil}`
                : Ellipse
            }
            alt="fotoProfil"
            className="foto-profil"
          />
          <div className="profil-info">
            <span className="profil-nama">{admin?.nama || "Admin"}</span>
            <span className="profil-role">Administrator</span>
          </div>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`profil-chevron ${menuOpen ? "open" : ""}`}
          />
        </div>

        {menuOpen && (
          <div className="menu-admin">
            <ul>
              <Link to="/admin/profil" onClick={() => setMenuOpen(false)}>
                <li>
                  <FontAwesomeIcon icon={faUser} /> Profil Saya
                </li>
              </Link>
              <Link to="/login">
                <li onClick={handleLogout}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> Keluar
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>

      {/* ===== MENU NAVIGASI ===== */}
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FontAwesomeIcon icon={faHouse} /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/transaksi"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FontAwesomeIcon icon={faCashRegister} /> Transaksi
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/user"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FontAwesomeIcon icon={faUsers} /> User
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/harga"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FontAwesomeIcon icon={faTag} /> Harga
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
