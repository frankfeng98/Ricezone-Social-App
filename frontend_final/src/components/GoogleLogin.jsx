import React from 'react'
import { useDispatch } from 'react-redux'
import { googleLogIn } from '../reducers';

function GoogleLogin() {
  const dispatch = useDispatch();
  const HandleClick = () => {
    dispatch(googleLogIn());
  }
  return (
    <button onClick={HandleClick} type="button" className="py-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Log In With Google
    </button>
  )
}

export default GoogleLogin