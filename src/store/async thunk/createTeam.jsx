import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createTeam = createAsyncThunk("team/create", async (team) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/teams/new`,
    team
  );
  return response.data;
});

export { createTeam };
