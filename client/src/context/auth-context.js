import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  cookie: "",
  login: () => {},
  logout: () => {},
  setCookie: () => {},
});
