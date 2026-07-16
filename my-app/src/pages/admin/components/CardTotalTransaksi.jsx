import React from "react";
import "./style/CardTotalTransaksi.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoiceDollar,
  faUsers,
  faScaleBalanced,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

function CardTotalTransaksi({ dashboard }) {
  return (
    <div className="admin-cards">
      <div className="admin-card">
        <div className="admin-card-icon">
          <FontAwesomeIcon icon={faFileInvoiceDollar} />
        </div>
        <div>
          <p className="admin-card-value">{dashboard.totalTransaksi}</p>
          <h3>Total Transaksi</h3>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-icon">
          <FontAwesomeIcon icon={faUsers} />
        </div>
        <div>
          <p className="admin-card-value">{dashboard.totalUser}</p>
          <h3>Total User</h3>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-icon">
          <FontAwesomeIcon icon={faScaleBalanced} />
        </div>
        <div>
          <p className="admin-card-value">
            {(dashboard.totalBerat / 1000).toLocaleString("id-ID")} KG
          </p>
          <h3>Total Berat</h3>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-icon">
          <FontAwesomeIcon icon={faWallet} />
        </div>
        <div>
          <p className="admin-card-value">
            Rp {Number(dashboard.totalPendapatan || 0).toLocaleString()}
          </p>
          <h3>Total Pendapatan</h3>
        </div>
      </div>
    </div>
  );
}

export default CardTotalTransaksi;
