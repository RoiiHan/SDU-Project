import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/AdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCashRegister,
  faTag,
  faArrowDown,
  faUser,
  faUsers,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Ellipse from "../../../assets/Ellipse 395.png";

function AdminSidebar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const admin = JSON.parse(localStorage.getItem("user"));
  const toogleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    // kalau ada token terpisah, hapus juga:
    // localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <img
          src={
            admin?.foto_profil
              ? `http://localhost:5000/uploads/profil/${admin.foto_profil}`
              : Ellipse
          }
          alt="fotoProfil"
          className="foto-profil"
          onClick={toogleMenu}
        />
        <h2>Admin</h2>
      </div>

      <ul>
        <li>
          <Link to="/admin/dashboard">
            <FontAwesomeIcon icon={faHouse} /> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/transaksi">
            <FontAwesomeIcon icon={faCashRegister} /> Transaksi
          </Link>
        </li>

        <li>
          <Link to="/admin/user">
            <FontAwesomeIcon icon={faUsers} /> User
          </Link>
        </li>

        <li>
          <Link to="/admin/harga">
            <FontAwesomeIcon icon={faTag} /> Harga
          </Link>
        </li>
      </ul>

      <div className="profil-admin">
        {menuOpen && (
          <div className="menu-admin">
            <ul>
              <Link to="/admin/profil">
                <li>
                  <FontAwesomeIcon icon={faUser} style={{ color: "#31511E" }} />{" "}
                  Profil Saya
                </li>
              </Link>
              <Link to="/login">
                <li onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    style={{ color: "#31511E" }}
                  />{" "}
                  Keluar
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSidebar;
