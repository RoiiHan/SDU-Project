const API_URL = "http://sdu-project.web.id/api/";

export async function getLoginAuth(no_hp, password) {
  const response = await fetch(`${API_URL}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ no_hp, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login gagal");
  }

  return data;
}

export async function getRegisAuth(formData) {
  const response = await fetch(`${API_URL}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama: formData.nama,
      no_hp: formData.no_hp,
      alamat: formData.alamat,
      password: formData.password,
    }),
  });

  return response.json();
}
