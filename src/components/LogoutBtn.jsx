import React from "react";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Button } from "./import.js";
import { useNavigate } from "react-router-dom";


const LogoutBtn = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/')
    });
  };
  return <button onClick={logoutHandler}   >
    Logout
  </button>
};

export default LogoutBtn;
