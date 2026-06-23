import { useState, useEffect } from "react";
import AdminSidebar from "./components/AdminSidebars";
import "./style/AdminTransaksi.css";

function AdminTransaksi() {
  const [transaksi, setTransaksi] = useState([]);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/admin/transaksi/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          status,
        }),
      });
      setTransaksi((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: status } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch("http://localhost:5000/admin/transaksi")
      .then((res) => res.json())
      .then((data) => {
        setTransaksi(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const filteredTransaksi = transaksi.filter((item) => {
    const cocokStatus =
      filterStatus === "Semua" ? true : item.status === filterStatus;

    const keyword = search.toLowerCase();

    const cocokSearch =
      item.nama.toLowerCase().includes(keyword) ||
      item.no_hp.includes(keyword) ||
      item.kategori.toLowerCase().includes(keyword);

    return cocokStatus && cocokSearch;
  });

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1 className="admin-transaksi-title">Kelola Transaksi</h1>

        <div className="filter-search-container">
          <input
            type="text"
            placeholder="Cari nama, no HP, atau kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Semua">Semua</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Diproses">Diproses</option>
            <option value="Dijemput">Dijemput</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>

        <div className="admin-transaksi-grid">
          {filteredTransaksi.map((item) => (
            <div key={item.id} className="admin-transaksi-card">
              <div className="admin-transaksi-card-header">
                <div>
                  <h3>{item.nama}</h3>
                  <p>{item.no_hp}</p>
                </div>

                <select
                  className={`status ${item.status.toLowerCase()}`}
                  value={item.status}
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Dijemput">Dijemput</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              <p>
                <strong>Kategori:</strong> {item.kategori}
              </p>

              <p>
                <strong>Keterangan:</strong> {item.keterangan}
              </p>

              <p>
                <strong>Berat:</strong> {(item.berat / 1000).toFixed(1)} Kg
              </p>

              <p>
                <strong>Harga:</strong> Rp {item.totalharga.toLocaleString()}
              </p>

              <p>
                <strong>Lokasi:</strong> {item.lokasi}
              </p>

              <button
                className="btn-lokasi-lat"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${item.latitude},${item.longitude}`,
                    "_blank",
                  )
                }
              >
                📍 Lihat Lokasi
              </button>

              <p>
                <strong>Tanggal:</strong>{" "}
                {new Date(item.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminTransaksi;
