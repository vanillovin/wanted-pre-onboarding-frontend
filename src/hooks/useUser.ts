import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

export default function useUser() {
  const stateCtx = useContext(UserContext);

  if (!stateCtx) {
    throw new Error('useUser must be used within the UserProvider');
  }

  return {
    ...stateCtx,
  };
}
