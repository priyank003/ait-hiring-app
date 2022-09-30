import { createSlice } from "@reduxjs/toolkit";

const initialUserInfo = {
  email: "",
  name: "",
  userId: "",
  cookie: "",
  userAvater: "",
  role: "",
};

const userInfoSlice = createSlice({
  name: "userInfoState",
  initialState: initialUserInfo,
  reducers: {
    setUserInfoState(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.userId = action.payload.id;
      state.cookie = action.payload.cookie;
      state.role = action.payload.role;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice;
