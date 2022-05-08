/* eslint-disable @typescript-eslint/no-explicit-any */
type Methods = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method: Methods;
  body?: any;
  headers?: any;
}

export const api = async (endpoint: string, fetchOptions: FetchOptions) => {
  try {
    const data = await fetch(`${endpoint}`, fetchOptions);
    if (!data.ok) {
      throw new Error("Error fetching data");
    }
    const json = await data.json();
    return json;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};
