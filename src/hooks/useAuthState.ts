import { AuthStateContext } from 'providers/AuthProvider';
import { useContext } from 'react';

export const useAuthState = () => {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw new Error('context missing');
  }

  return context;
};
