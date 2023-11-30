import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import setAuthHeader from "../../helpers/set-auth-token";
import { toast } from "react-toastify";

// Create the authentication slice
const authSlice = createSlice({
  initialState: {
    isAuthSet: false,
    token: null,
    loading: false,
  },
  name: "authSlice",
  reducers: {
    // Reducer to set the authentication token
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthSet = true;
    },
  },
  extraReducers: (builder) => {
    // Handle pending login request
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    })
      // Handle successful login response
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      // Handle login error
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || 'Something went wrong')
      })
  }
});

// Export the authentication reducer
export default authSlice.reducer;

// Export the setToken action
export const { setToken } = authSlice.actions;

// Create an async thunk for the login action
export const login = createAsyncThunk("authSlice/login", async (payload) => {
  try {
    const response = await axios.post(
      "/userauth/login/",
      payload
    );
    const token = response?.data?.data?.auth_token;

    // Set the authentication token in the request header
    setAuthHeader(token);

    return { token };
  } catch (err) {
    console.log(err);
    throw err?.response?.data;
  }
})
