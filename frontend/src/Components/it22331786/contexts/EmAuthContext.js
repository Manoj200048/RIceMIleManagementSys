// EmAuthContext.js
import React, { createContext, useContext, useState } from 'react';

const EmAuthContext = createContext();

export const useEmAuth = () => useContext(EmAuthContext);

export const EmAuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const emLogin = (user) => {
    setLoggedInUser(user);
  };

  const emLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <EmAuthContext.Provider value={{ loggedInUser, emLogin, emLogout }}>
      {children}
    </EmAuthContext.Provider>
  );
};
