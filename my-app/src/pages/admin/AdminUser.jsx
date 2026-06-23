import { useState, useEffect } from "react";
import AdminSidebar from "./components/AdminSidebars";
import "./style/AdminUser.css";
import { useNavigate } from "react-router-dom";

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/admin/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      user.nama.toLowerCase().includes(keyword) || user.no_hp.includes(keyword)
    );
  });

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-user-content">
        <h1>Kelola User</h1>

        <div className="admin-user-search">
          <input
            type="text"
            placeholder="Cari nama atau nomor HP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="admin-user-grid">
          {filteredUsers.map((user) => (
            <div key={user.id} className="admin-user-card">
              <div className="admin-user-header">
                <h3>{user.nama}</h3>
                <p>{user.no_hp}</p>
              </div>

              <div className="admin-user-stats">
                <div className="user-stat-box">
                  <span>Total Transaksi</span>
                  <strong>{user.totalTransaksi}</strong>
                </div>

                <div className="user-stat-box">
                  <span>Total Berat</span>
                  <strong>
                    {(Number(user.totalBerat) / 1000).toFixed(1)} Kg
                  </strong>
                </div>

                <div className="user-stat-box">
                  <span>Total Pendapatan</span>
                  <strong>
                    Rp {Number(user.totalPendapatan).toLocaleString()}
                  </strong>
                </div>
              </div>

              <button
                className="btn-detail-user"
                onClick={() => navigate(`/admin/user/${user.id}`)}
              >
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
