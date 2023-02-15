import { current } from '@reduxjs/toolkit';
import React from 'react'
import { connect } from 'react-redux'
import { useState } from 'react';
import EditComment from './EditComment';

export const Comment = (props) => {
  const [isShownEdit, setIsShownEdit] = useState(false);
  const handleClick = event => {
    setIsShownEdit(current => !current);
  }
  return (
    <div>
        <div className='my-2'>
            {props.comment.text}
            <button onClick={handleClick} className="py-2 mx-6 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Edit
          </button>
        </div>
        {isShownEdit && (
            <div>
              <EditComment articleId={props.articleId} comment={props.comment} />
            </div>
        )}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)