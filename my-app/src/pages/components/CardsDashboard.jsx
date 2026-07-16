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
import { Link } from "react-router-dom";

function CardsDashboard({ dashboardData }) {
  // 1. Mengambil data user dari localStorage untuk mengecek tanggal pembuatan akun
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // 2. Fungsi untuk menghitung selisih hari dan bulan dari created_at sampai hari ini
  const hitungUsiaAkun = (tanggalDibuat) => {
    if (!tanggalDibuat) return "0 bulan / 0 hari"; // Fallback jika data belum ada

    const tanggalAwal = new Date(tanggalDibuat);
    const tanggalSekarang = new Date();

    // Menghitung selisih waktu dalam milidetik
    const selisihWaktu = Math.abs(tanggalSekarang - tanggalAwal);

    // Mengubah milidetik menjadi total hari
    const selisihHari = Math.floor(selisihWaktu / (1000 * 60 * 60 * 24));

    // Mengubah hari menjadi estimasi bulan
    const selisihBulan = Math.floor(selisihHari / 30);

    return `${selisihBulan} bulan / ${selisihHari} hari`;
  };

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
          <Link to="/transaksi">
            <button className="btn-kiri">
              Buat Transaksi Baru <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </div>
      </div>

      <div className="container-dashboard-kanan">
        <div className="card">
          <p className="card-text">
            Total Transaksi <FontAwesomeIcon icon={faFileInvoiceDollar} />
          </p>
          <p className="container-kanan-data">
            {Number(dashboardData.totalTransaksi || 0).toLocaleString("en-US")}
          </p>
        </div>

        <div className="card">
          <p className="card-text">
            Total Berat <FontAwesomeIcon icon={faScaleBalanced} />
          </p>
          <p className="container-kanan-data">
            {/* Dibagi 1000 untuk jadi Kg, lalu diformat dengan koma */}
            {((dashboardData.totalBerat || 0) / 1000).toLocaleString(
              "id-ID",
            )}{" "}
            Kg
          </p>
        </div>

        <div className="card">
          <p className="card-text">
            Total Pendapatan <FontAwesomeIcon icon={faWallet} />
          </p>
          <p className="container-kanan-data">
            {/* Diformat dengan titik sebagai pemisah ribuan */}
            Rp{" "}
            {(Number(dashboardData.totalPendapatan) || 0).toLocaleString(
              "id-ID",
            )}
          </p>
        </div>

        <div className="card">
          <p className="card-text">
            Usia Akun <FontAwesomeIcon icon={faTree} />
          </p>
          <p className="container-kanan-data">
            {/* Memanggil fungsi hitung usia berdasarkan data akun user */}
            {hitungUsiaAkun(user.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardsDashboard;
