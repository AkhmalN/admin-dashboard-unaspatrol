// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <ul
      className="navbar-nav admin-sidebar sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text ml-2">Toko Manuk</div>
      </Link>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <Link to="/" className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </Link>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">Daftar</div>
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <Link
          to="/dashboard/absensi"
          className="nav-link collapsed"
          href="#"
          // data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i class="fas fa-clipboard"></i> <span>Daftar Toko</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/map"
          className="nav-link collapsed"
          href="#"
          // data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i class="fas fa-clipboard"></i> <span>Pencarian Toko</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div>
    </ul>
  );
};

export default Sidebar;
