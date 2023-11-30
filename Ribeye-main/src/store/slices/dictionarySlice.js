import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import countries from "../data/countries.json";
import cities from "../data/cities.json";
import dma from "../data/dma.json";
import region from "../data/region.json";
import zipcode from "../data/zipcode.json";
import { toast } from "react-toastify";

const dictionarySlice = createSlice({
  initialState: {
    loading: false,
    dictionary: [],
    countries: countries,
    cities: cities,
    dma: dma,
    region: region,
    zipcode: zipcode,
  },
  name: "dictionarySlice",
  extraReducers: (builder) => {
    builder
      .addCase(getDictionary.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDictionary.fulfilled, (state, action) => {
        state.loading = false;
        state.dictionary = action?.payload?.countries?.map((el, idx) => {
          return { name: el.name, state: "country" };
        });
      })
      .addCase(getDictionary.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Something went wrong");
      });
  },
});

export default dictionarySlice.reducer;

export const getDictionary = createAsyncThunk(
  "dictionarySlice/getDictionary",
  async () => {
    const response = await axios.get("/countries");
    return { countries: response.data.data };
  }
);
