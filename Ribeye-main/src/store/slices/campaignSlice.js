import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state for the campaign slice
const initialState = {
  campaignsList: [],
  loading: false,
  singleCampaign: {},
};

// Create a campaign slice using createSlice
const campaignSlice = createSlice({
  name: "campaignSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Reducer for creating a campaign
    builder
      .addCase(createCampaign.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Create campaign successfully");
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Something went wrong");
      })
      // Reducer for getting a list of campaigns
      .addCase(getCampaigns.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaignsList = action.payload;
      })
      .addCase(getCampaigns.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Something went wrong");
      })
      // Reducer for getting a single campaign
      .addCase(getSingleCampaign.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSingleCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCampaign = action.payload;
      })
      .addCase(getSingleCampaign.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Something went wrong");
      })
      // Reducer for updating a campaign
      .addCase(updateCampaign.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("updated successfully");
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Campaign isn't updated successfully");
      });
  },
});
export default campaignSlice.reducer;

// Thunk action to fetch a list of campaigns
export const getCampaigns = createAsyncThunk(
  "campaignSlice/getCampaigns",
  async (payload) => {
    try {
      const response = await axios.get(
        `/campaigns?advertiser_public_identifier=e18d415a-7755-4360-812e-5bb5759a847f`
      );
      if (payload?.onSuccess) {
        payload?.onSuccess();
      }
      return response?.data?.data;
    } catch (err) {
      console.log(err);
      throw err?.response?.data;
    }
  }
);

// Thunk action to fetch a single campaign by ID
export const getSingleCampaign = createAsyncThunk(
  "campaignSlice/getSingleCampaign",
  async (payload) => {
    try {
      const response = await axios.get(`/campaigns/${payload.campaignId}`);
      if (payload?.onSuccess) {
        payload?.onSuccess();
      }
      return response?.data?.data;
    } catch (err) {
      console.log(err);
      throw err?.response?.data;
    }
  }
);

// Thunk action to create a new campaign
export const createCampaign = createAsyncThunk(
  "campaignSlice/createCampaign",
  async (payload) => {
    try {
      const response = await axios.post(
        `/campaigns/create`,
        payload.formValues
      );
      if (payload.onSuccess) {
        payload.onSuccess(response?.data?.data?.public_identifier);
      }
      return response?.data?.data;
    } catch (err) {
      console.log(err);
      throw err?.response?.data;
    }
  }
);

// Thunk action to update an existing campaign
export const updateCampaign = createAsyncThunk(
  "campaignSlice/updateCampaign",
  async (payload) => {
    try {
      const response = await axios.put(
        `/campaigns/update/${payload.public_identifier}`,
        {
          ...payload.formValues,
          pacing_type: payload.pacing_type,
        }
      );
      if (payload.onSuccess) {
        payload.onSuccess(response?.data?.data?.public_identifier);
      }
      return response?.data?.data;
    } catch (err) {
      console.log(err);
      throw err?.response?.data;
    }
  }
);
