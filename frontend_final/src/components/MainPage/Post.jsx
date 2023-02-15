import { Button } from 'flowbite-react'
import React from 'react'
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import AddComment from './AddComment';
import { Comment } from './Comment';
import EditArticle from './EditArticle';
import parse from 'html-react-parser';

const Post = ({post, user, time}) => {
  const [buttonComment, setButton] = useState('Show comment'); 
  const [isShown, setIsShown] = useState(false);
  const [isShownAddComment, setIsShownAddComment] = useState(false);
  const [isShownEdit, setIsShownEdit] = useState(false);
  let read_time = time.replace("T", " ");
  const handleClick = event => {
    setIsShown(current => !current);
    if (isShown) {
      setButton('Show comment');
    } else {
      setButton('Hide comment');
    }
  }

  const handleAddComment = event => {
    setIsShownAddComment(current => !current);
  }

  const handleEdit = event => {
    setIsShownEdit(current => !current);
  }

  return (
    <div className='bg-sky-100 rounded-lg m-3 p-4'>
      <div>{read_time}</div>
      <div className='font-bold text-lg italic'>Author: {user}</div>
      <div>{parse(post.image)}</div>
      <div>{post.text}</div>
      <button onClick={handleClick} className="py-2 my-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        {buttonComment}
      </button>
      <button onClick={handleAddComment} className="py-2 my-2 mx-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Comment
      </button>
      <button onClick={handleEdit} className="py-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Edit
      </button>
      {isShown && (
        <div className='bg-indigo-400 rounded-md p-5'>
          {post.comments.map((comment, index) => (
              <Comment key={index} comment={comment} articleId={post.pid}/>
          ))}
        </div>
      )}
      {isShownAddComment && (
        <div className='bg-indigo-400 rounded-md p-5'>
          <AddComment articleId={post.pid}/>
        </div>
      )}
      {isShownEdit && (
        <div>
          <EditArticle articleId={post.pid} author={post.author}/>
        </div>
      )}
      <Toaster /> 
    </div>
  )
}

export default Post