import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapDisplay = ({ userCoords, parkingLots, selectedLot }) => {
  const [route, setRoute] = useState(null);
  const defaultCenter = userCoords ? [userCoords.lat, userCoords.lng] : [35.7796, -78.6382];

  // Fetch route from OSRM when a parking lot is selected
  useEffect(() => {
    if (userCoords && selectedLot) {
      const url = `https://router.project-osrm.org/route/v1/driving/${userCoords.lng},${userCoords.lat};${selectedLot.longitude},${selectedLot.latitude}?overview=full&geometries=geojson`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.routes.length > 0) {
            setRoute(data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng])); // Convert to Leaflet format
          } else {
            console.error("No route found.");
          }
        })
        .catch((err) => console.error("Error fetching route:", err));
    }
  }, [userCoords, selectedLot]);

  return (
    <MapContainer center={defaultCenter} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Show user's current location */}
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

      {/* Draw the actual road route from user to selected parking lot */}
      {route && <Polyline positions={route} color="blue" weight={5} />}
    </MapContainer>
  );
};

export default MapDisplay;
