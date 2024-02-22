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
<<<<<<< HEAD
          <i className="fas fa-clipboard"></i> <span>Data Absensi</span>
        </Link>
      </li>
      {/* Nav Item - Utilities Collapse Menu */}
      {/* <li className="nav-item">
        <Link
          to="/dashboard/patroli"
          className="nav-link collapsed"
          href="#"
          // data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i class="fas fa-user-shield"></i> <span>Data Log Patroli</span>
=======
          <i class="fas fa-clipboard"></i> <span>Daftar Toko</span>
>>>>>>> 62a8f9d6a9aa750ff1f3e9e1be5cd7032766d67e
        </Link>
      </li> */}
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
<<<<<<< HEAD
          <i className="fas fa-user-shield"></i> <span>Data Patroli</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/dashboard/users"
          className="nav-link collapsed"
          href="#"
          // data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i className="far fa-user"></i> <span>Data User</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/dashboard/aktivitas"
          className="nav-link collapsed"
          href="#"
          // data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i className="fas fa-user-shield"></i> <span>Data Aktivitas</span>
=======
          <i class="fas fa-clipboard"></i> <span>Pencarian Toko</span>
>>>>>>> 62a8f9d6a9aa750ff1f3e9e1be5cd7032766d67e
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
