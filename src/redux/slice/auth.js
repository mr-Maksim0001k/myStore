import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
  userName: null,
  avatar: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    //регистрациия
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
    //логин
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
    // моя авторизация
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
      state.userName = action.payload.fullName;
      state.avatar = action.payload.avatarUrl;
      state.userId = action.payload._id;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
  },
});

export const authReducer = authSlice.reducer;
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectIsAuthFullPost = (state) => state.auth.data;
export const { logout } = authSlice.actions;
export const selectUsername = (state) => state.auth.userName;
export const selectAvatar = (state) => state.auth.avatar;
export const selectUserId = (state) => state.auth.userId;
