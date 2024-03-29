import React, { useState } from "react";
import classes from "./Signup.module.css";

import useInput from "../../../hooks/use-input";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
const Signup = (props) => {
  const auth = useContext(AuthContext);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasEror: nameInputHasEror,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasEror: emailInputHasEror,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // reset: resetEmailInput,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: enteredId,
    isValid: enteredIdIsValid,
    hasEror: idInputHasEror,
    valueChangeHandler: idChangeHandler,
    inputBlurHandler: idBlurHandler,
    // reset: resetIdInput,
  } = useInput((value) => value !== "");
  const {
    value: enteredlastName,
    isValid: enteredLastNameIsValid,
    hasEror: lastNameInputHasEror,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler, // eslint-disable-next-line
    reset: resetLastNameInput,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredYear,
    isValid: enteredYearIsValid,
    hasEror: YearInputHasEror,
    valueChangeHandler: yearChangeHandler,
    inputBlurHandler: yearBlurHandler, // eslint-disable-next-line
    reset: resetYearInput,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredbranch, // eslint-disable-next-line
    isValid: enteredBranchIsValid, // eslint-disable-next-line
    hasEror: branchInputHasEror, // eslint-disable-next-line
    valueChangeHandler: branchChangeHandler,
    inputBlurHandler: branchBlurHandler, // eslint-disable-next-line
    reset: resetbranchInput,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredRole, // eslint-disable-next-line
    isValid: enteredRoleIsValid, // eslint-disable-next-line
    hasEror: roleInputHasEror, // eslint-disable-next-line
    valueChangeHandler: roleChangeHandler,
    inputBlurHandler: roleBlurHandler, // eslint-disable-next-line
    reset: resetRoleInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword, // eslint-disable-next-line
    isValid: enteredPasswordIsValid, // eslint-disable-next-line
    hasEror: passwordInputHasEror,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler, // eslint-disable-next-line
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredConfirmPassword, // eslint-disable-next-line
    isValid: enteredConfirmPasswordIsValid, // eslint-disable-next-line
    hasEror: confirmPasswordInputHasEror,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler, // eslint-disable-next-line
    reset: resetConfirmPasswordInput,
  } = useInput((value) => value.trim() === enteredPassword);
  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredIdIsValid &&
    enteredYearIsValid &&
    enteredBranchIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    const userData = {
      username: enteredName,
      lastname: enteredlastName,
      firstname: enteredName,
      password: enteredPassword,
      year: enteredYear,
      branch: enteredbranch,
      email: enteredEmail,
      regId: enteredId,
      role: enteredRole,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
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

        auth.login(resData.user_data.userId, resData.user_data.token);
      }
    } catch (err) {
      console.log(`Could not sign up user ${err}`);
    }
  };

  // useEffect(() => {
  //   axios.get(`${baseURL}/1`).then((response) => {
  //     setPost(response.data);
  //   });
  // }, []);

  // function updatePost() {
  //   axios
  //     .post(`${baseURL}`, {
  //       username: `${enteredName}`,
  //       lastname: `${enteredlastName}`,
  //       firstname: `${enteredName}`,
  //       password: `${enteredPassword}`,
  //       year: `${enteredYear}`,
  //       branch: `${enteredbranch}`,
  //       email: `${enteredEmail}`,
  //       registration: `${enteredId}`,
  //     })
  //     .then((response) => {

  //       setPost(response.data);
  //     });
  // }

  return (
    <div className={classes.signUp}>
      <div className={classes["signup-form"]}>
        <form onSubmit={formSubmissionHandler}>
          <div className={classes["form-div"]}>
            <h1 className={classes["form-heading"]}>
              Sign <span>up</span>{" "}
            </h1>
            <div className={classes["form-input"]}>
              <div className={classes["input-name"]}>
                <div className={`${classes["input_field"]}`}>
                  <input
                    type="text"
                    placeholder="first name"
                    onChange={nameChangeHandler}
                    value={enteredName}
                    className={
                      classes[`${nameInputHasEror ? "input-invalid" : ""}`]
                    }
                    onBlur={nameBlurHandler}
                  />
                  {nameInputHasEror && (
                    <p className={classes["eror-text"]}>
                      Name must not be empty
                    </p>
                  )}
                </div>
                <div className={classes["input_field"]}>
                  <input
                    type="text"
                    placeholder="last name"
                    onChange={lastNameChangeHandler}
                    value={enteredlastName}
                    onBlur={lastNameBlurHandler}
                    className={
                      classes[`${lastNameInputHasEror ? "input-invalid" : ""}`]
                    }
                  />
                  {lastNameInputHasEror && (
                    <p className={classes["eror-text"]}>
                      last Name must not be empty
                    </p>
                  )}
                </div>
              </div>

              <div className={classes["input-cedentials"]}>
                <div className={`${classes["input_field"]}`}>
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
                <div className={`${classes["input_field"]}`}>
                  <input
                    type="text"
                    placeholder="Registered id"
                    onChange={idChangeHandler}
                    value={enteredId}
                    className={
                      classes[`${idInputHasEror ? "input-invalid" : ""}`]
                    }
                    onBlur={idBlurHandler}
                  />
                  {idInputHasEror && (
                    <p className={classes["eror-text"]}>id must be number</p>
                  )}
                </div>
              </div>

              <div className={classes["input-study"]}>
                <div className={`${classes["input_field"]}`}>
                  <label htmlFor="">
                    <span>Year</span>
                    <select
                      name="year"
                      id="year-select"
                      onChange={yearChangeHandler}
                      value={enteredYear}
                      onBlur={yearBlurHandler}
                    >
                      <option value="">Select</option>
                      <option value="third">TE</option>
                      <option value="fourth">BE</option>
                      <option value="ME">ME 2nd year</option>
                    </select>
                  </label>
                  {YearInputHasEror && (
                    <p className={classes["eror-text"]}>select year</p>
                  )}
                </div>
                <div className={`${classes["input_field"]}`}>
                  <label htmlFor="">
                    <span>Branch</span>

                    <select
                      name="branch"
                      id="branch-select"
                      onChange={branchChangeHandler}
                      value={enteredbranch}
                      onBlur={branchBlurHandler}
                    >
                      <option value="">Select</option>
                      <option value="comp">Computer Engeering</option>
                      <option value="it">Information Technology</option>
                      <option value="entc">Electronics</option>
                      <option value="meach">Mechanical engineering</option>
                    </select>
                  </label>
                  {branchInputHasEror && (
                    <p className={classes["eror-text"]}>select branch</p>
                  )}
                </div>
                <div className={`${classes["input_field"]}`}>
                  <label htmlFor="">
                    <span>Role</span>

                    <select
                      name="role"
                      id="role-select"
                      onChange={roleChangeHandler}
                      value={enteredRole}
                      onBlur={roleBlurHandler}
                    >
                      <option value="">Select</option>
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  </label>
                  {roleInputHasEror && (
                    <p className={classes["eror-text"]}>select role</p>
                  )}
                </div>
              </div>
              <div className={classes["input-password"]}>
                <div className={`col-12 ${classes["input_field"]}`}>
                  <input
                    type="password"
                    placeholder="set password"
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
                <div className={`col-12 ${classes["input_field"]}`}>
                  <input
                    type="password"
                    placeholder="confirm passwword"
                    onChange={confirmPasswordChangeHandler}
                    value={enteredConfirmPassword}
                    onBlur={confirmPasswordBlurHandler}
                  />
                  {confirmPasswordInputHasEror && (
                    <p className={classes["eror-text"]}>
                      password must be must be same as above
                    </p>
                  )}
                </div>
              </div>
              {/* <Link to="/login"> */}
              <div className={classes["form-submit"]}>
                <button type="submit" disabled={!formIsValid}>
                  Sign-up
                </button>
              </div>
              {/* </Link> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
