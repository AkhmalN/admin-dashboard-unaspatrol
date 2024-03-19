import React from "react";
import { Modal } from "react-bootstrap";
import Maps from "../pages/Maps";

const CoordinateModal = ({ show, onHide, latitude, longitude, location }) => {
  return (
    <Modal show={show} onHide={onHide} animation="slide">
      <Modal.Header closeButton>Pos : {location}</Modal.Header>
      <Modal.Body>
        <Maps
          latitude={latitude}
          longitude={longitude}
          location={location}
          height={"400px"}
          width={"100%"}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CoordinateModal;
