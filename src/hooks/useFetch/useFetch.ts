import { fetchHelper, FetchOptions } from '../../api/fetchHelper';
import { useCallback, useReducer } from 'react';

interface FetchState<T> {
  isLoading: boolean;
  error?: Error;
  data?: T;
}

type Action<T> =
  | { type: 'fetchStarted' }
  | { type: 'fetchSuccess'; payload: T }
  | { type: 'fetchError'; payload: Error };

function fetchReducer<T>(
  state: FetchState<T>,
  action: Action<T>,
): FetchState<T> {
  switch (action.type) {
    case 'fetchStarted':
      return {
        ...state,
        isLoading: true,
      };
    case 'fetchSuccess':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case 'fetchError':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
  }
}

interface Response<T = unknown> {
  handleFetch: (endpoint: string, fetchOptions: FetchOptions) => void;
  state: FetchState<T>;
}
// not used, just for reference
export function useFetch<T = unknown>(): Response<T> {
  const initialState: FetchState<T> = {
    isLoading: false,
    error: undefined,
    data: undefined,
  };

  const [state, dispatchAction] = useReducer(fetchReducer, initialState);

  const handleFetch = useCallback(
    async (endpoint: string, fetchOptions: RequestInit) => {
      try {
        dispatchAction({ type: 'fetchStarted' });
        const response = await fetchHelper<T>(`${endpoint}`, fetchOptions);
        dispatchAction({ type: 'fetchSuccess', payload: response });
      } catch (err) {
        dispatchAction({ type: 'fetchError', payload: err as Error });
      }
    },
    [],
  );

  return { state, handleFetch } as Response<T>;
}
