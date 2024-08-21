import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

<<<<<<< HEAD
// Add a request interceptor
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${accessToken}`;
  // You can also add more headers here
  return config;
});
=======
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token used for request:", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
>>>>>>> a446774ba0ed6af1ec1a9203009988784ab92cb7

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    console.log("error getting token", error);
    return Promise.reject(error);
  }
);

export default instance;
