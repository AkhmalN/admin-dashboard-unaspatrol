import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import Dashboard from "./pages/admin/Dashboard";
import Presensi from "./pages/admin/Presensi";
import Pengajuan from "./pages/admin/Pengajuan";
import DataMahasiswa from "./pages/admin/DataMahasiswa";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/dashboard" Component={Dashboard} />
      <Route path="/dashboard/presensi" Component={Presensi} />
      <Route path="/dashboard/pengajuan" Component={Pengajuan} />
      <Route path="/dashboard/data_mahasiswa" Component={DataMahasiswa} />
    </Routes>
  </BrowserRouter>
);
