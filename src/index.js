import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import Dashboard from "./pages/Dashboard";
import LogPatroli from "./pages/LogPatroli";
import Maps from "./pages/Maps";
import Map from "./pages/Map";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={Dashboard} />
      <Route path="/map" Component={Map} />
    </Routes>
  </BrowserRouter>
);
