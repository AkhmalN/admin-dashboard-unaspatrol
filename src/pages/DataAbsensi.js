import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../App.css";
import { Button, Row } from "react-bootstrap";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Modal } from "react-bootstrap";
import { FaMarker } from "react-icons/fa";

function DataAbsensi() {
  const [dataAbsensi, setDataAbsensi] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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

  const customIcon = new L.Icon({
    iconUrl: FaMarker, // Provide the path to your custom icon image
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Adjust the anchor point of the icon
    popupAnchor: [0, -32], // Adjust the anchor point for the popup
  });

  const getPatrolData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.123:8083/api/v1/absensi/"
      );
      console.log(response.data);
      setDataAbsensi(response.data);
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
            <h5 className="m-0 font-weight-bold text-primary">Data Absensi</h5>
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
            <Modal.Title>Oke</Modal.Title>
            <Modal.Body>
              <MapContainer
                center={[-6.280589269319897, 106.8396220430963]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "400px", width: "100%" }}
              ></MapContainer>
            </Modal.Body>
          </Modal>

          {/* Card Body */}
          <div className="card-body">
            <div classNam e="card-body d-flex justify-content-end"></div>
            <DataTable
              value={dataAbsensi}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              className="customDataTable"
              paginatorTemplate={`CurrentPageReport PrevPageLink PageLinks NextPageLink `}
            >
              <Column
                field="username"
                header="username"
                style={{ width: "20%", textAlign: "center" }}
                alignHeader={"center"}
              ></Column>
              <Column
                field="createdAt"
                header="Tanggal"
                body={(rowData) => {
                  const dateObject = new Date(rowData.createdAt);
                  const tanggal = dateObject.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return <p>{tanggal}</p>;
                }}
                style={{ width: "20%", textAlign: "center" }}
                alignHeader={"center"}
              ></Column>
              <Column
                field="createdAt"
                header="Tanggal"
                body={(rowData) => {
                  const dateObject = new Date(rowData.createdAt);

                  const waktu = dateObject.toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: false, // Use 24-hour format
                    timeZoneName: "short",
                  });

                  return <p>{waktu}</p>;
                }}
                style={{ width: "20%", textAlign: "center" }}
                alignHeader={"center"}
              ></Column>

              <Column
                field="latitude"
                header="latitude"
                style={{ width: "12%", textAlign: "center" }}
                alignHeader={"center"}
              ></Column>
              <Column
                field="longitude"
                header="longitude"
                style={{ width: "12%", textAlign: "center" }}
                alignHeader={"center"}
              ></Column>
              <Column
                field="latitude" // assuming status is a field in your data
                header="Coordinate"
                body={(rowData) => (
                  <span
                    onClick={() => openModalCoordinate(rowData)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    <p style={{ marginRight: 5 }}>{rowData.latitude}</p>
                    <p>{rowData.longitude}</p>
                  </span>
                )}
                style={{ width: "25%", textAlign: "center" }}
                alignHeader={"center"}
              />
              <Column
                field="image"
                header="Dokumentasi"
                body={(rowData) => (
                  <img
                    key={rowData._id}
                    src={`http://192.168.100.123:8083/uploads/${rowData.image.replace(
                      "public\\uploads\\",
                      ""
                    )}`}
                    alt={`Dokumentasi Absen ${rowData.image}`}
                    style={{ width: 60, height: 60 }}
                    onError={(e) => {
                      console.error("Error loading image:", e);
                    }}
                  />
                )}
                style={{ width: "25%", textAlign: "center" }}
                alignHeader={"center"}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataAbsensi;
