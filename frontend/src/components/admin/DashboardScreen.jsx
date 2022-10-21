import React from 'react';
import Footer from "../Lab/Footer";
import Navbar from "../Lab/Navbar";
import {UserDashboard} from "./UserDashboard";

export const DashboardScreen = () => {
    return (

        <div className="outerShadow">
            <Navbar/>
            <UserDashboard/>
            <Footer/>

        </div>

    )
}