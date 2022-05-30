export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface FetchOptions {
  method: Methods;
  body?: any;
  headers?: any;
}

export async function fetchHelper<T>(
  endpoint: string,
  fetchOptions: RequestInit,
): Promise<T> {
  try {
    const data = await fetch(`${endpoint}`, fetchOptions);
    if (data.status >= 400 && data.status < 600) {
      throw new Error(data.statusText);
    }
    const json = (await data.json()) as T;
    return json;
  } catch (error) {
    throw new Error('Error fetching data');
  }
}
