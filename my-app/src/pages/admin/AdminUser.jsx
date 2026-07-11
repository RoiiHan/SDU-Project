import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "./style/AdminUser.css";
import ManageUser from "./components/CardManageUser";
import { getUserAdmin } from "../../services/userService";
import {
  faUsers,
  faMagnifyingGlass,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminUser() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getUserAdmin();
      setUsers(data);
    };
    loadData();
  }, []);

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      user.nama.toLowerCase().includes(keyword) || user.no_hp.includes(keyword)
    );
  });

  return (
    <AdminLayout
      icon={faUsers}
      title="Kelola User"
      subtitle="Lihat dan kelola seluruh data warga terdaftar di SDU."
    >
      <div className="admin-user-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          type="text"
          placeholder="Cari nama atau nomor HP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="user-empty">
          <FontAwesomeIcon icon={faUserSlash} className="empty-icon" />
          <h3>Tidak Ada User</h3>
          <p>Belum ada user yang cocok dengan pencarian ini.</p>
        </div>
      ) : (
        <div className="admin-user-grid">
          {filteredUsers.map((user) => (
            <ManageUser key={user.id} user={user} />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminUser;
