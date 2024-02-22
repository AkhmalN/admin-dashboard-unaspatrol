import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const ModalAdd = ({ openModal, handleCloseModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [role, setRole] = useState("");
  const [nohp, setNohp] = useState("");

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRole((prevSelectedRoles) => [...prevSelectedRoles, value]);
    } else {
      setRole((prevSelectedRoles) =>
        prevSelectedRoles.filter((role) => role !== value)
      );
    }
  };

  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Role:", role);
  console.log("No. HP:", nohp);
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={openModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Menambah User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Username : </Form.Label>
            <Form.Control
              type="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email : </Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password : </Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPasword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role : </Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option disabled>Pilih Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Chief">Chief</option>
              <option value="Danru">Danru</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>No HP : </Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setNohp(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
