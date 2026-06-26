import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import ProfilComponent from "../components/ProfilComponent";

function Profil() {
  return (
    <div>
      <Navbar />
      <ProfilComponent redirecTo="/dashboard" />
    </div>
  );
}

export default Profil;
