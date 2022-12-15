import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const localStorageUser = localStorage.getItem('USER');
  const [user, setUser] = useState({
    name: null,
    token: localStorageUser === 'null' ? null : localStorageUser,
  });

  const resetUser = () => setUser({ name: null, token: null });

  useEffect(() => {
    if (!user.name) localStorage.removeItem('USER');
    else localStorage.setItem('USER', user.token);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
