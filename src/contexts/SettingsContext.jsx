import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  
  const [currency, setCurrency] = useState('USD');


  return (
    <SettingsContext.Provider value={{ currency, setCurrency }}>
      {children}
    </SettingsContext.Provider>
  );
};

