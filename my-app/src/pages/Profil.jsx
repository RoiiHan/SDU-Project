import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./style/Profil.css";

function Profil() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [fotoProfil, setFotoProfil] = useState("");
  const [fotoFile, setFotoFile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setNama(data.nama || "");
        setNoHp(data.no_hp || "");
        setAlamat(data.alamat || "");
        setFotoProfil(data.foto_profil || "");
      })
      .catch((err) => console.log(err));
  }, [user.id]);

  const handleSave = async () => {
    try {
      let namaFileFoto = fotoProfil;

      if (fotoFile) {
        const formData = new FormData();

        formData.append("foto", fotoFile);

        const uploadResponse = await fetch(
          "http://localhost:5000/upload-profil",
          {
            method: "POST",
            body: formData,
          },
        );

        const uploadData = await uploadResponse.json();

        namaFileFoto = uploadData.filename;
      }

      const response = await fetch(`http://localhost:5000/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          no_hp: noHp,
          alamat,
          foto_profil: namaFileFoto,
        }),
      });

      const data = await response.json();

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
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan profil");
    }
  };

  return (
    <div>
      <Navbar />

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
    </div>
  );
}

export default Profil;
