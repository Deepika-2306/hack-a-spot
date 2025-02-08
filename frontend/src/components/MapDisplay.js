import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom navigator icon
const navigatorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535239.png", // Blue navigator icon
  iconSize: [30, 30], 
  iconAnchor: [15, 15], 
  popupAnchor: [0, -15]
});

const MapDisplay = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const defaultCenter = [35.7796, -78.6382]; // Default: Raleigh, NC

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);

  return (
    <MapContainer center={currentLocation || defaultCenter} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {currentLocation && (
        <Marker position={currentLocation} icon={navigatorIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapDisplay;
