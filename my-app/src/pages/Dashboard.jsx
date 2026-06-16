import "./style/Dashboard.css";
import TestApi from "./TestApi";
import { useState, useEffect } from "react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalTransaksi: 0,
    totalBerat: 0,
    totalPendapatan: 0,
  });

  const [transaksi, SetTransaksi] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/transaksi")
      .then((res) => res.json())
      .then((data) => {
        SetTransaksi(data);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

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

      <div className="riwayat-terbaru">
        <h2>Transaksi Terbaru</h2>
        <div className="riwayat-transaksi">
          {transaksi.slice(0, 3).map((item) => (
            <div key={item.id} className="transaksi-item">
              <div className="header-kategori">
                <h4>{item.kategori}</h4>
              </div>
              <div className="header-keterangan">
                <p>
                  <span>Keterangan :</span> {item.keterangan}
                </p>
              </div>
              <div className="header-berat">
                <p>
                  <span>Berat :</span> {item.berat} gr
                </p>
              </div>
              <div className="header-totalharga">
                <p>
                  <span>Harga :</span> Rp {item.totalharga.toLocaleString()}
                </p>
              </div>
              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
