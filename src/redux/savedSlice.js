import { createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice({
  name: "saved",
  initialState: {
    savedCountries: [],
  },
  reducers: {
    savedCountry: (state, action) => {
      const country = action.payload;
      if (
        !state.savedCountries.find((c) => c.name.common === country.name.common)
      ) {
        state.savedCountries.push(country);
      }
    },
    removeCountry: (state, action) => {
      const countryName = action.payload;
      state.savedCountries = state.savedCountries.filter(
        (c) => c.name.common !== countryName
      );
    },
  },
});

export const { savedCountry, removeCountry } = savedSlice.actions;
export default savedSlice;
