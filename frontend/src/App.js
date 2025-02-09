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

  // 🏎️ Haversine Formula to Calculate Distance in KM
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) {
      console.warn("Invalid coordinates for distance calculation:", { lat1, lon1, lat2, lon2 });
      return Infinity; // Assign large value if invalid, to push to end of sorted list
    }

    const toRad = (angle) => (angle * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
  };

  // 🛰️ Get User's Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("✅ User Coordinates:", coords); // Debugging
          setUserCoords(coords);
        },
        (error) => console.error("🚨 Geolocation error:", error)
      );
    }
  }, []);
  

  const handleSearch = () => {
    if (!userCoords || !userCoords.lat || !userCoords.lng) {
      alert("🚨 User location not available!");
      return;
    }
  
    console.log("🔍 Checking Parking Lot Data:");
    importedParkingLots.forEach(lot => {
      console.log(`📍 ${lot.name} - latitude: ${lot.latitude}, longitude: ${lot.longitude}`);
    });
  
    const updatedLots = importedParkingLots
      .map((lot) => {
        if (!lot.latitude || !lot.longitude) {
          console.warn(`🚨 Missing latitude/longitude for: ${lot.name}`);
          return { ...lot, roadDistance: Infinity };
        }
  
        return {
          ...lot,
          roadDistance: haversineDistance(userCoords.lat, userCoords.lng, lot.latitude, lot.longitude), // 🛠️ Fixed field names
        };
      })
      .sort((a, b) => a.roadDistance - b.roadDistance);
  
    console.log("🚀 Updated Parking Lots with Distances:", updatedLots); // Debugging
  
    setParkingLots(updatedLots);
    setShowParkingList(true);
  };
  

  // 📌 Handlers for Navigation
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
