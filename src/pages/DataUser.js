import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DATA from "../DATA";
import "../App.css";
import { Button, Row } from "react-bootstrap";
import axios from "axios";
function DataUser() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dataUser, setDataUser] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.192.180:8083/api/users/"
      );
      setDataUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <div id="wrapper">
      <Sidebar />
      <div className="admin-bg container-fluid p-5 w-100">
        <div className="card shadow mb-4">
          {/* Card Header - Dropdown */}
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-arround">
            <h6 className="m-0 font-weight-bold text-primary">Data Users</h6>
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border border-secondary small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* Card Body */}
          <div className="card-body">
            <div className="card-body d-flex">
              <Row className="mr-4">
                <Button className="btn btn-success">
                  <i className="fas fa-user-plus"></i> Add
                </Button>
              </Row>
              <Row className="mr-4">
                <Button className="btn btn-danger">
                  <i className="fas fa-user-minus"></i> Delete
                </Button>
              </Row>
              <Row className="">
                <Button className="btn btn-primary">
                  <i className="fas fa-download"></i> Export
                </Button>
              </Row>
            </div>
            <DataTable
              value={dataUser}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              className="customDataTable" // Add a custom class for more styling options
              paginatorTemplate={`CurrentPageReport PrevPageLink PageLinks NextPageLink `}
            >
              <Column
                field="images"
                header="Profil"
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="_id"
                header="ID"
                style={{ width: "10%", marginRight: 10 }}
              ></Column>
              <Column
                field="username"
                header="Nama"
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="email"
                header="Email"
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="role"
                header="Akses"
                style={{ width: "25%" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataUser;
