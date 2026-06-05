import { transaksiDummy } from "../data/transaksiDummy";
import Navbar from "../components/Navbar";

function Riwayat() {
  return (
    <div>
    <Navbar/>
    <div style={{ padding: "20px" }}>
      <h1>Riwayat Transaksi</h1>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Jenis</th>
            <th>Keterangan</th>
            <th>Berat</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {transaksiDummy.map((item) => (
            <tr key={item.id}>
              <td>{item.kategori}</td>
              <td>{item.keterangan}</td>
              <td>{item.berat} gr</td>
              <td>
                Rp {item.totalHarga.toLocaleString()}
              </td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Riwayat;