const API_URL = "http://localhost:3001/api";
const REACT_APP_API_URL = API_URL;

export function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
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
