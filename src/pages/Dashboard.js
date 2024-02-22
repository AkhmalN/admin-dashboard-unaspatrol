import React from "react";
import Sidebar from "../components/Sidebar";
import "../utils/css/sb-admin-2.min.css";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Users from "../fragments/users";
import Patroli from "../fragments/patroli";
import Absensi from "../fragments/absensi";
import Aktivitas from "../fragments/aktivitas";
import { FaChevronCircleDown } from "react-icons/fa";
const Dashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const getData = async () => {
    try {
      const response = await axios.get("");
    } catch (error) {}
  };

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars" />
              </button>

              <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block" />
                <div className="nav-item dropdown no-arrow">
                  <Dropdown show={isDropdownOpen} onToggle={toggleDropdown}>
                    <Dropdown.Toggle variant="white">
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                        Admin
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right shadow animated--grow-in">
                      <Dropdown.Item href="#">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                        Settings
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                        Activity Log
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="#"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </ul>
            </nav>
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <Link className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                  <i className="fas fa-download fa-sm text-white-50" /> Generate
                  Report
                </Link>
              </div>
              <div className="row">
                <Users />
                <Patroli />
                <Absensi />
                <Aktivitas />
              </div>
            </div>
          </div>
          {/* Footer */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>
                  Copyright © Administrasi Umum Unas 2023{" "}
                  <FaChevronCircleDown />
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
