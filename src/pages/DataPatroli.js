import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import "../App.css";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function DataPatroli() {
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dataPatroli, setDataPatroli] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [modalCoordinates, setModalCoordinates] = useState([
  //   "unknow place",
  //   0,
  //   0,
  // ]);

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
        "http://192.168.192.180:8083/api/patrol/"
        // "http://192.168.100.123:8083/api/patrol/"
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

  // const handleOpenModal = (coordinates) => {
  //   setModalCoordinates(coordinates);
  //   setShowModal(true);
  // };
  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };
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
              {/* <Column
                field="image"
                header="Dokumentasi"
                body={(dataPatroli) => (
                  <>
                    {dataPatroli.image && dataPatroli.images.length > 0 ? (
                      dataPatroli.image.map((images, index) => (
                        <img
                          key={index}
                          src={images}
                          alt={`Image ${index}`}
                          style={{ width: "50px", height: "50px" }}
                        />
                      ))
                    ) : (
                      <span>No images</span>
                    )}
                  </>
                )}
              ></Column> */}
              <Column field="notes" header="catatan"></Column>
              <Column
                field="image"
                header="Dokumentasi"
                body={(rowData) => <img src={rowData.image} />}
              ></Column>
              <Column
                field="status" // assuming status is a field in your data
                header="Status"
                body={(rowData) => (
                  <span>
                    Latitude: {rowData.latitude}, Longitude: {rowData.longitude}
                    , Status: {rowData.status}
                  </span>
                )}
              />
            </DataTable>
          </div>
          {/* <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>
                <Row>
                  <Col className="mx-2">
                    <span className="fs-6">Label : {modalCoordinates[0]}</span>
                  </Col>
                  <Col className="mx-2">
                    <span className="fs-6">Lat : {modalCoordinates[1]}</span>
                  </Col>
                  <Col className="mx-2">
                    <span className="fs-6">Lng : {modalCoordinates[2]}</span>
                  </Col>
                </Row>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <MapContainer
                center={[modalCoordinates[1], modalCoordinates[2]]}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[modalCoordinates[1], modalCoordinates[2]]}>
                  {console.log(modalCoordinates)}
                  <Popup>{modalCoordinates[0]}</Popup>
                </Marker>
              </MapContainer>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal> */}
        </div>
      </div>
    </div>
  );
}

export default DataPatroli;
