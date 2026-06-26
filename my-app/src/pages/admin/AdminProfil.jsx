import React from "react";
import ProfilComponent from "../../components/ProfilComponent";
import Navbar from "../../components/Navbar";

function AdminProfil() {
  return (
    <div>
      <Navbar />
      <ProfilComponent redirecTo="/admin/dashboard" />
    </div>
  );
}

export default AdminProfil;
