import { useEffect , useState } from "react";

function TestApi() {
    const [transaksi, setTransaksi] =useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/transaksi")
        .then((res) => res.json())
        .then((data) => {
            setTransaksi(data);
        })
    }, [])

  return (
    <div>
        <h1>DataTransaksi Backend</h1>
        {transaksi.map((item) => (
            <p key={item.id}>
                {item.kategori} - {item.berat} gram 
            </p>
        ))}
    </div>
  )
}

export default TestApi