import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const outPlayer = createAsyncThunk("matches/out", async ({ _id, ...data }) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/matches/out/${_id}`,
    data
  );
  return response.data;
});

export { outPlayer };
