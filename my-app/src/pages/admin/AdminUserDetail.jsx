import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebars";
import "./style/AdminUserDetail.css";

function AdminUserDetail() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/admin/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setTransaksi(data.transaksi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-user-detail-content">
        <h1>Detail User</h1>

        <div className="user-detail-card">
          <h2>{user.nama}</h2>
          <p>{user.no_hp}</p>

          <div className="user-summary">
            <div className="summary-item">
              <span>Total Transaksi</span>
              <strong>{user.totalTransaksi}</strong>
            </div>

            <div className="summary-item">
              <span>Total Berat</span>
              <strong>{(Number(user.totalBerat) / 1000).toFixed(1)} Kg</strong>
            </div>

            <div className="summary-item">
              <span>Total Pendapatan</span>
              <strong>
                Rp {Number(user.totalPendapatan).toLocaleString()}
              </strong>
            </div>
          </div>
        </div>

        <h2 className="riwayat-title">Riwayat Transaksi</h2>

        <div className="riwayat-grid">
          {transaksi.map((item) => (
            <div key={item.id} className="riwayat-card">
              <h3>{item.kategori}</h3>

              <p>
                <strong>Keterangan:</strong> {item.keterangan}
              </p>

              <p>
                <strong>Berat:</strong> {(item.berat / 1000).toFixed(1)} Kg
              </p>

              <p>
                <strong>Harga:</strong> Rp{" "}
                {Number(item.totalharga).toLocaleString()}
              </p>

              <p>
                <strong>Status:</strong> {item.status}
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
              <button
                className="btn-lokasi-detail"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${item.latitude},${item.longitude}`,
                    "_blank",
                  )
                }
              >
                📍 Lihat Lokasi
              </button>
              <button
                className="btn-wa"
                onClick={() =>
                  window.open(
                    `https://wa.me/62${item.no_hp.replace(/^0/, "")}`,
                    "_blank",
                  )
                }
              >
                💬 WhatsApp
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminUserDetail;
