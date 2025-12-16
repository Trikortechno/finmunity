import React, { createContext, useContext, useState } from 'react';

const NewsContext = createContext();

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext must be used within NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [isCrypto, setIsCrypto] = useState(true);

  return (
    <NewsContext.Provider value={{ isCrypto, setIsCrypto }}>
      {children}
    </NewsContext.Provider>
  );
};

