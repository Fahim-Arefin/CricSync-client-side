import { createSlice } from "@reduxjs/toolkit";
import { createMatch } from "../async thunk/createMatch";
import { fetchAllMatch } from "../async thunk/fetchAllMatch";
import { fetchAMatch } from "../async thunk/fetchAMatch";
import { addRunPerBall } from "../async thunk/addRunPerBall";
import { reset } from "../async thunk/reset";
import { outPlayer } from "../async thunk/outPlayer";
import { fetchMyMatch } from "../async thunk/fetchMyMatch";

const matchSlice = createSlice({
  name: "matches",
  initialState: {
    data: [],
    myData: [],
    isLoading: false,
    error: null,
    selectedMatch: {},
    battingTeam: "",
    batsman: null,

    team1OverFinished: null,
    team2OverFinished: null,
    runPerBall: 0,

    team1Total: 0,
    team2Total: 0,
    team1Wicket: 0,
    team2Wicket: 0,
    matchFinished: false,
  },

  reducers: {
    changeBatting(state, action) {
      state.battingTeam = action.payload;
    },
    changeBatsman(state, action) {
      state.batsman = action.payload;
    },
    changeRun(state, action) {
      state.runPerBall = action.payload;
    },
    totalSocresAndWicket(state, action) {
      state.team1Total = action.payload.team1Total;
      state.team2Total = action.payload.team2Total;
      state.team1Wicket = action.payload.team1Wicket;
      state.team2Wicket = action.payload.team2Wicket;
    },
  },

  extraReducers(builder) {
    //fetch all match
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

    //fetch my match
    builder.addCase(fetchMyMatch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMyMatch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myData = action.payload;
    });
    builder.addCase(fetchMyMatch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //fetch a match
    builder.addCase(fetchAMatch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAMatch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedMatch = action.payload;
      state.team1OverFinished =
        action.payload.team1.ballPlayed === action.payload.overs * 6
          ? true
          : null;
      state.team2OverFinished =
        action.payload.team2.ballPlayed === action.payload.overs * 6
          ? true
          : null;
      state.team1Total = action.payload.team1.totalScore;
      state.team2Total = action.payload.team2.totalScore;

      state.team1Wicket = action.payload.team1.totalWicket;
      state.team2Wicket = action.payload.team2.totalWicket;
    });
    builder.addCase(fetchAMatch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //create match
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

    //update match score
    builder.addCase(addRunPerBall.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addRunPerBall.fulfilled, (state, action) => {
      state.isLoading = false;
      state.runPerBall = 0;
      // console.log("Returned Value", action.payload);
      if (action.payload.msg) {
        if (action.payload.msg === "team1") {
          state.team1OverFinished = true;
        } else if (action.payload.msg === "team2") {
          state.team2OverFinished = true;
        }
      } else if (action.payload.invalid) {
        return;
      } else {
        state.selectedMatch = action.payload;
      }
    });
    builder.addCase(addRunPerBall.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // // upodate match out
    // builder.addCase(outPlayer.pending, (state) => {
    //   // state.isLoading = true;
    // });
    builder.addCase(outPlayer.fulfilled, (state, action) => {
      // state.isLoading = false;
      if (!action.payload.msg) {
        state.selectedMatch = action.payload;
      }
    });
    builder.addCase(outPlayer.rejected, (state, action) => {
      // state.isLoading = false;
      state.error = action.error;
    });

    //reset match score
    // builder.addCase(reset.pending, (state) => {
    //   // state.isLoading = true;
    // });
    builder.addCase(reset.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.runPerBall = 0;
      (state.team1OverFinished = null),
        (state.team2OverFinished = null),
        (state.runPerBall = 0),
        (state.team1Total = 0),
        (state.team2Total = 0),
        (state.team1Wicket = 0),
        (state.team2Wicket = 0),
        (state.selectedMatch = action.payload);
    });
    builder.addCase(reset.rejected, (state, action) => {
      // state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { changeBatting, changeBatsman, changeRun, totalSocresAndWicket } =
  matchSlice.actions;
export const matchReducer = matchSlice.reducer;
