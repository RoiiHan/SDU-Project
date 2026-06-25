import React from "react";
import { useState } from "react";
import "./style/SearchBar.css";

function SearchBar({ search, setSearch, filterStatus, setFilterStatus }) {
  return (
    <div className="filter-search-container">
      <input
        type="text"
        placeholder="Cari nama, no HP, atau kategori..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="Semua">Semua</option>
        <option value="Menunggu">Menunggu</option>
        <option value="Diproses">Diproses</option>
        <option value="Dijemput">Dijemput</option>
        <option value="Selesai">Selesai</option>
      </select>
    </div>
  );
}

export default SearchBar;
