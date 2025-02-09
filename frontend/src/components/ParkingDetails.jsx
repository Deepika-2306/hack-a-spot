import React from "react";

const ParkingDetails = ({ lot, goBack }) => {
  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={goBack}>← Back</button> {/* ✅ Added Back Button */}
      <h3>{lot.name}</h3>
      <p><strong>Floors:</strong> {lot.floors}</p>
      <p><strong>Cost:</strong> ${lot.cost_per_hour} per hour</p>
      <p><strong>Total Slots:</strong> {lot.total_slots}</p>
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
};

export default ParkingDetails;
