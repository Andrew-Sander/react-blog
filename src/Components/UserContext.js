import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(userData => {
        setUser(userData);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
