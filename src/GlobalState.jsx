import React, { createContext, useState, useEffect } from "react";
import BooksAPI from "./api/BooksAPI";
import UserAPI from "./api/UserAPI";
import GenreAPI from "./api/GenreAPI";
// import ReviewAPI from './api/reviewAPI'
import API from "./api/serverAPI";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    console.log("global state firstLogin", firstLogin);
    const refreshToken = async () => {
      try {
        const res = await API.get("/user/refresh_token");
        console.log("global state refresh token", res);
        setToken(res.data.accesstoken);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (firstLogin) {
      const userToken = localStorage.getItem("userToken");
      setToken(userToken);

      setTimeout(refreshToken, 10 * 60 * 1000);
    }
  }, []);

  const state = {
    // token: [token, setToken],
    token,
    setToken,
    booksAPI: BooksAPI(),
    userAPI: UserAPI(token),
    genreAPI: GenreAPI(),
    // reviewAPI: ReviewAPI()
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
