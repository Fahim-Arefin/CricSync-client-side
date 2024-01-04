import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAllMatch = createAsyncThunk("match/fetch", async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/matches`);
  return response.data;
});

export { fetchAllMatch };
