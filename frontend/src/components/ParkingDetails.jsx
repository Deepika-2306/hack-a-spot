import React from "react";

const ParkingDetails = ({ lot, goBack, showSpot }) => {
  // Calculate estimated travel time (3 minutes per km)
  const travelTime = Math.round(lot.roadDistance * 3); // 🚗 Rough estimate in minutes

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={goBack}>← Back</button>
      <h3>{lot.name}</h3>
      <p><strong>Cost per Hour:</strong> ${lot.cost_per_hour}</p>
      <p><strong>Distance:</strong> {lot.roadDistance?.toFixed(2)} km</p>
      <p><strong>Estimated Total Cost:</strong> ${lot.estimatedCost?.toFixed(2)}</p> {/* 💰 Display estimated cost */}
      <p><strong>Approx. Travel Time:</strong> {travelTime} mins</p> {/* ⏳ Rough time estimate */}
      <p><strong>Total Slots:</strong> {lot.total_slots}</p>
      <p><strong>Available Slots:</strong> {lot.available_slots}</p>

      <button style={styles.spotButton} onClick={() => showSpot(lot)}>Show Spot</button> {/* 🔥 Show Spot Button */}
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  backButton: {
    marginBottom: "10px",
    padding: "8px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  spotButton: {
    marginTop: "10px",
    padding: "10px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ParkingDetails;
