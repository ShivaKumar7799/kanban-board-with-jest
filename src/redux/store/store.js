import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import tasksSlice from "../features/tasksSlice";

export const reduxStore = configureStore({
  reducer: {
    user: userSlice,
    tasks: tasksSlice,
  },
});
