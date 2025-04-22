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

      <div className={isDevMode ? "layout-with-sidebar" : ""}>
        <main className="container">
          <Outlet context={{ isDevMode }} />
        </main>

        {isDevMode && <DevInfoPanel className="dev-info-sidebar" />}
      </div>

      <footer className="site-footer">
        <div className="container">
          Convz Amplitude Demo &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
};

export default Layout; 