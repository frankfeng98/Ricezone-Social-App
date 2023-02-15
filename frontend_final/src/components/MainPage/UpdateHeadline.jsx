import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateHeadline } from '../../actions';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { updateHeadline_post } from '../../reducers';

export class UpdateHeadline extends Component {
    handleSubmit =(values, actions) => {
        this.props.updateHeadline(values);
        actions.setSubmitting(false);
        actions.resetForm();
    }  
    render() {
        return (
            <Formik
                initialValues={{headline: ''}}
                validationSchema={Yup.object({
                    headline:Yup.string().required("Required")
                })}
                onSubmit={this.handleSubmit}
            >
                <Form>
                    <div className="flex flex-col mb-2 block">
                        <Field name="headline" type="text" className="mt-1" placeholder="Update your headline"/>
                        <ErrorMessage name="headline" />
                    </div>
                    <button type="submit" className="py-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Update
                    </button>
                </Form>    
            </Formik>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => {
    return {
        updateHeadline: (headline) => dispatch(updateHeadline_post(headline))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHeadline)