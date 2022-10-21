import React from 'react';
import Navbar from "../Lab/Navbar";
import Sidebar from "../Lab/Sidebar";
import Footer from "../Lab/Footer";
import {IdeaList} from "./IdeaList";

export const IdeaListScreen = () => {
    return (
        <div className="outerShadow">
            <Navbar/>
            <div className="container">
                <IdeaList/>
                <Sidebar/>
                <Footer/>
            </div>
        </div>
    )
};
