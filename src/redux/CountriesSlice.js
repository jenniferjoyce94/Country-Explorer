import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

export const fetchRegions = createAsyncThunk(
  "countries/fetchRegions",
  async () => {
    const url = `${api()}/all?fields=region`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Problem att hämta regioner");
    }
    return await response.json();
  }
);

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (region) => {
    const url = `${api()}/region/${region}?fields=name,translations,capital,region,flags,population,maps,altSpellings`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Problem att hämta länder");
    }
    return await response.json();
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectCountries = (state) => state.countries.countries;
export const getCountriesStatus = (state) => state.countries.status;
export const getCountriesError = (state) => state.countries.error;
export default countriesSlice;
