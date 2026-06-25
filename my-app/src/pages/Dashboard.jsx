import "./style/Dashboard.css";
import TestApi from "./TestApi";
import { useState, useEffect } from "react";
import CardsDashboard from "./components/CardsDashboard";
import TransaksiTerbaru from "./components/TransaksiTerbaru";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalTransaksi: 0,
    totalBerat: 0,
    totalPendapatan: 0,
  });
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h2> Silahkan Login Terlebih dahulu</h2>;
  }

  useEffect(() => {
    fetch(`http://localhost:5000/dashboard/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data);
      });
  }, [user.id]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <CardsDashboard dashboardData={dashboardData} />

      <div className="riwayat-terbaru">
        <h2>Transaksi Terbaru</h2>
        <TransaksiTerbaru />
      </div>
    </div>
  );
}

export default Dashboard;
