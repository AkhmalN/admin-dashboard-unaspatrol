import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import Dashboard from "./pages/Dashboard";
<<<<<<< HEAD
import DataUser from "./pages/DataUser";
import DataAbsensi from "./pages/DataAbsensi";
import DataPatroli from "./pages/DataPatroli";
import Maps from "./pages/Maps";
import DataAktivitas from "./pages/DataAktivitas";
import "./App.css";
=======
import LogPatroli from "./pages/LogPatroli";
import Maps from "./pages/Maps";
import Map from "./pages/Map";
>>>>>>> 62a8f9d6a9aa750ff1f3e9e1be5cd7032766d67e

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={Dashboard} />
<<<<<<< HEAD
      <Route path="/dashboard/users" Component={DataUser} />
      <Route path="/dashboard/absensi" Component={DataAbsensi} />
      <Route path="/dashboard/aktivitas" Component={DataAktivitas} />
      <Route path="/dashboard/data_patroli" Component={DataPatroli} />
      <Route path="/dashboard/data_patroli/maps" Component={Maps} />
=======
      <Route path="/map" Component={Map} />
>>>>>>> 62a8f9d6a9aa750ff1f3e9e1be5cd7032766d67e
    </Routes>
  </BrowserRouter>
);
