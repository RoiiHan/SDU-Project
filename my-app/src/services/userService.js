const API_URL = "http://localhost:5000/";

// Halaman Transaksi.jsx
export async function getAlamatUser(id) {
  const response = await fetch(`${API_URL}user/${id}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  return response.json();
}

// ==============================
// Halaman Profil

export async function getProfilUser(id) {
  const response = await fetch(`${API_URL}user/${id}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  return response.json();
}

export async function uploadProfilUser(formData) {
  const response = await fetch(`${API_URL}upload-profil`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  return response.json();
}

// =================
// AdminUser.jsx

export async function getUserAdmin(setUsers) {
  const response = await fetch(`${API_URL}admin/user`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  return response.json();
}
