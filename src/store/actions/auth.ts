import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "store";
import { getExpiration } from "utils/functions";

axios.defaults.baseURL = "https://expa.fly.dev";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const signIn = createAsyncThunk(
  "auth/login",
  async (
    {
      username,
      password,
    }: {
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await axios.post("auth/login", { username, password });

      if (result.status === 201) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        localStorage.setItem("refreshTokenExpiration", getExpiration());
      }

      return result.data.accessToken;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signUp = createAsyncThunk<
  void,
  {
    displayName: string;
    username: string;
    password: string;
  }
>(
  "auth/register",
  async ({ displayName, username, password }, { rejectWithValue }) => {
    try {
      await axios.post("/auth/register", { displayName, username, password });
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const refreshToken = createAsyncThunk<
  string,
  { refreshToken: string },
  { state: RootState }
>("auth/refresh", async ({ refreshToken }, { getState, rejectWithValue }) => {
  const { accessToken } = getState().auth;

  try {
    const result = await axios.post(
      "/auth/refresh",
      { refreshToken },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return result.data.accessToken;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    const { accessToken } = getState().auth;

    try {
      const { status } = await axios.get("/auth/logout", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("refreshTokenExpiration");
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
