import axios, { AxiosInstance } from "axios";

export function axiosInstance(type: boolean): AxiosInstance {
  return axios.create({
    baseURL: type ? process.env.BACKEND_URL : process.env.FRONTEND_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
