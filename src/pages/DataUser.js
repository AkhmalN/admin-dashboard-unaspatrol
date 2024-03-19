import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Row } from "react-bootstrap";
import { getUsers } from "../api/users";
import { DateFormat } from "../utils/DateFormat";
import { ModalAdd } from "../controller/addUser";
import CheckboxColumn from "../components/CheckBoxColumn";
import { ModalDetail } from "../controller/detailUser";

function DataUser() {
  const [dataUser, setDataUser] = useState([]);
  const [userDetail, setUserDetail] = useState("");
  const [error, setError] = useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(false);

  const getUserData = async () => {
    try {
      const response = await getUsers();
      setDataUser(response);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleOpenModal = () => {
    setModalAdd(!modalAdd);
  };
  const handleCloseModal = () => {
    setModalAdd(false);
  };

  const handleCloseDetail = () => {
    setModalDetail(false);
  };
  const handleDetailClick = (event) => {
    setUserDetail(event.data._id);
    setModalDetail(!modalDetail);
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div className="admin-bg container-fluid p-5 w-100">
        <div className="card shadow mb-4">
          {/* Card Header - Dropdown */}
          <div className="card-header py-3 d-flex  justify-content-between">
            <div className="">
              <h5 className="m-0 font-weight-bold text-primary">Data User</h5>
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

          {/* MODAL */}
          <ModalAdd openModal={modalAdd} handleCloseModal={handleCloseModal} />
          {userDetail && (
            <ModalDetail
              openModal={modalDetail}
              handleCloseDetail={handleCloseDetail}
              userDetail={userDetail}
            />
          )}

          {/* Card Body */}
          <div className="card-body">
            <div className="card-body d-flex justify-content-end">
              <Row className="mr-4">
                <Button
                  className="btn btn-warning"
                  onClick={() => setSelectedDetail(!selectedDetail)}
                >
                  <span>Detail</span> <i className="fas fa-eye"></i>
                </Button>
              </Row>
              <Row className="mr-4">
                <Button className="btn btn-success" onClick={handleOpenModal}>
                  <span>Tambah</span> <i className="fas fa-user-plus"></i>
                </Button>
              </Row>
              <Row className="mr-4">
                <Button
                  className="btn btn-danger"
                  onClick={() => setSelectedDelete(!selectedDelete)}
                >
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
              value={dataUser}
              selection={selectedRows}
              onSelectionChange={(e) => setSelectedRows(e.value)}
              sortMode="multiple"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 20, 50]}
              tableStyle={{ minWidth: "50rem" }}
              className="customDataTable" // Add a custom class for more styling options
              paginatorTemplate={`CurrentPageReport PrevPageLink PageLinks NextPageLink `}
              resizableColumns
              reorderableColumns
              columnResizeMode="expand"
              style={{ width: "calc(100% - 10px)" }}
              onRowClick={handleDetailClick}
            >
              {selectedDelete && (
                <Column
                  headerStyle={{ width: "3em" }}
                  body={(rowData) => (
                    <CheckboxColumn
                      rowData={rowData}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                    />
                  )}
                />
              )}
              <Column field="username" header="Nama" />
              <Column field="email" header="Email" />
              <Column field="password" header="Password" />
              <Column field="nik" header="NIK" sortable />
              <Column field="unit_kerja" header="Unit Kerja" />
              <Column
                field="updatedAt"
                body={(rowData) => {
                  const createdAt = DateFormat(rowData.updatedAt);
                  return createdAt;
                }}
                header="Diupdate pada"
                sortable
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataUser;
