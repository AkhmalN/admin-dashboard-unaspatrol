import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import "../App.css";
import { Button, Col, Row } from "react-bootstrap";
function LogPatroli() {
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dataPatroli, setDataPatroli] = useState([]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };
    const intervalId = setInterval(updateTime, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getPatrolData = async () => {
    try {
      const response = await axios.get(
        // "http://192.168.192.180:8083/api/patrol/"
        "http://192.168.1.40:8083/api/v1/patrol/"
      );
      console.log(response.data);
      setDataPatroli(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  useEffect(() => {
    getPatrolData();
  }, []);
  return (
    <div id="wrapper">
      <Sidebar />
      <div className="admin-bg container-fluid p-5 w-100">
        <div className="card shadow mb-4">
          {/* Card Header - Dropdown */}
          <div className="card-header py-3 d-flex  justify-content-between">
            <div className="">
              <h5 className="m-0 font-weight-bold text-primary">
                Data Patroli
              </h5>
              <Row>
                <Col>
                  <h5 className="my-2 font-weight-bold">
                    {new Date().toLocaleDateString()}
                  </h5>
                </Col>
                <Col>
                  <h5 className="my-2">{currentTime.toLocaleTimeString()}</h5>
                </Col>
              </Row>
            </div>
            <form className="d-sm-inline-block form-inline mr-0 mw-100 navbar-search">
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
            <div className="card-body d-flex justify-content-end">
              <Row className="">
                <Button className="btn btn-primary">
                  <i className="fas fa-download"></i> Export
                </Button>
              </Row>
            </div>
            <DataTable
              value={dataPatroli}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              className="customDataTable"
              paginatorTemplate={`CurrentPageReport PrevPageLink PageLinks NextPageLink `}
            >
              <Column field="username" header="Petugas"></Column>
              <Column field="location" header="Lokasi"></Column>
              <Column field="status" header="status"></Column>
              <Column
                field="location"
                header="Koordinat"
                body={(rowData) => `${rowData.latitude} , ${rowData.longitude}`}
              ></Column>
              <Column field="notes" header="catatan"></Column>
              <Column
                field="image"
                header="Dokumentasi"
                body={(rowData) => <img src={rowData.image} />}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogPatroli;
