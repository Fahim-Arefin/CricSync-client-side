import { createSlice } from "@reduxjs/toolkit";
import { createMatch } from "../async thunk/createMatch";
import { fetchAllMatch } from "../async thunk/fetchAllMatch";

const matchSlice = createSlice({
  name: "matches",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedMatch: {},
  },

  //creating async thunk step-4
  extraReducers(builder) {
    //fetch user
    builder.addCase(fetchAllMatch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllMatch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAllMatch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //adduser
    builder.addCase(createMatch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createMatch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(createMatch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const matchReducer = matchSlice.reducer;
