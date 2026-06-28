import "./style/AdminDashboard.css";
import AdminSidebar from "../admin/components/AdminSidebars";
import { useState } from "react";
import { useEffect } from "react";
import StatusDataComponent from "./components/StatusDataComponent";
import {
  getTotalTransaksi,
  getStatusDataDashboard,
  getTransaksiTerbaru,
  getUserTerbaru,
} from "../../services/transaksiService";

import CardTotalTransaksi from "./components/CardTotalTransaksi";
import CardGrafik from "./components/CardGrafik";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboard, setDashboard] = useState({
    totalUser: 0,
    totalTransaksi: 0,
    totalBerat: 0,
    totalPendapatan: 0,
  });

  const [transaksiTerbaru, setTransaksiTerbaru] = useState([]);
  const [userTerbaru, setUserTerbaru] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const dataDashboard = await getTotalTransaksi(setDashboard);
      setDashboard(dataDashboard);

      const dataStatus = await getStatusDataDashboard();

      const statusResult = {
        Menunggu: 0,
        Diproses: 0,
        Dijemput: 0,
        Selesai: 0,
      };

      dataStatus.forEach((item) => {
        statusResult[item.status] = item.total;
      });
      setStatusData(statusResult);

      const dataTerbaru = await getTransaksiTerbaru(setTransaksiTerbaru);
      setTransaksiTerbaru(dataTerbaru);

      const userTerbaru = await getUserTerbaru(setUserTerbaru);
      setUserTerbaru(userTerbaru);
    };

    loadData();
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Dashboard Admin</h1>
        <p>Selamat datang, {user.nama}</p>
        {/* Statistik */}
        <CardTotalTransaksi dashboard={dashboard} />

        {/* Status */}
        <StatusDataComponent />

        {/* Bagian bawah */}
        <div className="dashboard-bottom">
          {/* Transaksi Terbaru */}
          <div className="transaksi-terbaru">
            <h2>Transaksi Terbaru</h2>

            {transaksiTerbaru.map((item) => (
              <div className="transaksi-row" key={item.id}>
                <div>
                  <strong>{item.nama}</strong>

                  <p>
                    {item.kategori} - {item.berat} gr
                  </p>
                </div>

                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {/* User Terbaru */}
          <div className="user-terbaru">
            <h2>User Terbaru</h2>

            {userTerbaru.map((user) => (
              <div className="user-item" key={user.id}>
                <div>
                  <h4>{user.nama}</h4>
                  <p>{user.no_hp}</p>
                </div>

                <span>
                  {new Date(user.created_at).toLocaleDateString("id-ID")}
                </span>
              </div>
            ))}
          </div>

          <CardGrafik />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
