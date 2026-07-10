import { useState, useEffect } from "react";
import "./style/Riwayat.css";
import Navbar from "../components/Navbar";
import { getRiwayatTransaksiUser } from "../services/transaksiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faScaleBalanced,
  faWallet,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

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
        <div className="riwayat-header">
          <p className="riwayat-eyebrow">
            <FontAwesomeIcon icon={faClockRotateLeft} /> RIWAYAT
          </p>
          <h1>Riwayat Transaksi</h1>
          <p className="riwayat-subtitle">
            Semua transaksi sampah daur ulang yang pernah kamu ajukan.
          </p>
        </div>

        {transaksi.length === 0 ? (
          <div className="riwayat-empty">
            <FontAwesomeIcon icon={faBoxOpen} className="empty-icon" />
            <h3>Belum Ada Transaksi</h3>
            <p>
              Yuk mulai setor sampah pertamamu dan lihat riwayatnya di sini.
            </p>
          </div>
        ) : (
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

                <p className="keterangan">{item.keterangan}</p>

                <div className="detail">
                  <div className="detail-item">
                    <span className="detail-label">
                      <FontAwesomeIcon icon={faScaleBalanced} /> Berat
                    </span>
                    <span className="detail-value">{item.berat} gram</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      <FontAwesomeIcon icon={faWallet} /> Total
                    </span>
                    <span className="detail-value detail-total">
                      Rp {item.totalharga.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Riwayat;
