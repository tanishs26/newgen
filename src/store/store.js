import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../store/authSlice.js";
const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});

export default store;
