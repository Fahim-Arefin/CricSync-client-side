import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTeam } from "../async thunk/fetchAllTeam";
import { createTeam } from "../async thunk/createTeam";

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},

  //creating async thunk step-4
  extraReducers(builder) {
    //fetch user
    builder.addCase(fetchAllTeam.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAllTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //adduser
    builder.addCase(createTeam.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(createTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const teamReducer = teamSlice.reducer;
