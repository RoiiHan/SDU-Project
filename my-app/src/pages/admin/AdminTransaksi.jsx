import { useState, useEffect } from "react";
import AdminSidebar from "./components/AdminSidebars";
import "./style/AdminTransaksi.css";
import StatusDataComponent from "./components/StatusDataComponent";
import TransactionCard from "./components/TransactionCard";
import SearchBar from "./components/SearchBar";

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

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1 className="admin-transaksi-title">Kelola Transaksi</h1>
        <StatusDataComponent />
        <SearchBar
          search={search}
          setSearch={setSearch}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <div className="admin-transaksi-grid">
          {filteredTransaksi.map((item) => (
            <TransactionCard
              key={item.id}
              item={item}
              updateStatus={updateStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminTransaksi;
