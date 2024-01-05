import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAMatch = createAsyncThunk("match/one/fetch", async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/matches/${id}`
  );
  return response.data;
});

export { fetchAMatch };
