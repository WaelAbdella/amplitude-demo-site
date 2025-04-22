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
    <div>
      <Navbar isDevMode={isDevMode} toggleDevMode={toggleDevMode} />
      <main className="container mx-auto mt-4 relative pb-64">
        <Outlet context={{ isDevMode }} />
        {/* Conditionally render Developer Info Panel */}
        {isDevMode && <DevInfoPanel />}
      </main>
      {/* Developer Info Panel Component instance will go here */}
    </div>
  );
};

export default Layout; 