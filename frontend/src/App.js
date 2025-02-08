import React, { useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import MapDisplay from "./components/MapDisplay";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const [searchData, setSearchData] = useState(null);

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <SearchForm onSearch={setSearchData} />
        </div>
        <div style={styles.mapContainer}>
          <MapDisplay location={searchData?.location} coords={searchData?.coords} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "90vh",
    gap: "10px", // Adds space between form and map
    padding: "10px", // Adds some padding
  },
  formContainer: {
    flex: 1, // Takes 1/3 of the available space
    maxWidth: "40%", // Restricts form width
  },
  mapContainer: {
    flex: 2, // Takes 2/3 of the available space
    maxWidth: "60%", // Restricts map width
  },
};

export default App;
