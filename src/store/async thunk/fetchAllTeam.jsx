import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAllTeam = createAsyncThunk("team/fetch", async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/teams`);

  return response.data;
});

export { fetchAllTeam };
