// src/components/Navbar.js
import React, { useState } from 'react';
import favicon from '../assets/favicon.png';
import iconcoffee from '../assets/icons8-coffee-100 (1).png';
import avatar from '../assets/th.png';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchClick = () => {
    setShowSearchPopup(true);
  };

  const handleClosePopup = () => {
    setShowSearchPopup(false);
    setSearchTerm(""); // Reset search term when closing the popup
    onSearch(""); // Reset filtered list
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass search term to the parent component
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={favicon} alt="logo" width="30px" className="navbar-logo" />
          LOLFI Track | Lolfi Music
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#search" onClick={handleSearchClick}>Search</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#library">Your Library</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#playlist">Playlist</a>
            </li>
            <li className="nav-item dropdown" style={{ position: 'relative' }}>
              <a className="nav-link" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                <img 
                  src={avatar} 
                  alt="profile" 
                  width="30px" 
                  className="navbar-logo" 
                  style={{ borderRadius: '100px' }} 
                />
              </a>
              {isOpen && (
                <div className="dropdown-menu" style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px',
                  zIndex: 1000,
                }}>
                  <a className="dropdown-item" href="/profile" style={{ padding: '10px 20px', textDecoration: 'none', display: 'block' }}>
                    Profile
                  </a>
                  <a className="dropdown-item" href="/settings" style={{ padding: '10px 20px', textDecoration: 'none', display: 'block' }}>
                    Settings
                  </a>
                  <a className="dropdown-item" href="/logout" style={{ padding: '10px 20px', textDecoration: 'none', display: 'block' }}>
                    Logout
                  </a>
                </div>
              )}
            </li>
          </ul>
          <form className="d-flex" role="search">
            <button className="coffee-button" type="submit">
              <img src={iconcoffee} alt="coffee" width="30px" className="navbar-logo" /> Donate a cup of coffee
            </button>
          </form>
        </div>
      </div>

      {/* Search Popup */}
      {showSearchPopup && (
        <div className="search-popup-overlay">
          <div className="search-popup">
            <button className="close-popup" onClick={handleClosePopup}>X</button>
            <h2>Search Songs</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
