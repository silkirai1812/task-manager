import axios from "axios";

const API = axios.create({
  baseURL: "process.env.NEXT_PUBLIC_API_URL"
});

export const setAuthToken = (token: string) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default API;