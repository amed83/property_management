import React, { createContext, useReducer } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  authToken: string | null;
  hasError: boolean;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('userToken'),
  authToken: null,
  isLoading: false,
  hasError: false,
};

export const AuthStateContext = createContext<AuthState>(initialState);
export const AuthDispatchContext = createContext<
  React.Dispatch<ActionType> | undefined
>(undefined);

type ActionType =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: string }
  | { type: 'LOGIN_FAIL' }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: ActionType) => {
  switch (action.type) {
    case 'LOGIN_START': {
      return {
        ...state,
        hasError: false,
        isLoading: true,
      };
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        authToken: action.payload,
        isLoggedIn: true,
      };
    }
    case 'LOGIN_FAIL': {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLoggedIn: false,
        authToken: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

const login = async (
  email: string,
  password: string,
  dispatch: React.Dispatch<ActionType>,
) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const userToken = await response.user.getIdToken();
    localStorage.setItem('userToken', userToken);
    dispatch({ type: 'LOGIN_SUCCESS', payload: userToken });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAIL' });
    console.error('error login in', err);
  }
};

const logout = (dispatch: React.Dispatch<ActionType>) => {
  signOut(auth);
  localStorage.removeItem('userToken');
  dispatch({ type: 'LOGOUT' });
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export { login, logout };
