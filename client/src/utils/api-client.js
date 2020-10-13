import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

const REACT_APP_API_URL =
  process.env.REACT_APP_API_URL;

export function client(endpoint, { body, token, ...customConfig } = {}) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (token) headers.append("Authorization", `Bearer ${token}`);

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers,
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${REACT_APP_API_URL}/${endpoint}`, config)

    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export function useAuthClient() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  return useCallback(
    async (endpoint, config) => {
      const token = isAuthenticated
        ? await getAccessTokenSilently()
        : undefined;
      return client(endpoint, { ...config, token });
    },
    [isAuthenticated, getAccessTokenSilently]
  );
}
