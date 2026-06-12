import "./style/Dashboard.css";
import { transaksiDummy } from "../data/transaksiDummy";

function Dashboard() {
  const totalTransaksi = transaksiDummy.length;

  const totalBerat = transaksiDummy.reduce(
    (acc, item) => acc + item.berat,
    0
  );

  console.log("Total Berat:", totalBerat);

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
          <div
            key={item.id}
            className="transaksi-item"
          >
            <h4>{item.kategori}</h4>

            <p>{item.keterangan}</p>

            <p>{item.berat} gr</p>

            <p>
              Rp {item.totalHarga.toLocaleString()}
            </p>

            <span>{item.status}</span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;