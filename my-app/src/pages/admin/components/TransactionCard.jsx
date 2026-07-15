import React from "react";
import "./style/TransactionCard.css";
import StatusDropdown from "./StatusDropdown";
import MapsButton from "./MapsButton";
import WaButton from "./WaButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faCommentDots,
  faScaleBalanced,
  faWallet,
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

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

      <div className="card-detail-list">
        <div className="card-detail-item">
          <span className="detail-label">
            <FontAwesomeIcon icon={faTag} /> Kategori
          </span>
          <span className="detail-value">{item.kategori}</span>
        </div>

        <div className="card-detail-item">
          <span className="detail-label">
            <FontAwesomeIcon icon={faCommentDots} /> Keterangan
          </span>
          <span className="detail-value">{item.keterangan}</span>
        </div>

        <div className="card-detail-item">
          <span className="detail-label">
            <FontAwesomeIcon icon={faScaleBalanced} /> Berat
          </span>
          <span className="detail-value">
            {(item.berat / 1000).toFixed(1)} Kg
          </span>
        </div>

        <div className="card-detail-item">
          <span className="detail-label">
            <FontAwesomeIcon icon={faWallet} /> Harga
          </span>
          <span className="detail-value detail-total">
            Rp {item.totalharga.toLocaleString()}
          </span>
        </div>

        <div className="card-detail-item">
          <span className="detail-label">
            <FontAwesomeIcon icon={faLocationDot} /> Lokasi
          </span>
          <span className="detail-value">{item.lokasi}</span>
        </div>

        <div className="card-detail-item">
          <span className="detail-label">
            <FontAwesomeIcon icon={faCalendarDays} /> Tanggal
          </span>
          <span className="detail-value">
            {new Date(item.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {item.foto && (
        <img
          src={`http://sdu-project.web.id/api/uploads/transaksi/${item.foto}`}
          alt="Foto Sampah"
          className="foto-sampah"
        />
      )}

      <div className="card-actions">
        <MapsButton item={item} />
        <WaButton item={item} />
      </div>
    </div>
  );
}

export default TransactionCard;
