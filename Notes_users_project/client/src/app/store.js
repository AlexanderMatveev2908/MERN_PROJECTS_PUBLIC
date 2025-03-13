import { configureStore } from "@reduxjs/toolkit";
import { api_slice } from "./api/api_slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import auth_reducer from "../features/auth/auth_slice";

export const store = configureStore({
  reducer: {
    [api_slice.reducerPath]: api_slice.reducer,
    auth: auth_reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api_slice.middleware]),
  devTools: true,
});

setupListeners(store.dispatch);
