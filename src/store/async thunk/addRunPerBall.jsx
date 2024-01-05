import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addRunPerBall = createAsyncThunk(
  "matches/update",
  async ({ _id, ...data }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/matches/score/${_id}`,
      data
    );
    return response.data;
  }
);

export { addRunPerBall };
