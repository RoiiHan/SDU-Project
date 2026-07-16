import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebars";
import "./style/AdminUserDetail.css";

function AdminUserDetail() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    fetch(`https://sdu-project.web.id/api/admin/user/${id}`)
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
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-user-detail-content">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-user-detail-content">
        <h1>Detail User</h1>

        <div className="user-detail-card">
          <div className="user-profile-section">
            {user.foto_profil ? (
              <img
                src={`https://sdu-project.web.id/api/uploads/profil/${user.foto_profil}`}
                alt="Foto Profil"
                className="user-profile-img"
              />
            ) : (
              <div className="user-profile-placeholder">👤</div>
            )}

            <div className="user-profile-info">
              <h2>{user.nama}</h2>

              <p>
                <strong>No HP:</strong> {user.no_hp}
              </p>

              <p>
                <strong>Alamat:</strong> {user.alamat || "Belum mengisi alamat"}
              </p>

              <button
                className="btn-wa"
                onClick={() =>
                  window.open(
                    `https://wa.me/62${user.no_hp.replace(/^0/, "")}`,
                    "_blank",
                  )
                }
              >
                💬 Hubungi WhatsApp
              </button>
            </div>
          </div>

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

        <h2 className="riwayat-title">
          Riwayat Transaksi ({transaksi.length})
        </h2>

        <div className="riwayat-grid">
          {transaksi.map((item) => (
            <div key={item.id} className="riwayat-card">
              {item.foto && (
                <img
                  src={`https://sdu-project.web.id/api/uploads/transaksi/${item.foto}`}
                  alt="Foto Sampah"
                  className="detail-foto-sampah"
                />
              )}

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
                <strong>Status:</strong>{" "}
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminUserDetail;
