import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "./slices/leadsSlice";

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});
