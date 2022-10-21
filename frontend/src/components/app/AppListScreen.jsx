import React from 'react';
import Navbar from "../Lab/Navbar";
import Sidebar from "../Lab/Sidebar";
import Footer from "../Lab/Footer";
import {AppList} from "../app/AppList";


export const AppListScreen = () => {
    return (
        <div className="outerShadow">
            <Navbar/>
            <div className="container">
                <AppList/>
                <Sidebar/>
                <Footer/>
            </div>
        </div>
    )
}