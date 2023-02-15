import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { editArticle, editComment } from '../../reducers';
import toast from 'react-hot-toast';

export class EditComment extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit =(values, actions) => {
        values['pid'] = this.props.articleId;
        values['commentId'] = this.props.comment.commentId;
        let commentText = this.props.comment.text;
        let commentUser = commentText.split(':')
        if (this.props.user === commentUser[0]) {
            this.props.editComment(values);
        } else {
            toast.error("You can only edit your comment.")
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
                        <Field name="text" type="text" className="mt-1" placeholder="Edit your comment here."/>
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

const mapDispatchToProps = (dispatch) => ({
    editComment: (payload) => dispatch(editComment(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)