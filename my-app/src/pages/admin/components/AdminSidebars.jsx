import { Link } from "react-router-dom";
import "./style/AdminSidebar.css";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2>SDU Admin</h2>

      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/admin/transaksi">Transaksi</Link>
        </li>

        <li>
          <Link to="/admin/harga">Harga</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;