import React from 'react'
import { Navbar } from 'flowbite-react'
import { Link } from 'react-router-dom'

const NavbarProfile = () => {
  return (
    <Navbar>
    <div className='flex'>
        <img
            src="https://www.cmor-faculty.rice.edu/~rja2/icons/ardilla.jpg"
            className="mr-3 h-6 sm:h-9"
            alt="RiceZone Logo"
            />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            RiceZone
        </span>
    </div>
        <Link to="/main" className='w-50 my-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Go back to Main Page</Link>
    </Navbar>   
  )
}

export default NavbarProfile