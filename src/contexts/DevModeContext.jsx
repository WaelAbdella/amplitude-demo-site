import React, { createContext, useState, useContext } from 'react';

const DevModeContext = createContext();

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (!context) {
    throw new Error('useDevMode must be used within a DevModeProvider');
  }
  return context;
};

export const DevModeProvider = ({ children }) => {
  const [isDevMode, setIsDevMode] = useState(false);

  const toggleDevMode = () => {
    setIsDevMode(prev => !prev);
  };

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode }}>
      {children}
    </DevModeContext.Provider>
  );
}; 