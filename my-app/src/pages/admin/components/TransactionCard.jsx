import React from "react";
import "./style/TransactionCard.css";
import StatusDropdown from "./StatusDropdown";
import MapsButton from "./MapsButton";
import WaButton from "./WaButton";
import { replace } from "react-router-dom";

function TransactionCard({ item, updateStatus }) {
  return (
    <div key={item.id} className="admin-transaksi-card">
      <div className="admin-transaksi-card-header">
        <div>
          <h3>{item.nama}</h3>
          <p>{item.no_hp}</p>
        </div>
        <StatusDropdown item={item} updateStatus={updateStatus} />
      </div>

      <p>
        <strong>Kategori:</strong> {item.kategori}
      </p>

      <p>
        <strong>Keterangan:</strong> {item.keterangan}
      </p>

      <p>
        <strong>Berat:</strong> {(item.berat / 1000).toFixed(1)} Kg
      </p>

      <p>
        <strong>Harga:</strong> Rp {item.totalharga.toLocaleString()}
      </p>

      <p>
        <strong>Lokasi:</strong> {item.lokasi}
      </p>

      <p>
        <strong>Tanggal:</strong>{" "}
        {new Date(item.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      {item.foto && (
        <img
          src={`http://localhost:5000/uploads/transaksi/${item.foto}`}
          alt="Foto Sampah"
          className="foto-sampah"
        />
      )}
      <MapsButton item={item} />
      <WaButton item={item} replace={replace} />
    </div>
  );
}

export default TransactionCard;
