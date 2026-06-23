import { Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";

import Landingpage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Transaksi from "../pages/Transaksi";
import Riwayat from "../pages/Riwayat";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminTransaksi from "../pages/admin/AdminTransaksi";
import AdminHarga from "../pages/admin/AdminHarga";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import AdminUser from "../pages/admin/AdminUser";
import AdminUserDetail from "../pages/admin/AdminUserDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Landingpage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/transaksi"
        element={
          <ProtectedRoute>
            <Transaksi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/riwayat"
        element={
          <ProtectedRoute>
            <Riwayat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/transaksi"
        element={
          <AdminRoute>
            <AdminTransaksi />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/user"
        element={
          <AdminRoute>
            <AdminUser />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/user/:id"
        element={
          <AdminRoute>
            <AdminUserDetail />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/harga"
        element={
          <AdminRoute>
            <AdminHarga />
          </AdminRoute>
        }
      />
      <Route path="/admin/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
