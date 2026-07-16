import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  getGrafikTransaksi,
  getGrafikKategori,
} from "../../../services/transaksiService";
import "./style/CardGrafik.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const WARNA_KATEGORI = ["#0b3d2e", "#1f7a52", "#2fa66d", "#c9a45c", "#7fbf9e"];

function CardGrafik() {
  const [grafikData, setGrafikData] = useState([]);
  const [kategoriData, setKategoriData] = useState([]);

  const namaBulan = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const chartData = {
    labels: grafikData.map((item) => namaBulan[item.bulan]),
    datasets: [
      {
        label: "Jumlah Transaksi",
        data: grafikData.map((item) => item.total),
        backgroundColor: "#1f7a52",
        hoverBackgroundColor: "#0b3d2e",
        borderRadius: 8,
        maxBarThickness: 42,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#55665f", font: { size: 12 } },
      },
    },
    scales: {
      x: {
        ticks: { color: "#55665f" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#55665f" },
        grid: { color: "#e6f1ea" },
      },
    },
  };

  const kategoriChartData = {
    labels: kategoriData.map((item) => item.kategori),
    datasets: [
      {
        data: kategoriData.map((item) => item.total),
        backgroundColor: WARNA_KATEGORI,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const kategoriOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#55665f", font: { size: 11 }, boxWidth: 12 },
      },
    },
  };

  useEffect(() => {
    const loadData = async () => {
      const grafikTransaksi = await getGrafikTransaksi(setGrafikData);
      setGrafikData(grafikTransaksi);

      const grafikKategori = await getGrafikKategori(setKategoriData);
      setKategoriData(grafikKategori);
    };

    loadData();
  }, []);

  return (
    <div className="grafik-wrapper">
      <div className="grafik-section">
        <h2>Grafik Transaksi Bulanan</h2>
        <div className="grafik-card">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="grafik-section">
        <h2>Kategori Sampah</h2>
        <div className="grafik-card">
          <Doughnut data={kategoriChartData} options={kategoriOptions} />
        </div>
      </div>
    </div>
  );
}

export default CardGrafik;
