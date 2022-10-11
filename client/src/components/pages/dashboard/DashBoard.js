import React, { useContext, useEffect, useState } from "react";
import classes from "./DashBoard.module.css";
import DashBoardNav from "./DashBoardNav";

import DashBoardCalendar from "./DashBoardCalendar";
import rocketicon from "../../../assets/logos/rocket.svg";
import interview from "../../../assets/logos/interview.svg";

import DashBoardPages from "./DashBoardPages";

import DashboardHeader from "./DashboardHeader";
import Drawer from "@mui/material/Drawer";
import useWindowDimensions from "../../../hooks/use-windowSize";
import { styled, useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { userInfoActions } from "../../../store/userInfo-slice";
import { AuthContext } from "../../../context/auth-context";

const drawerWidth = 340;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DashBoard = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 1200) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [width]);
  const [user, setUser] = useState();

  // useEffect(() => {
  //   const getUser = () => {
  //     fetch("http://localhost:8000/api/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           auth.login();

  //           dispatch(userInfoActions.setUserInfoState());
  //           return response.json();
  //         }
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         // dispatch(userInfoActions.setUserState(resObject.user));
  //         setUser(resObject.user);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();
  // }, []);

  // const cookieValue = document.cookie
  //   .split("; ")
  //   .find((row) => row.startsWith("authToken="))
  //   ?.split("=")[1];
  // dispatch(
  //   userInfoActions.setUserInfoState({
  //     cookie: cookieValue,
  //   })
  // );

  // const dataToken = cookieValue.split(".")[1];
  // const data = atob(dataToken);

  // const userdata = JSON.parse(data);

  // let dataObj = {
  //   id: userdata.id,
  //   name: userdata.name,
  //   email: userdata.email,
  //   cookie: cookieValue,
  //   role: userdata.role,
  // };

  // dispatch(userInfoActions.setUserInfoState(dataObj));

  return (
    <div className={classes.dashboard}>
      <div className={classes["dashboard-container"]}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant={width > 1200 ? "persistent" : ""}
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
        >
          <DashBoardNav
            onDrawerOpen={handleDrawerOpen}
            onDrawerClose={handleDrawerClose}
            open={open}
          />
        </Drawer>
        {/* <Main open={open}> */}
        <div className={classes["dashboard-main"]}>
          <DashboardHeader
            onDrawerOpen={handleDrawerOpen}
            onDrawerClose={handleDrawerClose}
            open={open}
          />
          <div className={classes["dashboard-main-container"]}>
            <div className={classes["main-left"]}>
              <DashBoardPages />
            </div>
            <div className={classes["main-right"]}>
              <DashBoardCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
