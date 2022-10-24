import React from 'react';
import Navbar from "../Lab/Navbar";
import Footer from "../Lab/Footer";
import Sidebar from "../Lab/Sidebar";

const InteractionInfoScreen = () => {
    return (
        <div className="outerShadow">

            <Navbar/>

            <div className="container">

                <div>
                    <img src={require("../../img/imageinteract.png")} alt="imagen_interaccion" className="lab_img fadeIn" />
                    <div className="lab_container">

                        <p className="lab_p">
                            Permitirá la incorporación de visiones externas a las intendencias, con el objetivo de innovar al incorporar nuevas miradas en la administración pública para adoptar una perspectiva centrada en la ciudadanía de la localidad.
                        </p>
                    </div>
                </div>



                <Sidebar/>

                <Footer/>

            </div>


        </div>
    );
};

export default InteractionInfoScreen;
