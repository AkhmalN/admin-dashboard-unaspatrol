import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import Dashboard from "./pages/Dashboard";
import DataUser from "./pages/DataUser";
import DataAbsensi from "./pages/DataAbsensi";
import DataPatroli from "./pages/DataPatroli";
import Maps from "./pages/Maps";
import DataAktivitas from "./pages/DataAktivitas";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={Dashboard} />
      <Route path="/users" Component={DataUser} />
      <Route path="/absensi" Component={DataAbsensi} />
      <Route path="/aktivitas" Component={DataAktivitas} />
      <Route path="/data_patroli" Component={DataPatroli} />
      <Route path="/data_patroli/maps" Component={Maps} />
    </Routes>
  </BrowserRouter>
);
