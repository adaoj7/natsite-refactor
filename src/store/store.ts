import authReducer from "./authReducer";
import { configureStore } from "@reduxjs/toolkit";
import { UnknownAction } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
