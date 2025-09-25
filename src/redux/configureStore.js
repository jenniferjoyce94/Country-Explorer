import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./CountriesSlice.js";
import savedSlice from "./savedSlice.js";
import quizSlice from "./quizSlice.js";

const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
    saved: savedSlice,
    quiz: quizSlice,
  },
});
export default store;
