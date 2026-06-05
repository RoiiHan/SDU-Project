import AdminSidebar from "../admin/components/AdminSidebars";
import { transaksiDummy } from "../../data/transaksiDummy";
import "./style/AdminTransaksi.css"

function AdminTransaksi() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Kelola Transaksi</h1>

        <div className="riwayat-grid">
          {transaksiDummy.map((item) => (
            <div
              key={item.id}
              className="transaksi-item"
            >
              <h3>{item.kategori}</h3>

              <p>{item.keterangan}</p>

              <p>Berat: {item.berat} gram</p>

              <p>
                Rp {item.totalHarga.toLocaleString()}
              </p>

              <p>Status: {item.status}</p>

              <button>
                Ubah Status
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminTransaksi;