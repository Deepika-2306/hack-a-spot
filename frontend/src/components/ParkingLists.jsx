import React from "react";

const ParkingLists = ({ lots, onLotClick, goBack }) => {
  // Sort by shortest road distance
  const sortedLots = [...lots].sort((a, b) => (a.roadDistance ?? Infinity) - (b.roadDistance ?? Infinity));

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={goBack}>← Back</button> {/* Back Button */}
      <h3>Available Parking Lots (Sorted by Shortest Distance & Within Budget)</h3>
      {lots.length === 0 ? (
        <p style={styles.noResults}>🚫 No parking lots found within your budget.</p>
      ) : (
        <ul>
          {sortedLots.map((lot) => (
            <li key={lot.id} style={styles.listItem} onClick={() => onLotClick(lot)}>
              <strong>{lot.name}</strong>
              <p>Floors: {lot.floors}</p>
              <p>Cost per Hour: ${lot.cost_per_hour}</p>
              <p><strong>Road Distance:</strong> {lot.roadDistance?.toFixed(2)} km</p>
              <p style={styles.cost}><strong>Estimated Total Cost:</strong> ${lot.estimatedCost?.toFixed(2)}</p> {/* 🔥 Display total cost */}
            </li>
          ))}
        </ul>
      )}
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
  cost: {
    color: "#28a745",
    fontWeight: "bold",
  },
  noResults: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#dc3545",
  },
};

export default ParkingLists;
