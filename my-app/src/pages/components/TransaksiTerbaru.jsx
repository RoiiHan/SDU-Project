import React from "react";
import { useState, useEffect } from "react";
import { getTransaksiDahboard } from "../../services/transaksiService";

function TransaksiTerbaru() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [transaksi, SetTransaksi] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getTransaksiDahboard(user.id);
      SetTransaksi(data);
    };

    loadData();
  }, [user.id]);

  return (
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
  );
}

export default TransaksiTerbaru;
