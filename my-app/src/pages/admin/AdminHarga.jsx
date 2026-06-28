import AdminSidebar from "./components/AdminSidebars";
import "./style/AdminHarga.css";
import CardHarga from "./components/CardHarga";

function AdminHarga() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Kelola Harga Sampah</h1>
        <CardHarga />
      </div>
    </div>
  );
}

export default AdminHarga;
