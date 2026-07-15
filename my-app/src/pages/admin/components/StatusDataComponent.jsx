import React, { useState, useEffect } from "react";
import "./style/StatusDataComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faGears,
  faTruck,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

function StatusDataComponent() {
  const [statusData, setStatusData] = useState({
    Menunggu: 0,
    Diproses: 0,
    Dijemput: 0,
    Selesai: 0,
  });

  useEffect(() => {
    fetch("http://sdu-project.web.id/api/admin/status-transaksi")
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
  }, []);

  return (
    <div className="status-section">
      <h2>Status Transaksi</h2>

      <div className="status-grid">
        <div className="status-card menunggu">
          <div className="status-icon">
            <FontAwesomeIcon icon={faHourglassHalf} />
          </div>
          <div>
            <p className="status-angka">{statusData.Menunggu}</p>
            <h3>Menunggu</h3>
          </div>
        </div>

        <div className="status-card diproses">
          <div className="status-icon">
            <FontAwesomeIcon icon={faGears} />
          </div>
          <div>
            <p className="status-angka">{statusData.Diproses}</p>
            <h3>Diproses</h3>
          </div>
        </div>

        <div className="status-card dijemput">
          <div className="status-icon">
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div>
            <p className="status-angka">{statusData.Dijemput}</p>
            <h3>Dijemput</h3>
          </div>
        </div>

        <div className="status-card selesai">
          <div className="status-icon">
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <div>
            <p className="status-angka">{statusData.Selesai}</p>
            <h3>Selesai</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusDataComponent;
