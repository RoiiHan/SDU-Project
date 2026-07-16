import "./style/AdminDashboard.css";
import AdminLayout from "../../layouts/AdminLayout";
import { useState, useEffect } from "react";
import StatusDataComponent from "./components/StatusDataComponent";
import {
  getTotalTransaksi,
  getStatusDataDashboard,
  getTransaksiTerbaru,
  getUserTerbaru,
} from "../../services/transaksiService";

import CardTotalTransaksi from "./components/CardTotalTransaksi";
import CardGrafik from "./components/CardGrafik";
import TransaksiTerbaru from "./components/TransaksiTerbaru";
import UserTerbaru from "./components/UserTerbaru";
import { faGaugeHigh } from "@fortawesome/free-solid-svg-icons";
import { faReceipt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

      const dataUserTerbaru = await getUserTerbaru(setUserTerbaru);
      setUserTerbaru(dataUserTerbaru);
    };

    loadData();
  }, []);

  return (
    <AdminLayout
      icon={faGaugeHigh}
      title="Dashboard Admin"
      subtitle={`Selamat datang, ${user.nama} 👋`}
    >
      <CardTotalTransaksi dashboard={dashboard} />
      <StatusDataComponent />

      <div className="dashboard-bottom">
        <TransaksiTerbaru transactions={transaksiTerbaru} />
        <UserTerbaru userTerbaru={userTerbaru} />
      </div>

      <CardGrafik />
    </AdminLayout>
  );
}

export default AdminDashboard;
