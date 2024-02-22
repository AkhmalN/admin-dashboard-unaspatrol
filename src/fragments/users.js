import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

function Users() {
  const [dataUsers, setDataUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let [color] = useState("#ffffff");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#F28585",
  };

  const getUserData = async () => {
    try {
      setLoading(true);
      axios
        .get("https://server-smartpatrol.vercel.app/api/v1/users/")
        .then((response) => {
          setDataUsers(response.data.users);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-danger shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Data Users
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                <div className="row no-gutters align-items-center">
                  <div className="col-auto">
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                      {loading ? (
                        <ClipLoader
                          color={color}
                          loading={loading}
                          cssOverride={override}
                          size={50}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        dataUsers.length
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-users fa-2x text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
