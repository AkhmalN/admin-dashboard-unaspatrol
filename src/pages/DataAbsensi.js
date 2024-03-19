import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../App.css";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { DateFormat } from "../utils/DateFormat";
import Maps from "./Maps";
import { Row, Button } from "react-bootstrap";
import { FaMapMarked } from "react-icons/fa";
function DataAbsensi() {
  const [dataAbsensi, setDataAbsensi] = useState([]);
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

  const getAbsensiData = async () => {
    try {
      axios
        .get("https://server-smartpatrol.vercel.app/api/v1/absensi/")
        .then((response) => {
          setDataAbsensi(response.data.absen);
        })
        .catch((error) => {
          setError(error);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getAbsensiData();
  }, []);

  return (
    <div id="wrapper">
      <Sidebar />
      <div className="admin-bg container-fluid p-5 w-100">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex  justify-content-between">
            <h5 className="m-0 font-weight-bold text-primary">Data Absensi</h5>
            <p>{error}</p>
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
              <Row className="mr-4">
                <Button className="btn btn-danger">
                  <span>Hapus</span> <i className="fas fa-user-minus"></i>
                </Button>
              </Row>
              <Row className="">
                <Button className="btn btn-primary">
                  <span>Cetak</span> <i className="fas fa-download"></i>
                </Button>
              </Row>
            </div>
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
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="createdAt"
                header="Tanggal"
                body={(rowData) => {
                  const dateObject = DateFormat(rowData.createdAt);

                  return <p>{dateObject}</p>;
                }}
                style={{ width: "20%" }}
                sortable
              ></Column>

              <Column
                field="latitude"
                header="latitude"
                style={{ width: "12%" }}
              ></Column>
              <Column
                field="longitude"
                header="longitude"
                style={{ width: "12%" }}
              ></Column>
              <Column
                field="coordinat" // assuming status is a field in your data
                header="coordinat"
                alignHeader={"center"}
                body={(rowData) => (
                  <span onClick={() => openModalCoordinate(rowData)}>
                    <FaMapMarked size={40} color="#D24545" />
                  </span>
                )}
                style={{ width: "30%", cursor: "pointer", textAlign: "center" }}
              />
              <Column
                field="image"
                header="Dokumentasi"
                body={(rowData) => (
                  <img
                    key={rowData._id}
                    src={`http://192.168.162.180:8083/absensi/${rowData.image.replace(
                      "public\\absensi\\",
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

export default DataAbsensi;
