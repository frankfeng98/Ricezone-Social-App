import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { editArticle } from '../../reducers';
import toast from 'react-hot-toast';

export class EditArticle extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit =(values, actions) => {
        values['pid'] = this.props.articleId;
        if (this.props.user === this.props.author) {
            this.props.editArticle(values);
        } else {
            toast.error("You can only edit your article.")
        }
        actions.setSubmitting(false);
        actions.resetForm();
    }  
    render() {
        return (
            <Formik
                initialValues={{text: ''}}
                validationSchema={Yup.object({
                    text:Yup.string().required("Required")
                })}
                onSubmit={this.handleSubmit}
            >
                <Form>
                    <div className="flex flex-col mb-2 block">
                        <Field name="text" type="text" className="mt-1" placeholder="Edit article here."/>
                        <ErrorMessage name="text" />
                    </div>
                    <button type="submit" className="py-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Edit
                    </button>
                </Form>    
            </Formik>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.currentUser
})

const mapDispatchToProps = (dispatch) => {
    return {
        editArticle: (payload) => dispatch(editArticle(payload))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle)