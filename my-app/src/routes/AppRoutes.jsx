import { Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Transaksi from "../pages/Transaksi";
import Riwayat from "../pages/Riwayat";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminTransaksi from "../pages/admin/AdminTransaksi";
import AdminHarga from "../pages/admin/AdminHarga";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/transaksi" element={<Transaksi />} />
      <Route path="/riwayat" element={<Riwayat />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />}/>
      <Route path="/admin/transaksi" element={<AdminTransaksi />}/>
      <Route path="/admin/harga" element={<AdminHarga />}/>
      <Route path="/admin/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;