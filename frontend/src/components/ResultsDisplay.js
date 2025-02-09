import React from "react";

const ResultsDisplay = () => {
  // Hardcoded parking details
  const parkingData = [
    {
      name: "Downtown Plaza Parking",
      address: "123 Main St, Raleigh, NC",
      totalSpots: 50,
      availableSpots: 12,
      price: "$5/hr",
    },
    {
      name: "City Center Garage",
      address: "456 Market St, Raleigh, NC",
      totalSpots: 30,
      availableSpots: 8,
      price: "$7/hr",
    },
    {
      name: "Eastside Parking Lot",
      address: "789 East Ave, Raleigh, NC",
      totalSpots: 40,
      availableSpots: 20,
      price: "$4/hr",
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Search Results</h2>
      
      <div style={styles.blocksContainer}>
        {parkingData.map((lot, index) => (
          <div key={index} style={styles.block}>
            <h3>{lot.name}</h3>
            <p><strong>Address:</strong> {lot.address}</p>
            <p><strong>Total Spots:</strong> {lot.totalSpots}</p>
            <p><strong>Available Spots:</strong> {lot.availableSpots}</p>
            <p><strong>Price:</strong> {lot.price}</p>
            <button style={styles.button}>Reserve</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "450px",
    margin: "auto",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "8px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "15px",
  },
  blocksContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  block: {
    padding: "15px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  button: {
    marginTop: "10px",
    padding: "8px 15px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ResultsDisplay;
