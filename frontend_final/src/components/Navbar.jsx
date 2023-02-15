import React from 'react'
import { Navbar } from 'flowbite-react'

const NavbarSection = () => {
  return (
    <Navbar
    fluid={true}
    rounded={true}
    >
    <Navbar.Brand>
        <img
        src="https://www.cmor-faculty.rice.edu/~rja2/icons/ardilla.jpg"
        className="mr-3 h-6 sm:h-9"
        alt="RiceZone Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        RiceZone
        </span>
    </Navbar.Brand>
    <Navbar.Toggle />
    </Navbar>   
  )
}

export default NavbarSection