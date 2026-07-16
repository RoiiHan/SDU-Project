import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import "./style/TransaksiTerbaru.css";

const TransaksiTerbaru = ({ transactions }) => {
  return (
    <div className="transaksi-terbaru">
      <div className="section-title">
        <FontAwesomeIcon icon={faReceipt} />
        <h2>Transaksi Terbaru</h2>
      </div>

      {transactions.length === 0 ? (
        <p className="empty-text">Belum ada transaksi.</p>
      ) : (
        transactions.slice(0, 5).map((item) => (
          <div className="transaksi-row" key={item.id}>
            <div>
              <strong>{item.nama}</strong>
              <p>
                {item.kategori} - {(item.berat / 1000).toLocaleString("id-ID")}{" "}
                kg
              </p>
            </div>
            <span className={`status-badge ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default TransaksiTerbaru;
