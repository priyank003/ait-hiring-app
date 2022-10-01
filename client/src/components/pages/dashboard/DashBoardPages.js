import React from "react";
import Account from "./Account";

import DashBoardPosts from "./DashBoardPosts";

import { Switch, Route } from "react-router-dom";

import Chat from "./chats/Chat";
const DashBoardPages = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/dashboard/account">
          <Account />
        </Route>
      
      
        <Route path="/dashboard/chats">
          <Chat />
          {/* <Companies /> */}
        </Route>
        <Route path="/dashboard">
          <DashBoardPosts />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default DashBoardPages;
