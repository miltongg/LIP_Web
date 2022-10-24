import React from 'react';
import Navbar from "../Lab/Navbar";
import Footer from "../Lab/Footer";
import Sidebar from "../Lab/Sidebar";

const MethodologyInfoScreen = () => {
    return (
        <div className="outerShadow">

            <Navbar/>

            <div className="container">

                <div>
                    <img src={require("../../img/imagen metodlogia de trabajo.jpg")} alt="imagen_metodologia" className="lab_img fadeIn" />

                </div>



                <Sidebar/>

                <Footer/>

            </div>


        </div>
    );
};

export default MethodologyInfoScreen;
