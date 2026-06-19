import React from "react";
import { Link } from "react-router-dom";
import "./style/AdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCashRegister,
  faTag,
  faArrowDown,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Ellipse from "../../../assets/Ellipse 395.png";

function AdminSidebar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toogleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    // kalau ada token terpisah, hapus juga:
    // localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };
  return (
    <div className="admin-sidebar">
      <h2>SDU Admin</h2>

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
          <Link to="/admin/harga">
            <FontAwesomeIcon icon={faTag} /> Harga
          </Link>
        </li>
      </ul>

      <div className="profil-admin">
        <img src={Ellipse} alt="fotoProfil" />
        <button className="toogle-admin" onClick={toogleMenu}>
          <FontAwesomeIcon icon={faArrowDown} style={{ color: "#31511E" }} />
        </button>

        {menuOpen && (
          <div className="menu-admin">
            <ul>
              <Link to="/profil">
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
