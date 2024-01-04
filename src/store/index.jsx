import { configureStore } from "@reduxjs/toolkit";
import { teamReducer } from "./slices/teamslice";
import { matchReducer } from "./slices/matchSlice";

// All thunk
import { fetchAllTeam } from "./async thunk/fetchAllTeam";
import { fetchAllMatch } from "./async thunk/fetchAllMatch";
import { createTeam } from "./async thunk/createTeam";
import { createMatch } from "./async thunk/createMatch";

const store = configureStore({
  reducer: {
    teams: teamReducer,
    matches: matchReducer,
  },
});

export { store };
export { fetchAllTeam };
export { fetchAllMatch };
export { createTeam };
export { createMatch };
