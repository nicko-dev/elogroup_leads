import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const loginServer = createAsyncThunk(
  "auth/loginServer",
  async (loginInfo) => {
    return { status: res.status, data: res.data }
  }
);

const initialState = {
  profile: null,
  token: null,
};

export const auth = createSlice({
  name: "auth",
  initialState: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : initialState,
  reducers: {
    login: (state, action) => {
      state.profile = action.payload.profile;
      state.token = action.payload.token;
    },
    logout: () => {
      localStorage.clear();
      return initialState;
    },
  },
});

//action creators

export const { login, logout } = auth.actions;

export default auth.reducer;
