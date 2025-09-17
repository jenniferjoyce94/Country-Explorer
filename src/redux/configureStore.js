import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./CountriesSlice.js";
import savedSlice from "./savedSlice.js";

const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
    saved: savedSlice.reducer,
  },
});
export default store;
