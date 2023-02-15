import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { addFollowers, getPosts } from '../../actions';
import toast from 'react-hot-toast';
import { addFollowers_put, fetchArticles } from '../../reducers';

export class AddFollower extends Component {
    handleSubmit =(values, actions) => {
        this.props.addFollower(values);
        this.checkFollower(values);
        actions.setSubmitting(false);
        actions.resetForm();
    }

    componentDidUpdate() {
        if (this.props.addError) {
            toast.error("Cannot add follower because already added or not found.");
        }
    }
    
    checkFollower(values) {
        if (this.props.user === values.follower) {
            toast.error("Cannot add oneself as follower.");
        } 
    }
    
    render() {
        return (
            <Formik
                initialValues={{follower: ''}}
                validationSchema={Yup.object({
                    follower:Yup.string().required("Required")
                })}
                onSubmit={this.handleSubmit}
            >
                <Form>
                    <div className="flex flex-col mb-2 block">
                        <Field name="follower" type="text" className="mt-1" placeholder="Add a follower"/>
                        <ErrorMessage name="follower" />
                    </div>
                    <button type="submit" className="py-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Add User
                    </button>
                </Form>    
            </Formik>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.currentUser,
    userList: state.userList,
    addError: state.followerAddError,
    toggle: state.toggle
})

const mapDispatchToProps = (dispatch) => {
    return {
        addFollower: (user) => dispatch(addFollowers_put(user)),
        updatePost: (user) => dispatch(fetchArticles(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFollower)