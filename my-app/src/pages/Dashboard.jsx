import "./style/Dashboard.css";
import { transaksiDummy } from "../data/transaksiDummy";
import TestApi from "./TestApi";

function Dashboard() {
  const totalTransaksi = transaksiDummy.length;

  const totalBerat = transaksiDummy.reduce(
    (acc, item) => acc + item.berat,
    0
  );

  const totalSaldo = transaksiDummy.reduce(
    (acc, item) => acc + item.totalHarga,
    0
  );

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Transaksi</h3>
          <p>{totalTransaksi}</p>
        </div>

        <div className="card">
          <h3>Total Berat</h3>
          <p>{totalBerat} gr</p>
        </div>

        <div className="card">
          <h3>Total Pendapatan</h3>
          <p>Rp {totalSaldo.toLocaleString()}</p>
        </div>
      </div>

      <div className="riwayat-terbaru">
        <h2>Transaksi Terbaru</h2>
        <div className="riwayat-transaksi">
          {transaksiDummy.slice(0, 3).map((item) => (
            <div key={item.id} className="transaksi-item">
              <div className="header-kategori"><h4>{item.kategori}</h4></div>
              <div className="header-keterangan"><p><span>Keterangan :</span> {item.keterangan}</p></div>
              <div className="header-berat"><p><span>Berat :</span> {item.berat} gr</p></div>
              <div className="header-totalharga"><p><span>Harga :</span> Rp {item.totalHarga.toLocaleString()}</p></div>
              <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
      <TestApi />
    </div>
  );
}

export default Dashboard;