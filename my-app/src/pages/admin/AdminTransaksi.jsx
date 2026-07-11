import { useState, useEffect } from "react";
import {
  getAllTransaksi,
  updateStatusTransaksi,
} from "../../services/transaksiService";
import AdminLayout from "../../layouts/AdminLayout";
import "./style/AdminTransaksi.css";
import StatusDataComponent from "./components/StatusDataComponent";
import TransactionCard from "./components/TransactionCard";
import SearchBar from "./components/SearchBar";
import { faCashRegister, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminTransaksi() {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    const loadTransaksi = async () => {
      try {
        const data = await getAllTransaksi();
        setTransaksi(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadTransaksi();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateStatusTransaksi(id, status);
      setTransaksi((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: status } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

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
    <AdminLayout
      icon={faCashRegister}
      title="Kelola Transaksi"
      subtitle="Pantau dan kelola semua transaksi sampah daur ulang warga."
    >
      <StatusDataComponent />

      <SearchBar
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {filteredTransaksi.length === 0 ? (
        <div className="transaksi-empty">
          <FontAwesomeIcon icon={faBoxOpen} className="empty-icon" />
          <h3>Tidak Ada Transaksi</h3>
          <p>Belum ada transaksi yang cocok dengan pencarian ini.</p>
        </div>
      ) : (
        <div className="admin-transaksi-grid">
          {filteredTransaksi.map((item) => (
            <TransactionCard
              key={item.id}
              item={item}
              updateStatus={updateStatus}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminTransaksi;
