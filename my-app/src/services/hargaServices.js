const API_URL = "http://localhost:5000/";

// Halaman Transaksi.jsx
export async function getHargaSampah() {
  const response = await fetch(`${API_URL}harga`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  return response.json();
}

// ====================
// adminHarga
export async function getHargaAdmin(setHarga) {
  const response = await fetch(`${API_URL}admin/harga`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  return response.json();
}
