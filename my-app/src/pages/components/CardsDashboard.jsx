import React from "react";
import "./style/CardsDashboard.css";

function cardsDashboard({ dashboardData }) {
  return (
    <div className="cards">
      <div className="card">
        <h3>Total Transaksi</h3>
        <p>{dashboardData.totalTransaksi}</p>
      </div>

      <div className="card">
        <h3>Total Berat</h3>
        <p>{dashboardData.totalBerat || 0} gr</p>
      </div>

      <div className="card">
        <h3>Total Pendapatan</h3>
        <p>Rp {(dashboardData.totalPendapatan || 0).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default cardsDashboard;
