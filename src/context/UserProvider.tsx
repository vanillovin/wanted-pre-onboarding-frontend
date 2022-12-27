import { createContext, PropsWithChildren, useEffect, useState } from 'react';

interface User {
  name: string | null;
  token: string | null;
}

interface UserState {
  user: User;
  onSetUser(user: User): void;
  onResetUser(): void;
}

export const UserContext = createContext<UserState | undefined>(undefined);

function UserProvider({ children }: PropsWithChildren) {
  const localStorageUser = localStorage.getItem('USER');
  const [user, setUser] = useState<User>({
    name: null,
    token: localStorageUser === 'null' ? null : localStorageUser,
  });

  const onSetUser = (user: User) => setUser((prev) => ({ ...prev, ...user }));

  const onResetUser = () => setUser({ name: null, token: null });

  useEffect(() => {
    if (user.token) {
      localStorage.setItem('USER', user.token);
    } else localStorage.removeItem('USER');
  }, [user]);

  return (
    <UserContext.Provider value={{ user, onSetUser, onResetUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
