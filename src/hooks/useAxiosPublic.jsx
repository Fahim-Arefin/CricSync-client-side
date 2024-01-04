import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // baseURL: "https://metroshelter-server-side.vercel.app",
});

function useAxiosPublic() {
  return axiosPublic;
}

export default useAxiosPublic;
