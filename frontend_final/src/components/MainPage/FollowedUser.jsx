import { Button } from 'flowbite-react'
import React from 'react'
import parse from 'html-react-parser'

const FollowedUser = ({username, headline, avatar, handleRemove}) => {
  return (
    <div className='my-4'>
        <div>{parse(avatar)}</div>
        <div>{username}</div>
        <div className='italic font-bold'>{headline}</div>
        <button onClick={() => handleRemove({username})} className="py-2 my-1 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Remove
        </button>
    </div>
    
  )
}

export default FollowedUser