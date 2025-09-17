import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const baseUrl = "https://restcountries.com/v3.1";

export const fetchRegions = createAsyncThunk(
  "countries/fetchRegions",
  async (region) => {
    const url = `${baseUrl}/all?fields=region`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    return await response.json();
  }
);

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const detailsUrl = `${baseUrl}/all?fields=name,capital,region,flags,population,maps`;
    const response = await fetch(detailsUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
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

export default countriesSlice;
