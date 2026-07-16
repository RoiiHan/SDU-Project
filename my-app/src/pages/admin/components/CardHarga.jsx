import React, { useEffect, useState } from "react";
import { getHargaAdmin } from "../../../services/hargaServices";
import "./style/CardHarga.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBottleWater,
  faBoxOpen,
  faTrashCan,
  faTools,
  faWineGlass,
  faRecycle,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  plastik: faRecycle,
  kardus: faBoxOpen,
  botol: faBottleWater,
  kaleng: faTrashCan,
  besi: faTools,
  pecah_belah: faWineGlass,
};

function getIconKategori(kategori) {
  return iconMap[kategori?.toLowerCase()] || faRecycle;
}

function CardHarga() {
  const [harga, setHarga] = useState([]);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await getHargaAdmin();
      setHarga(data);
    };

    loadData();
  }, []);

  const handleHargaChange = (id, value) => {
    setHarga((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              harga: value,
            }
          : item,
      ),
    );
  };

  const simpanHarga = async (id, hargaBaru) => {
    setSavingId(id);
    try {
      const response = await fetch(
        `https://sdu-project.web.id/api/admin/harga/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            harga: hargaBaru,
          }),
        },
      );

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Gagal update harga");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="harga-grid">
      {harga.map((item) => {
        const hargaPerKg = Number(item.harga || 0) * 10;

        return (
          <div key={item.id} className="harga-card">
            <div className="harga-card-header">
              <div className="harga-icon">
                <FontAwesomeIcon icon={getIconKategori(item.kategori)} />
              </div>
              <h3>{item.kategori}</h3>
            </div>

            <label>Harga / 100 gram</label>
            <div className="harga-input-wrapper">
              <span className="input-prefix">Rp</span>
              <input
                type="number"
                value={item.harga}
                onChange={(e) => handleHargaChange(item.id, e.target.value)}
              />
            </div>

            <div className="harga-preview">
              <span>Setara per Kg</span>
              <strong>Rp {hargaPerKg.toLocaleString()}</strong>
            </div>

            <button
              className="btn-simpan-harga"
              onClick={() => simpanHarga(item.id, item.harga)}
              disabled={savingId === item.id}
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
              {savingId === item.id ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default CardHarga;
