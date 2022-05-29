import { fetchHelper, FetchOptions } from './../../api/api';
import { useCallback, useState } from 'react';

interface Response<T> {
  data: T | null;
  loading: boolean;
  error: string | undefined;
  handleFetch: (endpoint: string, fetchOptions: FetchOptions) => void;
}

export function useFetch<T>(): Response<T> {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const handleFetch = useCallback(
    async (endpoint: string, fetchOptions: FetchOptions) => {
      try {
        setLoading(true);
        const response = await fetchHelper<T>(`${endpoint}`, fetchOptions);
        setData(response);
        setLoading(false);
      } catch (err) {
        let errorMessage: string;
        if (err instanceof Error) {
          errorMessage = err.message;
        } else {
          errorMessage = 'Something went wrong';
        }
        setError(errorMessage);
        setLoading(false);
      }
    },
    [],
  );

  return { data, loading, error, handleFetch };
}
