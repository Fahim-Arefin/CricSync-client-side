import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchMyMatch = createAsyncThunk("match/my/fetch", async (email) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/matches/my/${email}`
  );
  return response.data;
});

export { fetchMyMatch };
