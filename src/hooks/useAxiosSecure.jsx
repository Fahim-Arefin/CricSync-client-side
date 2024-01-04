import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // baseURL: "http://localhost:5000",
  // baseURL: "https://metroshelter-server-side.vercel.app",
  withCredentials: true,
});

function useAxiosSecure() {
  return axiosSecure;
}

export default useAxiosSecure;
