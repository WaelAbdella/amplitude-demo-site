import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import DevInfoPanel from './DevInfoPanel';
// Developer Info Panel will go here later
// Import Developer Context later if needed

const Layout = () => {
  const [isDevMode, setIsDevMode] = useState(false);

  const toggleDevMode = () => setIsDevMode(prev => !prev);

  return (
    <>
      <Navbar isDevMode={isDevMode} toggleDevMode={toggleDevMode} />

      <main className="container" style={{ paddingTop: '60px' }}>
        <Outlet context={{ isDevMode }} />
      </main>

      {isDevMode && <DevInfoPanel />}

      <footer style={{ 
          marginTop: 'auto',
          backgroundColor: '#e9ecef',
          padding: '1rem 0', 
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#6c757d',
          borderTop: '1px solid #dee2e6'
        }}>
        <div className="container">
          Convz Amplitude Demo &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
};

export default Layout; 