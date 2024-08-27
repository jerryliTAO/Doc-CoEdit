import axios, { type InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  timeout: 10000,
});

// interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // set some config before request
    const token = localStorage.getItem("token");

    // setting Authorization in Headers for every request
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    // request error
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  (response) => {
    // response data
    return response;
  },
  (error) => {
    // response error
    if (error.response) {
      // according the error status to show error message
      console.error(`Error ${error.response.status}: ${error.response.data.msg}`);
    } else {
      console.error("Network Error");
    }
    return Promise.reject(error);
  }
);

export default instance;
