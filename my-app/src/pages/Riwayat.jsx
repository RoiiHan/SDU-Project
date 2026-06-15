import { transaksiDummy } from "../data/transaksiDummy";
import "./style/Riwayat.css";
import Navbar from "../components/Navbar";

function Riwayat() {
  return (
    <div className="riwayat-page">
      <Navbar />
      <div className="riwayat-container">
        <h1>Riwayat Transaksi</h1>

        <div className="riwayat-list">
          {transaksiDummy.map((item) => (
            <div
              key={item.id}
              className="riwayat-card"
            >
              <div className="card-header">
                <h3>{item.kategori}</h3>

                <span
                  className={`status ${item.status.toLowerCase()}`}
                >
                  {item.status}
                </span>
              </div>

              <p className="keterangan">
                <strong>Keterangan: </strong>
                {item.keterangan}
              </p>

              <div className="detail">
                <p>
                  <strong>Berat :</strong>{" "}
                  {item.berat} gram
                </p>

                <p>
                  <strong>Total :</strong>{" "}
                  Rp{" "}
                  {item.totalHarga.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Riwayat;