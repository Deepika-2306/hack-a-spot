import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, date, startTime, endTime, budget });
  };

  return (
    <div style={styles.container}>
      <h2>Find a Parking Spot</h2>
      <form onSubmit={handleSubmit}>
        <label>Location:</label>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Time From:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />

        <label>Time To:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />

        <label>Budget ($):</label>
        <input
          type="number"
          placeholder="Enter budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "40%",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "8px",
  },
};

export default SearchForm;
