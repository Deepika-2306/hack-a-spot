import React, { useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import MapDisplay from "./components/MapDisplay";

function App() {
  const [searchData, setSearchData] = useState(null);

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <SearchForm onSearch={setSearchData} />
        <MapDisplay location={searchData?.location} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "90vh",
  },
};

export default App;
