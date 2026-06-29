import "./style/Dashboard.css";
import TestApi from "./TestApi";
import { useState, useEffect } from "react";
import CardsDashboard from "./components/CardsDashboard";
import TransaksiTerbaru from "./components/TransaksiTerbaru";
import { getDashboardUser } from "../services/transaksiService";

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
    const loadData = async () => {
      const data = await getDashboardUser(user.id);
      setDashboardData(data);
    };

    loadData();
  }, [user.id]);

  return (
    <div className="dashboard">
      <CardsDashboard dashboardData={dashboardData} />

      <div className="riwayat-terbaru">
        <TransaksiTerbaru />
      </div>
    </div>
  );
}

export default Dashboard;
