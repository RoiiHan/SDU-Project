import "./style/Dashboard.css";
import TestApi from "./TestApi";
import { useState, useEffect } from "react";
import CardsDashboard from "./components/CardsDashboard";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalTransaksi: 0,
    totalBerat: 0,
    totalPendapatan: 0,
  });

  const [transaksi, SetTransaksi] = useState([]);
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

  useEffect(() => {
    fetch(`http://localhost:5000/transaksi/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        SetTransaksi(data);
      });
  }, [user.id]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <CardsDashboard dashboardData={dashboardData} />

      <div className="riwayat-terbaru">
        <h2>Transaksi Terbaru</h2>
        <div className="riwayat-transaksi">
          {transaksi.map((item) => (
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
                {item.status || "Menunggu"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
