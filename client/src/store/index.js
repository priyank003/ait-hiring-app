import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import loggedInSlice from "./loginAuth-slice";
import userInfoSlice from "./userInfo-slice";
import sideNavSlice from "./sideNav-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // auth: loggedInSlice.reducer,
    userInfo: userInfoSlice.reducer,
    sideNav: sideNavSlice.reducer,
  },
});

export default store;
