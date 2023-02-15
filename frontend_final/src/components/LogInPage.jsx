import React, { Component } from 'react'
import {LogInForm} from './LogInForm'
import NavbarSection from './Navbar';
import toast, { Toaster } from 'react-hot-toast';
import GoogleLogin from './GoogleLogin';

export default class LogInPage extends Component {
  render() {
    return (
        <div className='flex flex-col justify-center items-center gap-10'>
            <NavbarSection/>
            <LogInForm/>
            <GoogleLogin/>
            <Toaster/>
        </div>    
    );
  }
}

