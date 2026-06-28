import { useState, useEffect } from "react";
import AdminSidebar from "./components/AdminSidebars";
import "./style/AdminUser.css";
import ManageUser from "./components/CardManageUser";
import { getUserAdmin } from "../../services/userService";

function AdminUser() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getUserAdmin(setUsers);
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
            <ManageUser key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
