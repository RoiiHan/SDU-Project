import { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebars";
import "./style/AdminHarga.css";
import { getHargaAdmin } from "../../services/hargaServices";

function AdminHarga() {
  const [harga, setHarga] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getHargaAdmin(setHarga);
      setHarga(data);
    };

    loadData();
  }, []);

  const handleHargaChange = (id, value) => {
    setHarga((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              harga: value,
            }
          : item,
      ),
    );
  };

  const simpanHarga = async (id, hargaBaru) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/harga/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          harga: hargaBaru,
        }),
      });

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.log(error);

      alert("Gagal update harga");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Kelola Harga Sampah</h1>

        <div className="harga-grid">
          {harga.map((item) => (
            <div key={item.id} className="harga-card">
              <h3>{item.kategori}</h3>

              <label>Harga / 100 gram</label>

              <input
                type="number"
                value={item.harga}
                onChange={(e) => handleHargaChange(item.id, e.target.value)}
              />

              <p>Rp {Number(item.harga).toLocaleString()}</p>

              <button
                className="btn-simpan-harga"
                onClick={() => simpanHarga(item.id, item.harga)}
              >
                Simpan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminHarga;
