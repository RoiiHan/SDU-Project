import AdminLayout from "../../layouts/AdminLayout";
import "./style/AdminHarga.css";
import CardHarga from "./components/CardHarga";
import { faTag } from "@fortawesome/free-solid-svg-icons";

function AdminHarga() {
  return (
    <AdminLayout
      icon={faTag}
      title="Kelola Harga Sampah"
      subtitle="Atur harga per kategori sampah yang berlaku untuk seluruh transaksi warga."
    >
      <CardHarga />
    </AdminLayout>
  );
}

export default AdminHarga;
