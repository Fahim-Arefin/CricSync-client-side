import { configureStore } from "@reduxjs/toolkit";
import { teamReducer } from "./slices/teamslice";
import {
  matchReducer,
  changeBatting,
  changeBatsman,
  changeRun,
  totalSocresAndWicket,
} from "./slices/matchSlice";

// All thunk
import { fetchAllTeam } from "./async thunk/fetchAllTeam";
import { fetchAMatch } from "./async thunk/fetchAMatch";
import { fetchAllMatch } from "./async thunk/fetchAllMatch";
import { createTeam } from "./async thunk/createTeam";
import { createMatch } from "./async thunk/createMatch";
import { addRunPerBall } from "./async thunk/addRunPerBall";
import { outPlayer } from "./async thunk/outPlayer";
import { reset } from "./async thunk/reset";
import { fetchMyMatch } from "./async thunk/fetchMyMatch";

const store = configureStore({
  reducer: {
    teams: teamReducer,
    matches: matchReducer,
  },
});

export {
  store,
  fetchAllTeam,
  fetchAllMatch,
  fetchMyMatch,
  fetchAMatch,
  createTeam,
  createMatch,
  changeBatting,
  changeBatsman,
  changeRun,
  addRunPerBall,
  reset,
  outPlayer,
  totalSocresAndWicket,
};
