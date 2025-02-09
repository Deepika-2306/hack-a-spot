import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [budget, setBudget] = useState("");

  // Check if all fields are filled
  const isFormValid = date && startTime && endTime && budget;

  // Handle Search Click
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("✅ Search button clicked! Sending data...");
      onSearch(date, startTime, endTime, parseFloat(budget)); // 🛠️ Pass budget as a number
    } else {
      console.warn("⚠️ Please fill in all fields before searching!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Find a Parking Spot</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={styles.input} />

        <label style={styles.label}>Time From:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required style={styles.input} />

        <label style={styles.label}>Time To:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required style={styles.input} />

        <label style={styles.label}>Budget ($):</label>
        <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required style={styles.input} />

        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center form elements
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "80%", // Adjusts form width to ensure smaller inputs
    maxWidth: "300px", // Makes fields smaller
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    width: "100%", // Ensures inputs take up the available space in the form
    padding: "8px", // Reduces padding for a smaller size
    fontSize: "14px", // Reduces text size
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%", // Keeps button aligned with inputs
  },
};


export default SearchForm;
