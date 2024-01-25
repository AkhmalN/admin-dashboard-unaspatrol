import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Algoritma from "./Algoritma";

const Map = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(10);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [tokoData, setTokoData] = useState([]);

  const getCitiesData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/burung");
      setTokoData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCitiesData();
  }, []);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser");
      }
    };

    getLocation();
  }, []);

  const handleRadiusChange = (event) => {
    setRadius(parseInt(event.target.value));
  };

  const handleSearchButtonClick = () => {
    setButtonClicked(true);
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex ">
        <div style={{ padding: 20 }}>
          <h4>
            Cari Toko Terdekat dengan Posisi saat ini ({latitude},{longitude})
          </h4>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="btn btn-primary mx-3"
              onClick={handleSearchButtonClick}
            >
              Cari Lokasi terdekat
            </button>
            <label>
              Radius max :
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={radius}
                onChange={handleRadiusChange}
                className="mx-2"
                style={{ width: "300px" }}
              />
              {radius} km
            </label>
          </div>
          {latitude !== null && longitude !== null ? (
            <div className="mx-3">
              <Algoritma
                tokoData={tokoData}
                latitude={latitude}
                longitude={longitude}
                radius={radius}
                buttonClicked={buttonClicked}
                setButtonClicked={setButtonClicked}
              />
            </div>
          ) : (
            <p>Loading geolocation data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
