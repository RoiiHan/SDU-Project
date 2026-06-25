import React from "react";
import "./style/MapsButton.css";

function MapsButton({ item }) {
  return (
    <button
      className="btn-lokasi-lat"
      onClick={() =>
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`,
          "_blank",
        )
      }
    >
      📍 Lihat Lokasi
    </button>
  );
}

export default MapsButton;
