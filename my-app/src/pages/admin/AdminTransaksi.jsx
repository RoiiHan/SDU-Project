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

  const groupedTransaksi = filteredTransaksi.reduce((acc, item) => {
    const userId = item.user_id;

    if (!acc[userId]) {
      acc[userId] = {
        nama: item.nama,
        no_hp: item.no_hp,
        transaksi: [],
      };
    }

    acc[userId].transaksi.push(item);

    return acc;
  }, {});

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
          {Object.values(groupedTransaksi).map((user, index) => (
            <div key={index} className="admin-transaksi-user-card">
              <div className="admin-transaksi-user-header">
                <h2>{user.nama}</h2>

                <p>{user.no_hp}</p>
              </div>

              <div className="admin-transaksi-summary">
                <div className="summary-box">
                  <span>Total Transaksi</span>

                  <strong>{user.transaksi.length}</strong>
                </div>

                <div className="summary-box">
                  <span>Total Berat</span>

                  <strong>
                    {user.transaksi.reduce(
                      (total, item) => total + Number(item.berat),
                      0,
                    )}{" "}
                    gr
                  </strong>
                </div>

                <div className="summary-box">
                  <span>Total Pendapatan</span>

                  <strong>
                    Rp{" "}
                    {user.transaksi
                      .reduce(
                        (total, item) => total + Number(item.totalharga),
                        0,
                      )
                      .toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="admin-transaksi-list">
                {user.transaksi.map((item) => (
                  <div key={item.id} className="admin-transaksi-item">
                    <div className="admin-transaksi-item-header">
                      <h4>{item.kategori}</h4>

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
                      <strong>Keterangan:</strong> {item.keterangan}
                    </p>

                    <p>
                      <strong>Berat:</strong> {item.berat} gr
                    </p>

                    <p>
                      <strong>Harga:</strong> Rp{" "}
                      {item.totalharga.toLocaleString()}
                    </p>

                    <p>
                      <strong>Lokasi:</strong> {item.lokasi}
                    </p>

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
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminTransaksi;
