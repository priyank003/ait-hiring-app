import React, { Component, useContext } from "react";
import classes from "./Login.module.css";

import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useRef } from "react";
import useInput from "../../../hooks/use-input";
import Config from "../../../azure/auth/Config";
import { PublicClientApplication } from "@azure/msal-browser";
import { AuthContext } from "../../../context/auth-context";
import { userInfoActions } from "../../../store/userInfo-slice";
const Login = () => {
  const auth = useContext(AuthContext);
  let formIsValid = false;

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasEror: emailInputHasEror,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // reset: resetEmailInput,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: enteredPassword, // eslint-disable-next-line
    isValid: enteredPasswordIsValid, // eslint-disable-next-line
    hasEror: passwordInputHasEror,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler, // eslint-disable-next-line
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredRole, // eslint-disable-next-line
    isValid: enteredRoleIsValid, // eslint-disable-next-line
    hasEror: RoleInputHasEror, // eslint-disable-next-line
    valueChangeHandler: roleChangeHandler,
    inputBlurHandler: roleBlurHandler, // eslint-disable-next-line
    reset: resetroleInput,
  } = useInput((value) => value.trim() !== "");

  const emailInputRef = useRef();
  const selectInputRef = useRef();
  const loginHandler = async (e) => {
    // eslint-disable-next-line
    e.preventDefault();
    // window.open(
    //   "https://ait-hiring-app.vercel.app/api/auth/outlook/callback",
    //   "_self"
    // );

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/auth/login",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok === true) {
        const resData = await response.json();

        auth.login(resData.user_details.userId, resData.user_details.token);
      }
    } catch (err) {
      console.log(`Could not log in user ${err}`);
    }
  };

  if (enteredEmailIsValid && enteredPasswordIsValid && enteredRoleIsValid) {
    formIsValid = true;
  }

  return (
    <div className={classes.login}>
      <div className={classes["login-form"]}>
        <form onSubmit={loginHandler}>
          <div className={classes["form-div"]}>
            <h1 className={classes["form-heading"]}>
              Sign <span>in</span>{" "}
            </h1>

            <div className={classes["form-input"]}>
              <div className={classes["signup-req"]}>
                <p>Not registered yet ?</p> <Link to="/signup"> Sign-up</Link>
              </div>
              <div className={classes["input-cedentials"]}>
                <div className={`col-12 ${classes["input_field"]}`}>
                  <input
                    type="email"
                    placeholder="email"
                    onChange={emailChangeHandler}
                    value={enteredEmail}
                    className={
                      classes[`${emailInputHasEror ? "input-invalid" : ""}`]
                    }
                    onBlur={emailBlurHandler}
                  />
                  {emailInputHasEror && (
                    <p className={classes["eror-text"]}>email must include @</p>
                  )}
                </div>
                <div className={`col-12 ${classes["input_field"]}`}>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={passwordChangeHandler}
                    value={enteredPassword}
                    onBlur={passwordBlurHandler}
                  />
                  {passwordInputHasEror && (
                    <p className={classes["eror-text"]}>
                      password must not be empty
                    </p>
                  )}
                </div>
              </div>
              <div className={classes["input-dropdown"]}>
                <div className={`col-12 ${classes["input_field"]}`}>
                  <label htmlFor="">
                    <span>Login as</span>
                    <select
                      name="year"
                      id="year-select"
                      ref={selectInputRef}
                      onChange={roleChangeHandler}
                      value={enteredRole}
                      onBlur={roleBlurHandler}
                    >
                      <option value="">Select</option>
                      <option value="student">student</option>
                      <option value="admin">admin</option>
                    </select>
                  </label>
                  {RoleInputHasEror && (
                    <p className={classes["eror-text"]}>select branch</p>
                  )}
                </div>
              </div>

              <div className={classes["form-submit"]}>
                <button type="submit" disabled={!formIsValid}>
                  Log-in
                </button>
                {/* <button onClick={loginHandler}>Sign-in with outlook</button> */}
              </div>

              <div className={classes["forgot-password"]}>
                <p>Forgot your password ?</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
