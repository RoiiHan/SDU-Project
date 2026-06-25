import React from "react";
import "./style/WaButton.css";

function WaButton({ item, replace }) {
  return (
    <button
      className="btn-wa"
      onClick={() =>
        window.open(`https://wa.me/62${item.no_hp.replace(/^0/, "")}`, "_blank")
      }
    >
      💬 WhatsApp
    </button>
  );
}

export default WaButton;
