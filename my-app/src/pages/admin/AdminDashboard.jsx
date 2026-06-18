import "./style/AdminDashboard.css";
import AdminSidebar from "../admin/components/AdminSidebars";
import { useState } from "react";
import { useEffect } from "react";
import { data } from "react-router-dom";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboard, setDashboard] = useState({
    totalUser: 0,
    totalTransaksi: 0,
    totalBerat: 0,
    totalPendapatan: 0,
  });

  const [statusData, setStatusData] = useState({
    Menunggu: 0,
    Diproses: 0,
    Dijemput: 0,
    Selesai: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/admin/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setDashboard(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:5000/admin/status-transaksi")
      .then((res) => res.json())
      .then((data) => {
        const statusResult = {
          Menunggu: 0,
          Diproses: 0,
          Dijemput: 0,
          Selesai: 0,
        };

        data.forEach((item) => {
          statusResult[item.status] = item.total;
        });

        setStatusData(statusResult);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Dashboard Admin</h1>
        <p>selamat datang, {user.nama}</p>

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
            <p>{dashboard.totalBerat}</p>
          </div>

          <div className="admin-card">
            <h3>Total Pendapatan</h3>

            <p>Rp {dashboard.totalPendapatan.toLocaleString()}</p>
          </div>
        </div>

        <div className="status-section">
          <h2>Status Transaksi</h2>

          <div className="status-grid">
            <div className="status-card menunggu">
              <h3>Menunggu</h3>
              <p>{statusData.Menunggu}</p>
            </div>

            <div className="status-card diproses">
              <h3>Diproses</h3>
              <p>{statusData.Diproses}</p>
            </div>

            <div className="status-card dijemput">
              <h3>Dijemput</h3>
              <p>{statusData.Dijemput}</p>
            </div>

            <div className="status-card selesai">
              <h3>Selesai</h3>
              <p>{statusData.Selesai}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
