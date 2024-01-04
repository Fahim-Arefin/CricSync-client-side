import { configureStore } from "@reduxjs/toolkit";
import { teamReducer } from "./slices/teamslice";

// All thunk
import { fetchAllTeam } from "./async thunk/fetchAllTeam";

const store = configureStore({
  reducer: {
    teams: teamReducer,
  },
});

export { store };
export { fetchAllTeam };
