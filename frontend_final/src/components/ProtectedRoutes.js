import { Navigate, Outlet, useNavigate } from "react-router-dom";
import React, { Component, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import MainPage from "./MainPage/MainPage";

const Protected = (() => {
    const isAuthenticated = useSelector(state => state.userValidated);
    return (isAuthenticated ? <Outlet/> : <Navigate to='/'/>)
  });

export default Protected