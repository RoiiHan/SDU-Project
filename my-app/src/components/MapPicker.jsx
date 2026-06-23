import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

function LocationMarker({ setLatitude, setLongitude }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);
      setLatitude(lat);
      setLongitude(lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function MapPicker({ setLatitude, setLongitude }) {
  return (
    <MapContainer
      center={[-0.947083, 100.417181]}
      zoom={13}
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "10px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker setLatitude={setLatitude} setLongitude={setLongitude} />
    </MapContainer>
  );
}

export default MapPicker;
