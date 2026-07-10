import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfilUser,
  ubahProfilUser,
  uploadProfilUser,
} from "../services/userService";
import "./style/ProfilComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faUser,
  faPhone,
  faLocationDot,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

function ProfilComponent({ redirecTo }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [fotoProfil, setFotoProfil] = useState("");
  const [fotoFile, setFotoFile] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
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

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file);
      setPreviewFoto(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const fotoTampil = previewFoto
    ? previewFoto
    : fotoProfil
      ? `http://localhost:5000/uploads/profil/${fotoProfil}`
      : null;

  return (
    <div className="profil-page">
      <div className="profil-container">
        {/* ===== COVER BANNER ===== */}
        <div className="profil-cover">
          <div className="cover-blob cover-blob-1" />
          <div className="cover-blob cover-blob-2" />
        </div>

        {/* ===== FOTO PROFIL (mengambang) ===== */}
        <div className="profil-foto-section">
          <div className="profil-foto-wrapper">
            {fotoTampil ? (
              <img src={fotoTampil} alt="Profil" className="profil-img" />
            ) : (
              <div className="profil-placeholder">
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}

            <button
              type="button"
              className="btn-camera"
              onClick={() => fileInputRef.current.click()}
            >
              <FontAwesomeIcon icon={faCamera} />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFotoChange}
            />
          </div>

          <h2 className="profil-nama-display">{nama || "Nama Pengguna"}</h2>
          <p className="profil-role-display">Warga Sawahlunto</p>
        </div>

        {/* ===== FORM ===== */}
        <div className="profil-form">
          <label>
            <FontAwesomeIcon icon={faUser} /> Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <label>
            <FontAwesomeIcon icon={faPhone} /> Nomor HP
          </label>
          <input
            type="text"
            placeholder="Masukkan nomor HP aktif"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
          />

          <label>
            <FontAwesomeIcon icon={faLocationDot} /> Alamat
          </label>
          <textarea
            rows="4"
            placeholder="Masukkan alamat lengkap"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />

          <button
            className="btn-simpan-profil"
            onClick={handleSave}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilComponent;
