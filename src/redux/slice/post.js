import axios from "../../axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Асинхронные экшены

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await axios.get(`/posts?${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, text, username, useravatar }) => {
    const { data } = await axios.post(`/posts/${postId}/comments`, {
      postId,
      text,
      useravatar,
      username,
    });
    return data;
  }
);

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async (postId) => {
    const { data } = await axios.get(`/posts/${postId}/comments`);
    return data;
  }
);

export const removeComments = createAsyncThunk(
  "posts/removeComments",
  async ({ postId, commentId, userId }) => {
    // Используйте axios для выполнения DELETE-запроса к вашему API
    await axios.delete(`/posts/${postId}/comments/${commentId}`);
    return { postId, commentId, userId }; // Возвращаем объект для использования в reducer
  }
);

// Начальное состояние
const initialState = {
  data: null,
  status: "loading", // "idle", "loading", "loaded", "error"
  comments: [],
};

// Слайс
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "loading";
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "error";
      })
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "loaded";
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.comments = [];
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "loaded";
        console.log("Fulfilled addComment:", action.payload);

        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = "error";
        state.comments = [];
      })
      .addCase(removeComments.pending, (state) => {
        state.status = "loaded";
      })
      .addCase(removeComments.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.commentId
        );
      })

      .addCase(removeComments.rejected, (state) => {
        state.status = "error";
      });
  },
});

// Экспорт редюсера и селекторов
export const { setUserId, logout } = postSlice.actions;
export const postReducer = postSlice.reducer;
export const postSelector = (state) => state.post; // Вы можете использовать этот селектор для получения всего состояния "post"
export const postPoster = (state) => state.post.data;
export const postComments = (state) => state.post.comments;

export const postStatus = (state) => state.post.status;
