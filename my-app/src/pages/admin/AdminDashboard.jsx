import "./style/AdminDashboard.css";
import AdminSidebar from "../admin/components/AdminSidebars";

function AdminDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Dashboard Admin</h1>
        <p>
          selamat datang, {user.email}
        </p>

        <div className="admin-cards">
          <div className="admin-card">
            <h3>Total Transaksi</h3>
            <p>120</p>
          </div>

          <div className="admin-card">
            <h3>Total User</h3>
            <p>45</p>
          </div>

          <div className="admin-card">
            <h3>Total Berat</h3>
            <p>550 Kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;