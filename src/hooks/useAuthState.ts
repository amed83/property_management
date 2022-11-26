import { useContext } from 'react';
import { AuthStateContext } from '../providers/AuthProvider';

export const useAuthState = () => {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw new Error('context missing');
  }

  return context;
};
