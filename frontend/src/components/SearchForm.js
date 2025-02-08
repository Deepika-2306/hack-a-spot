import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const SearchForm = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [budget, setBudget] = useState("");
  const [autoDetect, setAutoDetect] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  const autocompleteRef = useRef(null);

  // Load Google Places API Autocomplete
  useEffect(() => {
    if (window.google) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        document.getElementById("location-input"),
        { types: ["geocode"], componentRestrictions: { country: "us" } }
      );
      autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
    }
  }, []);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.formatted_address) {
      setLocation(place.formatted_address);
    }
  };

  // Handle auto-detect location
  const handleAutoDetect = () => {
    if (autoDetect) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.results.length > 0) {
                setLocation(data.results[0].formatted_address);
              }
            });
        },
        (error) => console.error(error)
      );
    } else {
      setCurrentCoords(null);
      setLocation("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, date, startTime, endTime, budget, coords: currentCoords });
  };

  return (
    <div style={styles.container}>
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
              handleAutoDetect();
            }}
          />
          <span>Auto-detect</span>
          {currentCoords && (
            <a
              href={`https://www.google.com/maps?q=${currentCoords.lat},${currentCoords.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.mapLink}
            >
              <FaMapMarkerAlt size={20} color="red" />
            </a>
          )}
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
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
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
  locationWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  mapLink: {
    textDecoration: "none",
  },
};

export default SearchForm;
