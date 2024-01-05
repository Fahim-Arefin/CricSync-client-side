// addRunPerBall.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const reset = createAsyncThunk("matches/reset", async (matchId) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/matches/reset/${matchId}`
  );
  return response.data;
});

export { reset };
