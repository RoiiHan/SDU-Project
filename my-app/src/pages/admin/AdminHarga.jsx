import { useState } from "react";
import AdminSidebar from "./components/AdminSidebars";
import { hargaSampah } from "../../data/hargaSampah";
import "./style/AdminHarga.css";

function AdminHarga() {
  const [harga, setHarga] = useState(hargaSampah);

  const handleHargaChange = (id, value) => {
    const updateHarga = harga.map((item) =>
      item.id === id
        ? {
            ...item,
            harga100gr: Number(value),
          }
        : item
    );

    setHarga(updateHarga);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Kelola Harga Sampah</h1>

        <div className="harga-grid">
          {harga.map((item) => (
            <div
              key={item.id}
              className="harga-card"
            >
              <h3>{item.kategori}</h3>

              <label>
                Harga / 100 gram
              </label>

              <input
                type="number"
                value={item.harga100gr}
                onChange={(e) =>
                  handleHargaChange(
                    item.id,
                    e.target.value
                  )
                }
              />

              <p>
                Rp{" "}
                {item.harga100gr.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminHarga;