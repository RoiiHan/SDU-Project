import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/CardManageUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoiceDollar,
  faScaleBalanced,
  faWallet,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function getInisial(nama = "") {
  const parts = nama.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function ManageUser({ user }) {
  const navigate = useNavigate();

  return (
    <div className="admin-user-card">
      <div className="admin-user-header">
        <div className="user-avatar">{getInisial(user.nama)}</div>
        <div>
          <h3>{user.nama}</h3>
          <p>{user.no_hp}</p>
        </div>
      </div>

      <div className="admin-user-stats">
        <div className="user-stat-row">
          <span className="stat-label">
            <FontAwesomeIcon icon={faFileInvoiceDollar} /> Total Transaksi
          </span>
          <strong>{user.totalTransaksi}</strong>
        </div>

        <div className="user-stat-row">
          <span className="stat-label">
            <FontAwesomeIcon icon={faScaleBalanced} /> Total Berat
          </span>
          <strong>{(Number(user.totalBerat) / 1000).toFixed(1)} Kg</strong>
        </div>

        <div className="user-stat-row">
          <span className="stat-label">
            <FontAwesomeIcon icon={faWallet} /> Total Pendapatan
          </span>
          <strong className="stat-highlight">
            Rp {Number(user.totalPendapatan).toLocaleString()}
          </strong>
        </div>
      </div>

      <button
        className="btn-detail-user"
        onClick={() => navigate(`/admin/user/${user.id}`)}
      >
        Lihat Detail <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

export default ManageUser;
