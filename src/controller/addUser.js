import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../App.css";

export const ModalAdd = ({ openModal, handleCloseModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [role, setRole] = useState("");
  const [nohp, setNohp] = useState("");
  const [nik, setNik] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [domisili, setDomisili] = useState("");
  const [unitKerja, setUnitKerja] = useState("");

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={openModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Form Tambah User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Username : </Form.Label>
                <Form.Control
                  type="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Email : </Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Password : </Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPasword(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Unit Kerja : </Form.Label>
                <Form.Select
                  value={unitKerja}
                  onChange={(e) => setUnitKerja(e.target.value)}
                >
                  <option disabled>Pilih Unit Bekerja</option>
                  <option value="Unas Pejanten">Unas Pejanten</option>
                  <option value="Unas Ragunan">Unas Ragunan</option>
                  <option value="Unas Bambu Kuning">Unas Bambu Kuning</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>NIK : </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setNik(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Tempat Lahir : </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setTempatLahir(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Tanggal Lahir : </Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setTanggalLahir(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Role : </Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option disabled>Pilih Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Chief">Chief</option>
                  <option value="Danru">Danru</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>No HP : </Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setNohp(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Domisili : </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setDomisili(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Simpan
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
