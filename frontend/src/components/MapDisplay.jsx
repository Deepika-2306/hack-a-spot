import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapDisplay = ({ userCoords, parkingLots, selectedLot }) => {
  const defaultCenter = userCoords ? [userCoords.lat, userCoords.lng] : [35.7796, -78.6382];

  return (
    <MapContainer center={defaultCenter} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Show user's location */}
      {userCoords && (
        <Marker
          position={[userCoords.lat, userCoords.lng]}
          icon={L.icon({
            iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>You are here!</Popup>
        </Marker>
      )}

      {/* Show parking lots */}
      {parkingLots.map((lot) => (
        <Marker
          key={lot.id}
          position={[lot.latitude, lot.longitude]}
          icon={L.icon({
            iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>
            <strong>{lot.name}</strong>
          </Popup>
        </Marker>
      ))}

      {/* Show route from user to selected lot */}
      {selectedLot && userCoords && (
        <Polyline
          positions={[
            [userCoords.lat, userCoords.lng],
            [selectedLot.latitude, selectedLot.longitude],
          ]}
          color="blue"
        />
      )}
    </MapContainer>
  );
};

export default MapDisplay;
