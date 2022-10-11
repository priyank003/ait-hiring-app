import React, { useEffect, useState } from "react";
import classes from "./Account.module.css";
import userImg from "../../../assets/images/user/cheerful-curly-business-girl-wearing-glasses.jpg";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";
// eslint-disable-next-line
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const Account = () => {
  const [userData, setUserData] = useState([]);

  const imageInputHandler = (id, file, fileIsValid) => {
    console.log(file);
  };
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <div className={classes.account}>
      <div className={classes["account-container"]}>
        <div className={classes["account-header"]}>
          {/* <ImageUpload onInput={imageInputHandler} /> */}
          <div className={classes["user-img"]}>
            <NavLink to="/dashboard/chats">
              <ChatIcon />
            </NavLink>
          </div>
          <div className={classes["user-credentials"]}>
            <div className={classes["user-id"]}>
              <h1>{userInfo.regId}</h1>
            </div>
            <div className={classes["user-name"]}>
              <h1>
                {userInfo.username} {userInfo.lastname}
              </h1>
            </div>
          </div>
        </div>
        <div className={classes["account-details"]}>
          <div className={classes["user-email"]}>
            {" "}
            <p>{userInfo.email}</p>
          </div>
          {/* <div className={classes["user-study"]}>
            <div className={classes["user-year"]}>
              <h2>SE</h2>
            </div>
            <div className={classes["user-stream"]}>
              <h2>Computer Science</h2>
            </div>
          </div> */}
        </div>

        <div className={classes["account-adverstisement"]}>
          <div className={classes["adv-heading"]}>
            <h1>For AIT exclusive interview experience</h1>
          </div>
          <div className={classes["adv-link"]}>
            <a href="https://anubhav.aitoss.club/"> Take me there</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
