import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  timeout: 10000,
});

// interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // set some config before request
    const token = localStorage.getItem("token");
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
  (error: AxiosError) => {
    // response error
    if (error.response) {
      // 根據錯誤狀態碼顯示相應的錯誤信息
      console.error(`Error ${error.response.status}: ${error.response.data.message}`);
    } else {
      console.error("Network Error");
    }
    return Promise.reject(error);
  }
);

export default instance;
