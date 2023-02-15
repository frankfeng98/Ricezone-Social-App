import { Navbar } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { logOut } from '../../actions';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class NavbarSection extends Component {
  handleClick = () => {
    this.props.logOut();
  }
  
  render() {
    return (
      <Navbar
    >
    <div className='flex my-2'>
      <img
      src="https://www.cmor-faculty.rice.edu/~rja2/icons/ardilla.jpg"
      className="mr-3 h-6 sm:h-9"
      alt="RiceZone Logo"
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      RiceZone
      </span>
    </div>
    <div>
      <Link to="/profile" className='py-2 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Profile</Link>
      <Link to="/" onClick={this.handleClick} className='py-2 mx-3 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Log Out</Link>
    </div>
    </Navbar>
    )
  }
}
const mapStateToProps = (state) => {
  return {
      avatar: state.avatar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logOut: () => dispatch(logOut())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarSection)