import React, { createContext, useReducer } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  authToken: string | null;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('sessionId'),
  authToken: null,
};

export const AuthStateContext = createContext<AuthState>(initialState);
export const AuthDispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

type ActionType = 'LOGIN' | 'LOGOUT';

interface Action {
  type: ActionType;
}

const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        isLoggedIn: true,
        authToken: 'some secret',
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
