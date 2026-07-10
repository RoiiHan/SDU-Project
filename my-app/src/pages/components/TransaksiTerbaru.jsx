import React from "react";
import { useState, useEffect } from "react";
import { getTransaksiDahboard } from "../../services/transaksiService";
import "./style/TransaksiTerbaru.css";

function TransaksiTerbaru() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getTransaksiDahboard(user.id);
      setTransaksi(data);
    };

    loadData();
  }, [user.id]);

  return (
    <div className="riwayat-transaksi">
      <div className="riwayat-header">
        <h3>Transaksi Terbaru</h3>
        <span className="riwayat-sub">Riwayat 5 transaksi terakhir</span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Material</th>
              <th>Tanggal</th>
              <th>Berat</th>
              <th>Nominal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  Belum ada transaksi
                </td>
              </tr>
            ) : (
              transaksi.map((item) => (
                <tr key={item.id}>
                  <td>
                    <p className="material-utama">{item.kategori}</p>
                    <p className="material-sub">{item.keterangan}</p>
                  </td>
                  <td>{item.created_at}</td>
                  <td>{item.berat} Gr</td>
                  <td>Rp {item.totalharga.toLocaleString()}</td>
                  <td>
                    <span
                      className={`status-tabel ${item.status?.toLowerCase()}`}
                    >
                      {item.status || "Menunggu"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransaksiTerbaru;
