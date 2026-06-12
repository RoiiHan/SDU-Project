import { useState } from "react";
import AdminSidebar from "./components/AdminSidebars";
import { transaksiDummy } from "../../data/transaksiDummy";
import "./style/AdminTransaksi.css";

function AdminTransaksi() {
  const [transaksi, setTransaksi] = useState(transaksiDummy);

  const handleStatusChange = (id, statusBaru) => {
    const updateStatus = transaksi.map((item) =>
      item.id === id
        ? {
            ...item,
            status: statusBaru,
          }
        : item
    );

    setTransaksi(updateStatus);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Kelola Transaksi</h1>

        <div className="transaksi-grid">
          {transaksi.map((item) => (
            <div
              key={item.id}
              className="transaksi-card"
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
                {item.keterangan}
              </p>

              <div className="detail">
                <p>
                  <strong>Berat:</strong>{" "}
                  {item.berat} gram
                </p>

                <p>
                  <strong>Total:</strong> Rp{" "}
                  {item.totalHarga.toLocaleString()}
                </p>
              </div>

              <select
                value={item.status}
                onChange={(e) =>
                  handleStatusChange(
                    item.id,
                    e.target.value
                  )
                }
              >
                <option value="Menunggu">
                  Menunggu
                </option>

                <option value="Diproses">
                  Diproses
                </option>

                <option value="Dijemput">
                  Dijemput
                </option>

                <option value="Selesai">
                  Selesai
                </option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminTransaksi;