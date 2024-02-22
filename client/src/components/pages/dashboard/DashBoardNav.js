import React, { useContext } from "react";
import classes from "./DashBoardNav.module.css";
import AIT from "../../../assets/logos/AIT black logo.png";
import jobImg from "../../../assets/images/jobprofiles.svg";
import { Link, NavLink } from "react-router-dom";
import logoutIcon from "../../../assets/logos/logout_black_24dp.svg";
import { useDispatch, useSelector } from "react-redux";

import { sideNavActions } from "../../../store/sideNav-slice";
import { authActions } from "../../../store/auth-slice";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useWindowDimensions from "../../../hooks/use-windowSize";
import { AuthContext } from "../../../context/auth-context";
const DashBoardNav = ({ onDrawerOpen, onDrawerClose, open }) => {
  const auth = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  //logout redux
  const logoutHandler = () => {
    auth.logout();
  };

  //show sidenav redux

  const showSideNav = useSelector((state) => state.sideNav.show);

  const hideSideNavHandler = () => {
    // width < 460 && dispatch(sideNavActions.hideSideNav());
  };
  const handleDrawerOpen = () => {
    onDrawerOpen();
  };

  const handleDrawerClose = () => {
    onDrawerClose();
  };

  return (
    <div className={classes.dashBoardNav}>
      <div className={classes["nav-top"]}>
        <div className={classes["dashboard-nav-header"]}>
          {/* <img src={AIT} alt="" /> */}
          <h1>Hiring Cell</h1>
          {width < 1200 && (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </div>
        <div className={classes["dashboard-nav-links"]}>
          <NavLink
            to="/dashboard/posts"
            activeClassName={classes["active-link"]}
            onClick={hideSideNavHandler}
          >
            <div className={classes["nav-link"]}>DashBoard</div>
          </NavLink>

          <NavLink
            to="/dashboard/account"
            activeClassName={classes["active-link"]}
            onClick={hideSideNavHandler}
          >
            <div className={classes["nav-link"]}>Account</div>
          </NavLink>

          <NavLink
            to="/dashboard/chats"
            activeClassName={classes["active-link"]}
            onClick={hideSideNavHandler}
          >
            <div className={classes["nav-link"]}>Chats</div>
          </NavLink>
        </div>
      </div>
      <div className={classes["nav-bottom"]}>
        <div className={classes["dashboard-nav-img"]}>
          <img src={jobImg} alt="" />
        </div>
        <div className={classes["dashboard-nav-logout"]}>
          <h3>logout </h3>
          <Link to="/">
            <img src={logoutIcon} onClick={logoutHandler} alt="logout" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DashBoardNav;
