import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import "../App.css";
import { Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Maps from "./Maps";

function DataAktivitas() {
  const [dataAktivitas, setDataAktivitas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [selectedLatitude, setSelectedLatitude] = useState([]);
  const [selectedLongitude, setSelectedLongitude] = useState([]);

  const openModalCoordinate = (rowData) => {
    setSelectedLatitude(rowData.latitude);
    setSelectedLongitude(rowData.longitude);
    setOpenModal(true);
  };
  const closeModalCoordinate = () => {
    setOpenModal(false);
  };

  const getAktivitasData = async () => {
    try {
      axios
        .get("https://server-smartpatrol.vercel.app/api/v1/aktivitas/")
        .then((response) => {
          setDataAktivitas(response.data.aktivitas);
        })
        .catch((error) => {
          setError(error);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getAktivitasData();
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
                Data Aktivitas
              </h5>
              <p>{error}</p>
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
          <Modal
            show={openModal}
            onHide={closeModalCoordinate}
            animation="slide"
          >
            <Modal.Header closeButton></Modal.Header>

            <Modal.Body>
              <Maps latitude={selectedLatitude} longitude={selectedLongitude} />
            </Modal.Body>
          </Modal>
          {/* Card Body */}
          <div className="card-body">
            <div className="card-body d-flex justify-content-end">
              <Row className="">
                <Button className="btn btn-success">
                  <i className="fas fa-download"></i> Export
                </Button>
              </Row>
            </div>
            <DataTable
              value={dataAktivitas}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              className="customDataTable"
              paginatorTemplate={`CurrentPageReport PrevPageLink PageLinks NextPageLink `}
            >
              <Column
                field="username"
                header="Petugas"
                style={{ width: "15%" }}
              ></Column>
              <Column
                field="location"
                header="Lokasi Pos"
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="status"
                header="status"
                style={{ width: "10%" }}
              ></Column>
              <Column
                field="notes"
                header="catatan"
                style={{ width: "15%" }}
              ></Column>
              <Column
                field="coordinat" // assuming status is a field in your data
                header="coordinat"
                body={(rowData) => (
                  <span onClick={() => openModalCoordinate(rowData)}>
                    {rowData.latitude}, {rowData.longitude}
                  </span>
                )}
                style={{ width: "25%" }}
              />
              <Column
                field="Status"
                header="status"
                body={(rowData) => <span>{rowData.status}</span>}
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="image"
                header="Dokumentasi"
                body={(rowData) => (
                  <img
                    key={rowData._id}
                    src={`http://192.168.100.123:8083/patroli/${rowData.image.replace(
                      "public\\patroli\\",
                      ""
                    )}`}
                    alt={`Dokumentasi Absen ${rowData.image}`}
                    style={{
                      width: 60,
                      height: 60,
                    }}
                    onError={(e) => {
                      console.error("Error loading image:", e);
                    }}
                  />
                )}
                style={{ width: "25%" }}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataAktivitas;
