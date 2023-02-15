import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { validateUsers, resetValidate } from '../actions';
import { logInUser } from '../reducers';
import toast, { Toaster } from 'react-hot-toast';


export const LogInForm = ({}) => {
    const isLoggedIn = useSelector(state => state.userValidated);
    const toggle = useSelector(state => state.toggle);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const HandleLogIn = (value) => {
        dispatch(logInUser(value));
    }
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/main');
        } else {
            toast.error('Log In Information incorrect.');
        }
    })
  return (
    <div>
        <Formik
            initialValues={{ username: '', password: ''}}
            validationSchema={Yup.object({
                username: Yup.string().required("Required"),
                password: Yup.string().required("Password required")
            })}
            onSubmit={(values, actions) => {
                HandleLogIn(values);
                actions.setSubmitting(false);
                actions.resetForm();
            }}
        >
            <Form>
                <div className="flex flex-col mb-2 block">
                    <div className="flex flex-col mb-2 block">
                        <label htmlFor="username">Account Name</label>
                        <Field name="username" type="text" className="mt-1"/>
                        <ErrorMessage name="username" />
                    </div>
                    <div className='flex flex-col mb-2 block'>
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" />
                    </div>
                    <button type="submit" className="py-2 my-3 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Log In
                    </button>
                </div>
            </Form>
        </Formik>
    </div>
    
  )
};

