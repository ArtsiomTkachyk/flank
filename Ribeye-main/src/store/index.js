import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./slices/campaignSlice"
import placementReducer from "./slices/placementSlice"
import authReducer from "./slices/authSlice";
import dictionaryReducer from "./slices/dictionarySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    campaign: campaignReducer,
    placement: placementReducer,
    dictionary: dictionaryReducer
  },
});

export default store;
