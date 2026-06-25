import React from "react";
import "./style/StatusDropdown.css";

function StatusDropdown({ item, updateStatus }) {
  return (
    <select
      className={`status ${item.status.toLowerCase()}`}
      value={item.status}
      onChange={(e) => updateStatus(item.id, e.target.value)}
    >
      <option value="Menunggu">Menunggu</option>
      <option value="Diproses">Diproses</option>
      <option value="Dijemput">Dijemput</option>
      <option value="Selesai">Selesai</option>
    </select>
  );
}

export default StatusDropdown;
