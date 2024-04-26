import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    totalTasks: [],
  },
  reducers: {
    saveTasks: (state, action) => {
      state.totalTasks = action.payload;
    },
  },
});

export default tasksSlice.reducer;
export const { saveTasks } = tasksSlice.actions;
