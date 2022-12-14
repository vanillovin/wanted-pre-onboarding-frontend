import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('USER'));

  const onSetUser = (value) => setUser(value);

  useEffect(() => {
    localStorage.setItem('USER', user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, onSetUser }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
