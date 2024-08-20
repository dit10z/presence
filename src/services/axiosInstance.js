import axios from "axios";

const instance = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${accessToken}`;
  // You can also add more headers here
  return config;
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    console.log("error getting token", error);
=======
  baseURL: "http://localhost:8080",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error getting response", error);
>>>>>>> e5b74c987ff1701c2ca5d514cab20908d0d63715
    return Promise.reject(error);
  }
);

export default instance;
