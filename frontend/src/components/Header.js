import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header style={styles.header}>
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>Hack A Spot</h1>
      </div>
      <nav style={styles.nav}>
        <button style={styles.navButton} onClick={toggleMenu}>☰</button>
        {menuOpen && (
          <div style={styles.dropdownMenu}>
            <a href="/profile" style={styles.menuItem}>Profile</a>
            <a href="/parking-lots" style={styles.menuItem}>Parking Lots</a>
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
  },
  titleContainer: {
    flex: 1,
    textAlign: "center",
  },
  title: {
    margin: 0,
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
  },
  menuItem: {
    color: "white",
    textDecoration: "none",
    padding: "8px 12px",
    display: "block",
  },
};

export default Header;
