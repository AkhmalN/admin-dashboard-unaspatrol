import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

function Patroli() {
  const [dataPatroli, setDataPatroli] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let [color] = useState("#ffffff");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#74E291",
  };

  const getPatroliData = async () => {
    try {
      setLoading(true);
      axios
        .get("https://server-smartpatrol.vercel.app/api/v1/patrol/")
        .then((response) => {
          setDataPatroli(response.data.patrols);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatroliData();
  }, []);
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-success shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                Data Patroli
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
                        dataPatroli.length
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-user-shield fa-2x text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patroli;
