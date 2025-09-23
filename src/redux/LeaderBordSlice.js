import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    score: loadScore() || [],
  },
  reducers: {
    setLeaderboard: (state, action) => {
      state.score.push(action.payload);
      localStorage.setItem("leaderboard", JSON.stringify(state.score));
    },
  },
});

export const { setLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
