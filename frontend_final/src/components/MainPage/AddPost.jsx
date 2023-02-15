import { Formik, Field, Form, ErrorMessage } from 'formik'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup';
import { addPosts } from '../../actions';
import { addArticles } from '../../reducers';

export class AddPost extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }
  handleSubmit =(values, actions) => {
    values['userId'] = this.props.userID;
    this.props.addPost(values);
    actions.setSubmitting(false);
    actions.resetForm();
  }

  render() {
    return (
        <Formik
            initialValues={{body: '', image: 'empty'}}
            validationSchema={Yup.object({
                body: Yup.string().required("Required")
            })}
            onSubmit={this.handleSubmit}
        >
            {({setFieldValue}) => (
                <Form className='bg-sky-100 rounded-lg p-10 m-3'>
                    <div className="flex flex-col mb-2 block">
                        <Field name="body" type="text" className="mt-1" placeholder="Add Your Contents Here"/>
                        <ErrorMessage name="body" />
                    </div>
                    <Field name="image" type="file" className="mt-1" value={undefined} onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                    }}/>
                    <div className='my-3'>
                        <button type="submit" className="py-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Add Post
                        </button>
                        <button type="reset" className="py-2 mx-4 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Cancel
                        </button>
                    </div>
                </Form>   
            )} 
        </Formik>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        userID: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (post) => dispatch(addArticles(post))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)