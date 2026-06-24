import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 18);
    }
  }, [center, map]);

  return null;
}

function LocationMarker({ setLatitude, setLongitude }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);

        setLatitude(lat);
        setLongitude(lng);
      },
      (err) => {
        console.log(err);
      },
    );
  }, [setLatitude, setLongitude]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      setLatitude(lat);
      setLongitude(lng);
    },
  });

  return (
    <>
      {position && <ChangeView center={position} />}
      {position && <Marker position={position} />}
    </>
  );
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
