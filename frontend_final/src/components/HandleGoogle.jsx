import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { handleGoogleLogIn } from '../reducers';

const HandleGoogle = () => {
  const userValidated = useSelector(state => state.userValidated)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(handleGoogleLogIn())
  useEffect(() => {
    if (userValidated) {
        navigate("/main");
    }
  })
  const handleClick = () => {
    navigate("/");
  }
  return (
    <div>
        <div>Redirecting...</div>
        <div>This page will not actually redirect. Google Login is working on my local machine but not on heroku. Press button below to go back to main page.</div>
        <button type="button" onClick={handleClick} className="py-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Go back to landing page.</button>
    </div>
  )
}

export default HandleGoogle