import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../App.css";
import { Button, Row } from "react-bootstrap";
import { DateFormat } from "../utils/DateFormat";
import Maps from "./Maps";
import { FaMapMarked } from "react-icons/fa";
import { getPatrol } from "../api/patrol";
import { imageUrl } from "../api/apiConfig";
import CoordinateModal from "../components/CoordinateModal";
import ImageModal from "../components/ImageModal";

function DataPatroli() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dataPatroli, setDataPatroli] = useState([]);
  const [modalCoordinate, setModalCoordinate] = useState(false);
  const [selectedLatitude, setSelectedLatitude] = useState([]);
  const [selectedLongitude, setSelectedLongitude] = useState([]);
  const [modalImage, setModalImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [error, setError] = useState("");
  const [selectedLabel, setSelectedLabel] = useState([]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };
    const intervalId = setInterval(updateTime, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const openModalCoordinate = (rowData) => {
    setSelectedLatitude(rowData.latitude);
    setSelectedLongitude(rowData.longitude);
    setSelectedLabel(rowData.location);

    setModalCoordinate(true);
  };
  const closeModalCoordinate = () => {
    setModalCoordinate(false);
  };
  const openModalImage = (rowData) => {
    const image = `http://192.168.100.123:8083/patroli/${rowData.image.replace(
      "public\\patroli\\",
      ""
    )}`;

    setSelectedImage(image);
    setModalImage(true);
  };
  const closeModalImage = () => {
    setModalImage(false);
  };

  const getPatrolData = async () => {
    try {
      const response = await getPatrol();
      setDataPatroli(response);
      console.log(response);
    } catch (error) {
      setError(error);
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
                <Row>
                  <h5 className="w-full my-2 font-weight-bold">
                    {DateFormat(new Date())}
                  </h5>
                </Row>
                <Row>
                  <h5 className="my-2">{currentTime.toLocaleTimeString()}</h5>
                </Row>
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
          <CoordinateModal
            show={modalCoordinate}
            onHide={closeModalCoordinate}
            latitude={selectedLatitude}
            longitude={selectedLongitude}
            location={selectedLabel}
          />
          <ImageModal
            show={modalImage}
            onHide={closeModalImage}
            image={selectedImage}
          />
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
              value={dataPatroli}
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
                style={{ width: "15%" }}
                body={(rowData) => {
                  let bgColor;
                  switch (rowData.status) {
                    case "Aman":
                      bgColor = "green";
                      break;
                    case "Demonstrasi":
                      bgColor = "blue";
                      break;
                    case "Kebakaran":
                      bgColor = "red";
                      break;
                    case "Pencurian":
                      bgColor = "orange";
                      break;
                    default:
                      bgColor = "black";
                      break;
                  }
                  return (
                    <div
                      style={{
                        backgroundColor: bgColor,
                        textAlign: "center",
                        borderRadius: 10,
                        paddingLeft: 5,
                        paddingRight: 5,
                        paddingTop: 2,
                      }}
                    >
                      <p style={{ color: "#FFF", marginTop: 5 }}>
                        {rowData.status}
                      </p>
                    </div>
                  );
                }}
              ></Column>
              <Column
                field="coordinat" // assuming status is a field in your data
                header="coordinat"
                alignHeader={"center"}
                body={(rowData) => (
                  <span
                    onClick={() => openModalCoordinate(rowData)}
                    style={{ padding: 5 }}
                  >
                    <FaMapMarked size={40} color="#D24545" />
                  </span>
                )}
                style={{ width: "20%", cursor: "pointer", textAlign: "center" }}
              />
              <Column
                field="Tanggal"
                header="Tanggal"
                body={(rowData) => {
                  const createdAt = DateFormat(rowData.createdAt);
                  return createdAt;
                }}
                style={{ width: "25%" }}
                sortable
              ></Column>
              <Column
                field="image"
                header="Dokumentasi"
                body={(rowData) => (
                  <img
                    onClick={() => openModalImage(rowData)}
                    key={rowData._id}
                    src={`http://192.168.100.123:8083/patroli/${rowData.image.replace(
                      "public\\patroli\\",
                      ""
                    )}`}
                    alt={`Dokumentasi Absen ${rowData.image}`}
                    style={{
                      width: 100,
                      height: 60,
                    }}
                    onError={(e) => {
                      console.error("Error loading image:", e);
                    }}
                  />
                )}
                style={{
                  width: "10%",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataPatroli;
