const API_URL = "http://localhost:5000/";

// ==========================
// AdminTransaksi.jsx
export async function getAllTransaksi() {
  const response = await fetch(`${API_URL}admin/transaksi`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  return response.json();
}

export async function updateStatusTransaksi(id, status) {
  const response = await fetch(`${API_URL}admin/transaksi/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });

  if (!response.ok) {
    throw new Error("Gagal mengubah status Transaksi");
  }

  return response.json();
}

// ==========================
// FETCH Transaksi.jsx
export async function createTransaksi(transaksiBaru) {
  const response = await fetch(`${API_URL}transaksi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaksiBaru),
  });
  if (!response.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  return response.json();
}

export async function uploadFoto(formData) {
  const response = await fetch(`${API_URL}upload-foto`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  return response.json();
}

// ==========================
// Riwayat Transaksi.jsx

export async function getRiwayatTransaksiUser(id) {
  const response = await fetch(`${API_URL}transaksi/user/${id}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  return response.json();
}
