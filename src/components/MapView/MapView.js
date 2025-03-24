import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import './MapView.css'

const MapView = () => {
  const [mapData, setMapData] = useState(null);
  const mapRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = Cookies.get("token");
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      axios.get("https://synchthreads-backend.onrender.com/api/map", { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setMapData(response.data))
        .catch(() => navigate("/"));
    }
  }, [token, navigate]);

  useEffect(() => {
    if (mapData && mapRef.current && !mapInstance.current) {
      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: [mapData.center_lng, mapData.center_lat],
          zoom: mapData.zoom,
          projection: "EPSG:4326", // Use latitude and longitude
        }),
      });
    } else if (mapInstance.current) {
      // If map already exists, update the view instead of creating a new map
      mapInstance.current.getView().setCenter([mapData.center_lng, mapData.center_lat]);
      mapInstance.current.getView().setZoom(mapData.zoom);
    }
  }, [mapData]);

  return (
    <div className="container mt-5">
      <h2>Map View</h2>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default MapView;
