import { useContext } from 'react';
import { AuthStateContext } from '../AuthProvider';

export const useAuthState = () => {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw new Error('context missing');
  }

  return context;
};
