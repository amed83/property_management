import { useContext } from 'react';
import { AuthDispatchContext } from '../AuthProvider';

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error('context missing');
  }

  return context;
};
