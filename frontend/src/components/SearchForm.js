import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import ResultsDisplay from "./ResultsDisplay"; // Import new component

const SearchForm = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [budget, setBudget] = useState("");
  const [autoDetect, setAutoDetect] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const autocompleteRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔍 Search Clicked! Showing Results...");

    const searchData = { location, date, startTime, endTime, budget, coords: currentCoords };
    
    setShowResults(true); // Switch to results view
    onSearch(searchData); // Pass search data to parent
  };

  return (
    <div style={styles.container}>
      {showResults ? (
        <ResultsDisplay searchData={{ location, date, startTime, endTime, budget }} />
      ) : (
        <>
          <h2 style={styles.heading}>Find a Parking Spot</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Location:</label>
            <div style={styles.locationWrapper}>
              <input
                id="location-input"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                disabled={autoDetect}
                style={styles.input}
              />
              <input
                type="checkbox"
                checked={autoDetect}
                onChange={() => {
                  setAutoDetect(!autoDetect);
                }}
              />
              <span>Auto-detect</span>
            </div>

            <label style={styles.label}>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={styles.input} />

            <label style={styles.label}>Time From:</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required style={styles.input} />

            <label style={styles.label}>Time To:</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required style={styles.input} />

            <label style={styles.label}>Budget ($):</label>
            <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} style={styles.input} />

            <button type="submit" style={styles.button}>Search</button>
          </form>
        </>
      )}
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
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default SearchForm;
