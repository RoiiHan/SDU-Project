import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/CardManageUser.css";

function ManageUser({ user }) {
  const navigate = useNavigate();
  return (
    <div key={user.id} className="admin-user-card">
      <div className="admin-user-header">
        <h3>{user.nama}</h3>
        <p>{user.no_hp}</p>
      </div>

      <div className="admin-user-stats">
        <div className="user-stat-box">
          <span>Total Transaksi</span>
          <strong>{user.totalTransaksi}</strong>
        </div>

        <div className="user-stat-box">
          <span>Total Berat</span>
          <strong>{(Number(user.totalBerat) / 1000).toFixed(1)} Kg</strong>
        </div>

        <div className="user-stat-box">
          <span>Total Pendapatan</span>
          <strong>Rp {Number(user.totalPendapatan).toLocaleString()}</strong>
        </div>
      </div>

      <button
        className="btn-detail-user"
        onClick={() => navigate(`/admin/user/${user.id}`)}
      >
        Lihat Detail
      </button>
    </div>
  );
}

export default ManageUser;
