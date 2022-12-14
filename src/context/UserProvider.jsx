import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('USER'));

  const onSetUser = (value) => setUser(value);

  return (
    <UserContext.Provider value={{ user, onSetUser }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
