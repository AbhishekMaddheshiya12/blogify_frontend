import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { userExists, userNotExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";

const ProtectedRoutes = ({ children, user, redirect = "/login" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAutoLogin = async () => {
    useEffect(() => {
      axios
        .get("https://blogify-backend-1-porw.onrender.com/user/me", { withCredentials: true })
        .then((res) => dispatch(userExists(res.data.user)))
        .catch((err) => dispatch(userNotExists()));
    }, []);
  };
  handleAutoLogin();
  if (!user) {
    navigate(redirect);
  } else {
    return children ? children : <Outlet></Outlet>;
  }
};

export default ProtectedRoutes;
