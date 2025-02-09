import React from "react";

const ParkingLists = ({ lots, onLotClick, goBack }) => {
  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={goBack}>← Back</button> {/* ✅ Added Back Button */}
      <h3>Available Parking Lots</h3>
      <ul>
        {lots.map((lot) => (
          <li key={lot.id} style={styles.listItem} onClick={() => onLotClick(lot)}>
            <strong>{lot.name}</strong>
            <p>Floors: {lot.floors}</p>
            <p>Cost: ${lot.cost_per_hour} per hour</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    background: "#f8f9fa",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
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
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    marginBottom: "5px",
    background: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ParkingLists;
