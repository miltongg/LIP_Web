import React from 'react'
import Sidebar from "./Sidebar";
import MainScreen from "./MainScreen";
import Footer from "./Footer";
import Navbar from "./Navbar";

export const LabScreen = () => {
    return (
        <div className="outerShadow">
            <Navbar/>
            <div className="container">
                <MainScreen/>
                <Sidebar/>
                <Footer/>
            </div>
        </div>
    )
}
