import reducers from "./rootReducers";
import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(ApiSlice.middleware),
  devTools: true,
});
