import { useEffect, useState } from "react";

function TestApi() {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/transaksi")
      .then((res) => res.json())
      .then((data) => {
        setTransaksi(data);
      });
  }, []);

  const kirimData = async () => {
    const response = await fetch("http://localhost:5000/transaksi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kategori: "Plastik",
        berat: 500,
      }),
    });
    const data = await response.json();

    console.log(data);
  };

  return (
    <div>
      <h1>DataTransaksi Backend</h1>
      {transaksi.map((item) => (
        <p key={item.id}>
          {item.kategori} - {item.berat} gram
        </p>
      ))}

      <button onClick={kirimData}>TestPost</button>
    </div>
  );
}

export default TestApi;
