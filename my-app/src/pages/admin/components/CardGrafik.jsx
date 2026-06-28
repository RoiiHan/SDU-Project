import React from "react";
import { useState } from "react";
import { useEffect } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);
import {
  getGrafikTransaksi,
  getGrafikKategori,
} from "../../../services/transaksiService";

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

        backgroundColor: "#3B82F6",
        borderRadius: 8,
      },
    ],
  };

  const kategoriChartData = {
    labels: kategoriData.map((item) => item.kategori),

    datasets: [
      {
        data: kategoriData.map((item) => item.total),

        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
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
          <Bar data={chartData} />
        </div>
      </div>

      <div className="grafik-section">
        <h2>Kategori Sampah</h2>

        <div className="grafik-card">
          <Doughnut data={kategoriChartData} />
        </div>
      </div>
    </div>
  );
}

export default CardGrafik;
