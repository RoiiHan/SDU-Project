import React from "react";
import { useState, useEffect } from "react";
import { getTransaksiDahboard } from "../../services/transaksiService";
import "./style/TransaksiTerbaru.css";

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
      <div>
        <h3>TRANSAKSI TERBARU</h3>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>MATERIAL</th>
              <th>TANGGAL</th>
              <th>BERAT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((item) => (
              <tr key={item.id} className="">
                <td>
                  <p>{item.kategori}</p>
                  <p>{item.keterangan}</p>
                </td>
                <td>{item.berat} Gr</td>
                <td>{item.totalharga.toLocaleString()}</td>
                <td>
                  <span className={`status-tabel ${item.status.toLowerCase()}`}>
                    {item.status || "Menunggu"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransaksiTerbaru;
