import authReducer from "./authReducer";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: authReducer,
});
