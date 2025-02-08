import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapDisplay = ({ location }) => {
  const defaultPosition = [35.7796, -78.6382]; // Default: Raleigh, NC

  return (
    <div style={styles.mapContainer}>
      <MapContainer center={defaultPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && (
          <Marker position={defaultPosition}>
            <Popup>{location}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

const styles = {
  mapContainer: {
    width: "60%",
    height: "100vh",
  },
};

export default MapDisplay;
