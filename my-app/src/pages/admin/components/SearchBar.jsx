import React from "react";
import "./style/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ search, setSearch, filterStatus, setFilterStatus }) {
  return (
    <div className="filter-search-container">
      <div className="search-input-wrapper">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          type="text"
          placeholder="Cari nama, no HP, atau kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="Semua">Semua Status</option>
        <option value="Menunggu">Menunggu</option>
        <option value="Diproses">Diproses</option>
        <option value="Dijemput">Dijemput</option>
        <option value="Selesai">Selesai</option>
      </select>
    </div>
  );
}

export default SearchBar;
