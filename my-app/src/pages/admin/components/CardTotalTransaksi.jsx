import React from "react";
import "./style/CardTotalTransaksi.css";

function CardTotalTransaksi({ dashboard }) {
  return (
    <div className="admin-cards">
      <div className="admin-card">
        <h3>Total Transaksi</h3>
        <p>{dashboard.totalTransaksi}</p>
      </div>

      <div className="admin-card">
        <h3>Total User</h3>
        <p>{dashboard.totalUser}</p>
      </div>

      <div className="admin-card">
        <h3>Total Berat</h3>
        <p>{dashboard.totalBerat} gr</p>
      </div>

      <div className="admin-card">
        <h3>Total Pendapatan</h3>
        <p>Rp {Number(dashboard.totalPendapatan || 0).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default CardTotalTransaksi;
