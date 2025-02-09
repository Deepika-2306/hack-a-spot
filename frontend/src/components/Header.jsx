import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Redirect to Home
  const goToHome = () => {
    window.location.href = "/"; // ✅ Redirect to Home
  };

  return (
    <header style={styles.header}>
      <div style={styles.titleContainer}>
        <h1 style={styles.title} onClick={goToHome}>Hack A Spot</h1> {/* ✅ Clickable Title */}
      </div>
      <nav style={styles.nav}>
        <button style={styles.navButton} onClick={toggleMenu}>☰</button>
        {menuOpen && (
          <div style={styles.dropdownMenu}>
            <a href="/" style={styles.menuItem} onClick={goToHome}>🏠 Home</a> {/* ✅ Redirect to Home */}
          </div>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "#333",
    color: "white",
    position: "relative",
    zIndex: 1000, // ✅ Ensures header appears above other elements
  },
  titleContainer: {
    flex: 1,
    textAlign: "center",
  },
  title: {
    margin: 0,
    cursor: "pointer", // ✅ Indicates clickability
    textDecoration: "none",
  },
  nav: {
    position: "relative",
  },
  navButton: {
    fontSize: "20px",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    top: "40px",
    right: "0",
    backgroundColor: "#444",
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 2000, // 🔥 FIX: Ensures dropdown is ABOVE the rightContainer
    width: "150px", // Optional: Adjust width
  },
  menuItem: {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    display: "block",
    cursor: "pointer",
  },
};

export default Header;
