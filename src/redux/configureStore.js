import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./CountriesSlice.js";

const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
  },
});
export default store;
