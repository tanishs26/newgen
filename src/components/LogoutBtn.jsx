import React from "react";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Button } from "./import.js";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return <button onClick={logoutHandler}   >
    Logout
  </button>
};

export default LogoutBtn;
