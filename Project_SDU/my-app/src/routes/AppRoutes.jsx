import { Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Transaksi from "../pages/Transaksi";
import Riwayat from "../pages/Riwayat";

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
    </Routes>
  );
}

export default AppRoutes;