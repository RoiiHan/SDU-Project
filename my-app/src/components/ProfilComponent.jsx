import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getProfilUser,
  ubahProfilUser,
  uploadProfilUser,
} from "../services/userService";
import { useEffect, useState } from "react";
import "./style/ProfilComponent.css";

function ProfilComponent({ redirecTo }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [fotoProfil, setFotoProfil] = useState("");
  const [fotoFile, setFotoFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const data = await getProfilUser(user.id);
      setNama(data.nama || "");
      setNoHp(data.no_hp || "");
      setAlamat(data.alamat || "");
      setFotoProfil(data.foto_profil || "");
    };

    loadData();
  }, [user.id]);

  const handleSave = async () => {
    try {
      let namaFileFoto = fotoProfil;

      if (fotoFile) {
        const formData = new FormData();

        formData.append("foto", fotoFile);

        const uploadData = await uploadProfilUser(formData);

        namaFileFoto = uploadData.filename;
      }

      const data = await ubahProfilUser(user.id, {
        nama,
        no_hp: noHp,
        alamat,
        foto_profil: namaFileFoto,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          nama,
          no_hp: noHp,
          alamat,
          foto_profil: namaFileFoto,
        }),
      );

      alert(data.message);
      navigate(redirecTo);
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan profil");
    }
  };

  return (
    <div className="profil-page">
      <div className="profil-container">
        <h1>Profil Saya</h1>

        <div className="profil-foto-section">
          {fotoProfil ? (
            <img
              src={`http://localhost:5000/uploads/profil/${fotoProfil}`}
              alt="Profil"
              className="profil-img"
            />
          ) : (
            <div className="profil-placeholder">Tidak Ada Foto</div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFotoFile(e.target.files[0])}
          />
        </div>

        <div className="profil-form">
          <label>Nama Lengkap</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <label>Nomor HP</label>
          <input
            type="text"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
          />

          <label>Alamat</label>
          <textarea
            rows="4"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />

          <button className="btn-simpan-profil" onClick={handleSave}>
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilComponent;
