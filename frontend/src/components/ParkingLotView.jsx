import React from "react";

const ParkingLotView = ({ lot, goBack }) => {
  const totalSlots = lot.total_slots;
  const occupiedSlots = Math.floor(totalSlots * 0.7); // Assume 70% occupied
  const availableSlots = totalSlots - occupiedSlots;

  // Generate an array with randomly placed available spots
  let slots = Array(totalSlots).fill("occupied");
  let availableIndices = new Set();

  while (availableIndices.size < availableSlots) {
    availableIndices.add(Math.floor(Math.random() * totalSlots)); // Randomly mark available slots
  }

  availableIndices.forEach((index) => (slots[index] = "available"));

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={goBack}>← Back</button>
      <h2>{lot.name} - Parking Slots</h2>

      {/* Entrance indicator positioned at the top */}
      <div style={styles.entranceArrow}>⬇ Entrance</div>

      <div style={styles.parkingGrid}>
        {slots.map((status, index) => (
          <div
            key={index}
            style={{
              ...styles.slot,
              backgroundColor: status === "occupied" ? "grey" : "white",
              border: status === "occupied" ? "none" : "1px solid grey",
            }}
          >
            {status === "occupied" ? "🚗" : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "calc(100vh - 60px)", // Full height below header
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
  backButton: {
    marginBottom: "10px",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  entranceArrow: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
    marginBottom: "10px",
    gridColumnStart: 2, // Aligns entrance in the gap between column 1 and 2
  },
  parkingGrid: {
    display: "grid",
    gridTemplateColumns: "100px 60px 100px 60px 100px 60px 100px", // 🔥 Ensures proper column spacing
    columnGap: "40px", // 🔥 Increased spacing between columns
    rowGap: "15px", // Uniform row spacing
    marginTop: "10px",
  },
  slot: {
    width: "80px", // 🔥 Horizontal slot shape
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
  },
};

export default ParkingLotView;
