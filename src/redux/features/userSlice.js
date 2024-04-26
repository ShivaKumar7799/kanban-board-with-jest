import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    signInUser: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export default userSlice.reducer;
export const { signInUser } = userSlice.actions;
