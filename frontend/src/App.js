import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import MapDisplay from "./components/MapDisplay";
import ParkingLists from "./components/ParkingLists";
import ParkingDetails from "./components/ParkingDetails";
import ParkingLotView from "./components/ParkingLotView"; // 🔥 New Component
import importedParkingLots from "./data/parkingLots.json";

function App() {
  const [parkingLots, setParkingLots] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [showParkingList, setShowParkingList] = useState(false);
  const [selectedParkingLot, setSelectedParkingLot] = useState(null);
  const [showParkingLotView, setShowParkingLotView] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserCoords(coords);
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, []);

  const handleSearch = () => {
    setParkingLots(importedParkingLots);
    setShowParkingList(true);
  };

  const handleParkingLotClick = (lot) => {
    setSelectedParkingLot(lot);
  };

  const handleBackToSearch = () => {
    setShowParkingList(false);
  };

  const handleBackToList = () => {
    setSelectedParkingLot(null);
  };

  const handleShowSpot = (lot) => {
    setSelectedParkingLot(lot);
    setShowParkingLotView(true);
  };

  return (
    <div style={styles.appContainer}>
      <Header />
      <div style={styles.mainContainer}>
        {showParkingLotView ? (
          <ParkingLotView lot={selectedParkingLot} goBack={() => setShowParkingLotView(false)} />
        ) : (
          <>
            <div style={styles.leftContainer}>
              {selectedParkingLot ? (
                <ParkingDetails lot={selectedParkingLot} goBack={handleBackToList} showSpot={handleShowSpot} />
              ) : showParkingList ? (
                <ParkingLists lots={parkingLots} onLotClick={handleParkingLotClick} goBack={handleBackToSearch} />
              ) : (
                <SearchForm onSearch={handleSearch} />
              )}
            </div>
            <div style={styles.rightContainer}>
              <MapDisplay 
                userCoords={userCoords} 
                parkingLots={showParkingList ? parkingLots : []} 
                selectedLot={selectedParkingLot} 
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  mainContainer: {
    display: "flex",
    flex: 1,
    width: "100vw",
  },
  leftContainer: {
    flex: 1,
    width: "40vw",
    maxWidth: "40%",
    backgroundColor: "#f8f9fa",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    overflowY: "auto",
  },
  rightContainer: {
    flex: 2,
    width: "60vw",
    maxWidth: "60%",
    height: "100vh",
  },
};

export default App;
