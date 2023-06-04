import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp, refreshToken, logout } from "../actions/auth";

const initialState: {
  loading: boolean;
  isLoggedIn: boolean;
  isRegistered: boolean;
  accessToken: string;
  userToken: null | string;
  error: null | string;
} = {
  loading: false,
  isLoggedIn: false,
  isRegistered: false,
  accessToken: "",
  userToken: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.accessToken = action.payload;
      state.isLoggedIn = true;
    },
    resetIsRegistered: (state) => {
      state.isRegistered = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.accessToken = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.isRegistered = false;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.isRegistered = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.accessToken = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.accessToken = "";
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUserLogin, resetIsRegistered } = authSlice.actions;

export default authSlice.reducer;
