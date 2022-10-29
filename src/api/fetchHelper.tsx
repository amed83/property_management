export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface FetchOptions extends RequestInit {
  method: Methods;
}

export async function fetchHelper<T>(
  endpoint: string,
  fetchOptions: RequestInit,
): Promise<T> {
  const response = await fetch(`${endpoint}`, fetchOptions);
  if (response.status >= 400 && response.status < 600) {
    throw new Error(response.statusText);
  }
  const json = (await response.json()) as T;
  return json;
}
