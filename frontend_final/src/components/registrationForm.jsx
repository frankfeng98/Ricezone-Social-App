import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from '../actions';
import store from "../store"
import { validation } from './validation';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../reducers';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const SignupForm = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.userValidated);
  const userExists = useSelector(state => state.userExisted);
  useEffect(() => {
    if (userExists) {
      toast.error("User exists. Please choose another name or login.");
    }
    if (isLoggedIn) {
      navigate("/main");
    }
  })
  return (
    <Formik
      initialValues={{ username: '', displayName: '', 
                       email: '', phone: '', dob: '', zipcode: '', password1: '', password2: ''}}
      validationSchema={ validation }
      onSubmit={(values, actions) => {
        dispatch(createUser(values));
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      <Form className="flex flex-col gap-2 w-100">
        <div className="flex mb-2 block">
          <div className="flex flex-col mb-2 block">
            <label htmlFor="username">User Name</label>
            <Field name="username" type="text" className="mt-1"/>
            <ErrorMessage name="username" />
          </div>

          <div className="flex flex-col mb-2 block">
            <label htmlFor="displayName">Display Name</label>
            <Field name="displayName" type="text" className="mt-1"/>
            <ErrorMessage name="displayName" />
          </div>
        </div>

        <div className="flex mb-2 block">
          <div className="flex flex-col mb-2 block">
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </div>

          <div className="flex flex-col mb-2 block">
            <label htmlFor="phone">Phone Number</label>
            <Field name="phone" type="tel" />
            <ErrorMessage name="phone" />
          </div>
        </div>

        <div className="mb-2 block">
          <div className="flex flex-col mb-2 block">
            <label htmlFor="dob">Date of Birth</label>
            <Field name="dob" type="date" />
            <ErrorMessage name="dob" />
          </div>

          <div className="flex flex-col mb-2 block">
            <label htmlFor="zipcode">Zipcode</label>
            <Field name="zipcode" type="text" />
            <ErrorMessage name="zipcode" />
          </div>
        </div>

        <div className="mb-2 block">
          <div className='flex flex-col mb-2 block'> 
            <label htmlFor="password1">Password</label>
            <Field name="password1" type="password" />
            <ErrorMessage name="password1" />
          </div>

          <div className="flex flex-col mb-2 block">
            <label htmlFor="password2">Confirm Password</label>
            <Field name="password2" type="password" />
            <ErrorMessage name="password2" />
          </div>
        </div>


        <button type="submit" className="w-50 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Register
        </button>
        <Link to={"./login"} className="w-50 flex justify-center items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Log In</Link>
      </Form>
    </Formik>
  );
};