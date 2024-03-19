import React from "react";
import { Modal } from "react-bootstrap";
import { imageUrl } from "../api/apiConfig";

const ImageModal = ({ show, onHide, image }) => {
  return (
    <Modal show={show} onHide={onHide} animation="slide">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={image}
          alt={`Dokumentasi Patroli`}
          style={{
            width: 300,
            height: 400,
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
