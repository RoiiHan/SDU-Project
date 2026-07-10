import React from "react";
import "./style/CardsDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faFileInvoiceDollar,
  faScaleBalanced,
  faTree,
  faWallet,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

function CardsDashboard({ dashboardData }) {
  return (
    <div className="container-dashboard">
      <div className="container-dashboard-kiri">
        <div>
          <p className="inshigt">
            <FontAwesomeIcon icon={faLeaf} /> INSIGHT HARI INI
          </p>
          <p className="title-kiri">
            Setor sampah lebih terukur, hasil lebih jelas, dan dampak lingkungan
            terasa nyata setiap minggu.
          </p>
          <p className="text-kiri">
            Untuk hasil yang lebih optimal dan mempercepat proses verifikasi,
            pastikan sampah Anda sudah dipilah berdasarkan kategorinya sebelum
            diserahkan kepada petugas pickup.
          </p>
        </div>
        <div>
          <button className="btn-kiri">
            Buat Transaksi Baru <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <div className="container-dashboard-kanan">
        <div className="card">
          <p className="card-text">
            Total Transaksi <FontAwesomeIcon icon={faFileInvoiceDollar} />
          </p>
          <p className="container-kanan-data">{dashboardData.totalTransaksi}</p>
        </div>

        <div className="card">
          <p className="card-text">
            Total Berat <FontAwesomeIcon icon={faScaleBalanced} />
          </p>
          <p className="container-kanan-data">
            {dashboardData.totalBerat || 0} Gr
          </p>
        </div>

        <div className="card">
          <p className="card-text">
            Total Pendapatan <FontAwesomeIcon icon={faWallet} />
          </p>
          <p className="container-kanan-data">
            Rp {(dashboardData.totalPendapatan || 0).toLocaleString()}
          </p>
        </div>

        <div className="card">
          <p className="card-text">
            Usia Akun <FontAwesomeIcon icon={faTree} />
          </p>
          <p className="container-kanan-data">8 bulan / 240 hari</p>
        </div>
      </div>
    </div>
  );
}

export default CardsDashboard;
