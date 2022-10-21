import React, { useState, useEffect, useCallback, useContext } from "react";
import "./App.css";
import Header from "./components/pages/home/Header";
import Landing from "./components/pages/home/Landing";

import Signup from "./components/pages/auth/Signup";
import Login from "./components/pages/auth/Login";
import DashBoard from "./components/pages/dashboard/DashBoard";

import { Switch, Route, useHistory } from "react-router-dom";
import Footer from "./components/pages/home/Footer";
import Highlights from "./components/pages/home/Highlights";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "./context/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { userInfoActions } from "./store/userInfo-slice";

function App() {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const history = useHistory();
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }
  const { width } = useWindowDimensions();

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  const [isLogged, setLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback(async (uid, token) => {
    setToken(token);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token })
    );
    setUserId(uid);

    if (uid) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/user/profile/${uid}`
      );
      const resData = await response.json();
      dispatch(userInfoActions.setUserInfoState(resData));
      history.push("/dashboard");
    }
  }, []);

  //useffect always runs after the render cycle
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);



  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, userId, token, login, logout }}
    >
      <div>
        <div className="App">
          <Switch>
            <Route path="/signup">
              <Header />
              <Signup />
            </Route>

            <Route path="/login">
              <Header />
              <Login />
            </Route>
            {token && (
              <Route path="/dashboard">
                <DashBoard />
              </Route>
            )}

            <Route path="/">
              <Header />
              <Landing />

              <Highlights />
              <Footer />
              {width < 460 ? <Footer /> : ""}
            </Route>
          </Switch>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
