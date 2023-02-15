import React, { Component } from 'react'
import { connect } from 'react-redux'
import { validation_profile } from './profile_validation';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import { updateProfile } from '../../actions';
import { UpdateProfile_put } from '../../reducers';

export class UpdateCurrentInfo extends Component {
  handleSubmit = (values, actions) => {
    this.props.updateProfile(values);
    actions.setSubmitting(false);
    actions.resetForm();
  }

  render() {
    return (
        <Formik
        initialValues={{ email: '', zipcode: '', password1: '', password2: '', image:''}}
        validationSchema={validation_profile}
        onSubmit={this.handleSubmit}
        >
          {({setFieldValue}) => (
            <Form className="flex flex-col justify-center bg-sky-100 rounded-lg p-10 mx-5">
            <div className='font-bold italic'>Update Your Profile</div>
    
            <div className="flex flex-col mb-2 block px-5">
              <label htmlFor="email">Email Address</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
            </div>
    
            <div className="flex flex-col mb-2 block px-5">
              <label htmlFor="zipcode">Zipcode</label>
              <Field name="zipcode" type="text" />
              <ErrorMessage name="zipcode" />
            </div>
    
            <div className='flex flex-col mb-2 block px-5'> 
              <label htmlFor="password1">Password</label>
              <Field name="password1" type="password" />
              <ErrorMessage name="password1" />
            </div>
    
            <div className="flex flex-col mb-2 block px-5">
              <label htmlFor="password2">Confirm Password</label>
              <Field name="password2" type="password" />
              <ErrorMessage name="password2" />
            </div>
            <label htmlFor="image" className='font-bold italic'>Upload new Profile picture: </label>
            <Field name="image" type="file" className="mt-1" value={undefined} onChange={(event) => {
              setFieldValue("image", event.currentTarget.files[0]);
            }}/>
    
            <button type="submit" className="w-20 my-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Update
            </button>
            </Form>
          )}
    </Formik>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (profile) => dispatch(UpdateProfile_put(profile))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCurrentInfo)