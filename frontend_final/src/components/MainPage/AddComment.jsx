import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { addComments } from '../../reducers';

export class AddComment extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit =(values, actions) => {
        values['pid'] = this.props.articleId;
        this.props.addComment(values);
        actions.setSubmitting(false);
        actions.resetForm();
    }  
    render() {
        return (
            <Formik
                initialValues={{comment: ''}}
                validationSchema={Yup.object({
                    comment:Yup.string().required("Required")
                })}
                onSubmit={this.handleSubmit}
            >
                <Form>
                    <div className="flex flex-col mb-2 block">
                        <Field name="comment" type="text" className="mt-1" placeholder="Add your comment"/>
                        <ErrorMessage name="comment" />
                    </div>
                    <button type="submit" className="py-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Add
                    </button>
                </Form>    
            </Formik>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (payload) => dispatch(addComments(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)