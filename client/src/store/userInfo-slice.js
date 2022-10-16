import { createSlice } from "@reduxjs/toolkit";

const initialUserInfo = {
  userId: "",
  email: "",
  username: "",
  lastname: "",
  firstname: "",
  year: "",
  branch: "",
  regId: "",
  role: "",
};

const userInfoSlice = createSlice({
  name: "userInfoState",
  initialState: initialUserInfo,
  reducers: {
    setUserInfoState(state, action) {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.lastname = action.payload.lastname;
      state.firstname = action.payload.firstname;
      state.year = action.payload.year;
      state.branch = action.payload.branch;
      state.regId = action.payload.regId;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice;
