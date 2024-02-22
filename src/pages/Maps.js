import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { iconPerson } from "../service/icon";

export default function Maps({ latitude, longitude, location }) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={40}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />{" "}
      <Marker position={[latitude, longitude]} icon={iconPerson}>
        <Popup>Lokasi Pos : {location}</Popup>
      </Marker>
    </MapContainer>
  );
}
