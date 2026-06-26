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
  getGrafikTransaksi,
  getGrafikKategori,
} from "../../services/transaksiService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

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
  const [grafikData, setGrafikData] = useState([]);
  const [kategoriData, setKategoriData] = useState([]);
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

      const grafikTransaksi = await getGrafikTransaksi(setGrafikData);
      setGrafikData(grafikTransaksi);

      const grafikKategori = await getGrafikKategori(setKategoriData);
      setKategoriData(grafikKategori);
    };

    loadData();
  }, []);

  const namaBulan = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const chartData = {
    labels: grafikData.map((item) => namaBulan[item.bulan]),

    datasets: [
      {
        label: "Jumlah Transaksi",
        data: grafikData.map((item) => item.total),

        backgroundColor: "#3B82F6",
        borderRadius: 8,
      },
    ],
  };

  const kategoriChartData = {
    labels: kategoriData.map((item) => item.kategori),

    datasets: [
      {
        data: kategoriData.map((item) => item.total),

        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Dashboard Admin</h1>
        <p>Selamat datang, {user.nama}</p>

        {/* Statistik */}
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

          <div className="grafik-wrapper">
            <div className="grafik-section">
              <h2>Grafik Transaksi Bulanan</h2>

              <div className="grafik-card">
                <Bar data={chartData} />
              </div>
            </div>

            <div className="grafik-section">
              <h2>Kategori Sampah</h2>

              <div className="grafik-card">
                <Doughnut data={kategoriChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
