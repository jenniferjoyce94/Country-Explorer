import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedCountries: localStorage.getItem("savedCountries")
    ? JSON.parse(localStorage.getItem("savedCountries"))
    : [],
};

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    savedCountry: (state, action) => {
      if (
        !state.savedCountries.find(
          (c) => c.name.common === action.payload.name.common
        )
      ) {
        state.savedCountries.push(action.payload);
        localStorage.setItem(
          "savedCountries",
          JSON.stringify([...state.savedCountries, action.payload])
        );
      }
    },
    removeCountry: (state, action) => {
      state.savedCountries = state.savedCountries.filter(
        (c) => c.name.common !== action.payload
      );
      localStorage.setItem(
        "savedCountries",
        JSON.stringify(state.savedCountries)
      );
    },
  },
});

export const { savedCountry, removeCountry } = savedSlice.actions;
export default savedSlice.reducer;
