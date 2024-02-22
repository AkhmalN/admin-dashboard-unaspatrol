import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";

const Algoritma = ({
  tokoData,
  latitude,
  longitude,
  radius,
  buttonClicked,
  setButtonClicked,
}) => {
  const [path, setPath] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [distances, setDistances] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const calculateDistance = (point1, point2) => {
    if (!point1 || !point2) {
      return Infinity;
    }

    const earthRadius = 6371; // Earth radius in kilometers
    const lat1 = parseFloat(point1.lat);
    const lng1 = parseFloat(point1.lng);
    const lat2 = parseFloat(point2.lat);
    const lng2 = parseFloat(point2.lng);

    if (isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) {
      return Infinity;
    }

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  };

  const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };

  const parseKoordinat = (koordinat) => {
    const [lat, lng] = koordinat
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    return { lat, lng };
  };

  useEffect(() => {
    const calculateDistances = () => {
      if (!tokoData || tokoData.length < 2) {
        return;
      }

      const n = tokoData.length;
      const distancesMatrix = [];

      for (let i = 0; i < n; i++) {
        distancesMatrix[i] = [];
        for (let j = 0; j < n; j++) {
          distancesMatrix[i][j] = calculateDistance(
            parseKoordinat(tokoData[i].koordinat),
            parseKoordinat(tokoData[j].koordinat)
          );
        }
      }

      setDistances(distancesMatrix);
    };

    const greedyTSP = () => {
      if (
        !tokoData ||
        tokoData.length < 2 ||
        !distances ||
        distances.length !== tokoData.length
      ) {
        return;
      }

      const n = tokoData.length;
      const visited = new Array(n).fill(false);
      const newPath = [];
      let currentCity = 0;
      newPath.push(currentCity);
      visited[currentCity] = true;
      let newTotalDistance = 0;

      for (let i = 1; i < n; i++) {
        let minDistance = Infinity;
        let nearestCity;

        for (let j = 0; j < n; j++) {
          if (!visited[j]) {
            const distance = distances[currentCity][j];
            if (distance < minDistance) {
              minDistance = distance;
              nearestCity = j;
            }
          }
        }

        newPath.push(nearestCity);
        visited[nearestCity] = true;
        currentCity = nearestCity;
        newTotalDistance += minDistance;
      }

      newPath.push(newPath[0]);
      newTotalDistance += distances[currentCity][newPath[0]];
      setPath(newPath);
      setTotalDistance(newTotalDistance);
    };

    calculateDistances();
    greedyTSP();
  }, [tokoData]);

  useEffect(() => {
    if (buttonClicked && latitude !== null && longitude !== null) {
      const filtered = tokoData.filter((toko) => {
        const tokoKoordinat = parseKoordinat(toko.koordinat);
        return (
          calculateDistance({ lat: latitude, lng: longitude }, tokoKoordinat) <
          radius
        );
      });

      setFilteredCities(filtered);
      setButtonClicked(false);
    }
  }, [tokoData, latitude, longitude, radius, buttonClicked]);

  const findNearestCity = () => {
    if (!filteredCities || filteredCities.length === 0) {
      return null;
    }

    let nearestCityIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < filteredCities.length; i++) {
      const distance = calculateDistance(
        { lat: latitude, lng: longitude },
        parseKoordinat(filteredCities[i].koordinat)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestCityIndex = i;
      }
    }

    return nearestCityIndex;
  };

  const nearestCityIndex = findNearestCity();

  return (
    <MapContainer
      center={
        filteredCities && filteredCities.length > 0
          ? [
              parseKoordinat(filteredCities[0].koordinat).lat,
              parseKoordinat(filteredCities[0].koordinat).lng,
            ]
          : [latitude, longitude]
      }
      zoom={13}
      style={{ height: "700px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[latitude, longitude]} />
      {filteredCities &&
        filteredCities.length > 0 &&
        filteredCities.map((toko, index) => (
          <Marker
            key={index}
            position={parseKoordinat(toko.koordinat)}
            opacity={
              nearestCityIndex !== null && nearestCityIndex === index ? 1 : 0.5
            }
          >
            <Popup>
              {`${toko.toko}`}
              <br />
              <strong>Total Distance:</strong> {totalDistance.toFixed(2)}{" "}
              kilometers
              <br />
              <strong>Distances to Other Tokos:</strong>
              <br />
              {distances[index]
                .map((distance, i) => ({ index: i, distance }))
                .sort((a, b) => a.distance - b.distance)
                .map(({ index, distance }) => (
                  <div key={index}>{`jarak ke ${
                    tokoData[index].toko
                  }: ${distance.toFixed(2)} kilometers`}</div>
                ))}
            </Popup>
            <Tooltip>{toko.toko}</Tooltip>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Algoritma;
