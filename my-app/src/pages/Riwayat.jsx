import { useState, useEffect } from "react";
import "./style/Riwayat.css";
import Navbar from "../components/Navbar";
import { getRiwayatTransaksiUser } from "../services/transaksiService";

function Riwayat() {
  const [transaksi, setTransaksi] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadData = async () => {
      const data = await getRiwayatTransaksiUser(user.id);
      setTransaksi(data);
    };
    loadData();
  }, []);

  return (
    <div className="riwayat-page">
      <Navbar />
      <div className="riwayat-container">
        <h1>Riwayat Transaksi</h1>

        <div className="riwayat-list">
          {transaksi.map((item) => (
            <div key={item.id} className="riwayat-card">
              <div className="card-header">
                <h3>{item.kategori}</h3>

                <span
                  className={`status ${(item.status || "menunggu").toLowerCase()}`}
                >
                  {item.status || "Menunggu"}
                </span>
              </div>

              <p className="keterangan">
                <strong>Keterangan: </strong>
                {item.keterangan}
              </p>

              <div className="detail">
                <p>
                  <strong>Berat :</strong> {item.berat} gram
                </p>

                <p>
                  <strong>Total :</strong> Rp {item.totalharga.toLocaleString()}
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
