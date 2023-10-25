import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://652a1c1155b137ddc83f4d53.mockapi.io",
  headers: {
    Accept: "application/json",
  },
});
