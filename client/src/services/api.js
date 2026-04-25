import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access"); // Get access token from the local storage
    
if (accessToken) { // if access token is present, add it to the bearer-token
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => { // Error-handling
    console.error("Request error ::", error);
    return Promise.reject(error);
  }
);