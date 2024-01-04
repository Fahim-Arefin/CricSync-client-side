import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTeam } from "../async thunk/fetchAllTeam";

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

    // //adduser
    // builder.addCase(addUser.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(addUser.fulfilled, (state, action) => {
    //   // state.isLoading = false
    //   state.data.push(action.payload);
    // });
    // builder.addCase(addUser.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error;
    // });
  },
});

export const teamReducer = teamSlice.reducer;
