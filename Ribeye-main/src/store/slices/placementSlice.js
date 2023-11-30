import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state for the placement slice
const initialState = {
  loading: false,
  placements: [],
  placementLoading: false,
  singlePlacement: {},
};

// Create a placement slice using createSlice
const placementSlice = createSlice({
  name: "placementSlice",
  initialState,
  reducers: {
    addPlacement: (state, action) => {
      state.placements = [...state.placements, action.payload];
    },
    emptyPlacement: (state, action) => {
      state.singlePlacement = {};
    },
  },
  extraReducers: (builder) => {
    // Reducer for creating placement
    builder
      .addCase(createPlacement.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPlacement.fulfilled, (state, action) => {
        state.loading = false;
        state.placements = action.payload.placementsList;
      })
      .addCase(createPlacement.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message || "Something went wrong");
      });
    // Reducer for fetching placements
    builder
      .addCase(getPlacement.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPlacement.fulfilled, (state, action) => {
        state.loading = false;
        state.placements = action.payload;
      })
      .addCase(getPlacement.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message || "Something went wrong");
      });
    // Reducer for fetching detailed placements
    builder
      .addCase(getDetailedPlacements.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailedPlacements.fulfilled, (state, action) => {
        state.loading = false;
        state.placements = action.payload;
      })
      .addCase(getDetailedPlacements.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message || "Something went wrong");
      });
    // Reducer for fetching a single placement
    builder
      .addCase(getSinglePlacement.pending, (state, action) => {
        state.placementLoading = true;
      })
      .addCase(getSinglePlacement.fulfilled, (state, action) => {
        state.placementLoading = false;
        state.singlePlacement = action.payload;
      })
      .addCase(getSinglePlacement.rejected, (state, action) => {
        state.placementLoading = false;
        toast.error(action.error.message || "Something went wrong");
      });
  },
});
export default placementSlice.reducer;

// Export action creators
export const { addPlacement, emptyPlacement } = placementSlice.actions;

// Thunk action to create or update a placement
export const createPlacement = createAsyncThunk(
  "placementSlice/createPlacement",
  async (payload) => {
    try {
      if (payload.editingPlacementId) {
        // Update an existing placement
        const response = await axios.put(
          `/placements/update/${payload.editingPlacementId}`,
          payload.placementFormValues
        );
        const response2 = await axios.get(
          `/placements?campaign_public_identifier=${payload.placementFormValues.campaign_public_identifier}&status=active`
        );
        if (payload?.onSuccess) {
          payload?.onSuccess();
        }
        toast.success("Placement updated successfully");
        return {
          ...response?.data?.data,
          editingPlacementIdx: payload.editingPlacementIdx,
          placementsList: response2?.data?.data,
        };
      } else {
        // Create a new placement
        const response = await axios.post(
          `/placements/create`,
          payload.placementFormValues
        );
        const response2 = await axios.get(
          `/placements?campaign_public_identifier=${payload.placementFormValues.campaign_public_identifier}&status=active`
        );
        if (payload?.onSuccess) {
          payload?.onSuccess(response.data.data);
        }
        if (!payload.second) {
          toast.success("Placement created successfully");
        }
        if (payload.second)
          toast.success("Second placement created successfully");
        return {
          ...response?.data?.data,
          placementsList: response2?.data?.data,
        };
      }
    } catch (err) {
      console.log("err?.response?.data", err?.response?.data);
      throw new Error(
        err?.response?.data?.err?.errors?.length > 0
          ? err?.response?.data?.err?.errors[0]?.message
          : "Something went wrong"
      );
    }
  }
);

// Thunk action to fetch placements
export const getPlacement = createAsyncThunk(
  "placementSlice/getPlacement",
  async (payload) => {
    try {
      const response = await axios.get(
        `/placements?campaign_public_identifier=${payload.public_identifier}&status=active`
      );
      if (payload?.onSuccess) {
        payload?.onSuccess();
      }
      return response?.data?.data;
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data);
      throw err?.response?.data;
    }
  }
);

// Thunk action to fetch detailed placements
export const getDetailedPlacements = createAsyncThunk(
  "placementSlice/getDetailedPlacements",
  async (payload) => {
    try {
      const response = await axios.get(
        `/placements?campaign_public_identifier=${payload.public_identifier}&status=active`
      );
      if (payload?.onSuccess) {
        payload?.onSuccess();
      }
      const requests = [];
      response.data.data.forEach((element) => {
        requests.push(axios.get(`/placements/${element.public_identifier}`));
      });
      const responses = await Promise.all(requests);
      const data = [];
      responses.forEach((elem) => {
        data.push(elem.data.data);
      });
      return data;
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data);
      throw err?.response?.data;
    }
  }
);

// Thunk action to fetch a single placement
export const getSinglePlacement = createAsyncThunk(
  "placementSlice/getSinglePlacement",
  async (payload) => {
    try {
      if (payload.statePlacement) return payload.placement;
      const response = await axios.get(
        `/placements/view/${payload.public_identifier}`
      );
      if (payload?.onSuccess) {
        payload?.onSuccess();
      }
      return response?.data?.data;
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data);
      throw err?.response?.data;
    }
  }
);
