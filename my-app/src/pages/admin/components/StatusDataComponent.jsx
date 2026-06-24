import React from "react";
import "./style/StatusDataComponent.css";
import { useState } from "react";
import { useEffect } from "react";

function StatusDataComponent() {
  const [statusData, setStatusData] = useState({
    Menunggu: 0,
    Diproses: 0,
    Dijemput: 0,
    Selesai: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/admin/status-transaksi")
      .then((res) => res.json())
      .then((data) => {
        const statusResult = {
          Menunggu: 0,
          Diproses: 0,
          Dijemput: 0,
          Selesai: 0,
        };

        data.forEach((item) => {
          statusResult[item.status] = item.total;
        });

        setStatusData(statusResult);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="status-section">
      <h2>Status Transaksi</h2>

      <div className="status-grid">
        <div className="status-card menunggu">
          <h3>Menunggu</h3>
          <p>{statusData.Menunggu}</p>
        </div>

        <div className="status-card diproses">
          <h3>Diproses</h3>
          <p>{statusData.Diproses}</p>
        </div>

        <div className="status-card dijemput">
          <h3>Dijemput</h3>
          <p>{statusData.Dijemput}</p>
        </div>

        <div className="status-card selesai">
          <h3>Selesai</h3>
          <p>{statusData.Selesai}</p>
        </div>
      </div>
    </div>
  );
}

export default StatusDataComponent;
