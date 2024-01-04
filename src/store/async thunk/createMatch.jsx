import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createMatch = createAsyncThunk("matches/create", async (match) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/matches/new`,
    match
  );
  return response.data;
});

export { createMatch };
