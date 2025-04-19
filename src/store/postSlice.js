import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPost: [],
  userPost: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllPost: (state, action) => {
      state.allPost = action.payload;
    },
    setUserPost: (state, action) => {
      state.userPost = action.payload;
    },
    addPost: (state, action) => {
      state.allPost.unshift(action.payload);
      state.userPost.unshift(action.payload);
    },
    deletePost: (state, action) => {
      state.allPost = state.allPost.filter((p) => p.id != action.payload.id);
      state.userPost = state.userPost.filter((p) => p.id != action.payload.id);
    },
  },
});
