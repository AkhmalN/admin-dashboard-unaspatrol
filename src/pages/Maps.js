import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function Maps() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize map
    const map = L.map(mapRef.current).setView(
      [-6.230333779294344, 106.83303548372106],
      13
    );

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Add a marker
    L.marker([-6.230333779294344, 106.83303548372106])
      .addTo(map)
      .bindPopup("A pretty popup. Easily customizable.")
      .openPopup();
  }, []);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
}
