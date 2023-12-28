import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface LoginResponse {
  isLoading: boolean;
  details: {
    token: string;
    username: string;
    id: string;
  };
}

export interface ILogin {
  password: string;
  username: string;
}

const initialState: LoginResponse = {
  isLoading: false,
  details: {
    token: "",
    username: "",
    id: ""
  }
};

export const login: any = createAsyncThunk(
  "auth/login",
  async (data: ILogin) => {
    const response = await axios.post("/auth/login", data);
    return response.data;
  },
);

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const AuthReducer = AuthSlice.reducer;