import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import Dashboard from "./pages/Dashboard";
import DataUser from "./pages/DataUser";
import DataAbsensi from "./pages/DataAbsensi";
import DataPatroli from "./pages/DataPatroli";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={Dashboard} />
      <Route path="/dashboard/users" Component={DataUser} />
      <Route path="/dashboard/absensi" Component={DataAbsensi} />
      <Route path="/dashboard/patroli" Component={DataPatroli} />
    </Routes>
  </BrowserRouter>
);
