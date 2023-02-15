import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { SignupForm } from "./registrationForm";
import NavbarSection from "./Navbar";
import { Toaster } from "react-hot-toast";

export default class LandingPage extends React.Component {
    render() {
        return (
            <>
            <div className="flex flex-col justify-center items-center gap-12">
                <NavbarSection />
                <SignupForm />
                <Toaster/>
            </div>
            </>
        );
    }
}

