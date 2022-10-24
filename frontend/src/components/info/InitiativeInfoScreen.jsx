import React from 'react';
import Navbar from "../Lab/Navbar";
import Footer from "../Lab/Footer";
import Sidebar from "../Lab/Sidebar";

const InitiativeInfoScreen = () => {
    return (
        <div className="outerShadow">

            <Navbar/>

            <div className="container">

                <div>
                    <img src={require("../../img/imagen pestana iniciativa.jpg")} alt="imagen_iniciativa" className="lab_img fadeIn" />
                    <div className="lab_container">

                        <p className="lab_p">
                            El desarrollo del laboratorio de innovación publica  de la Universidad de Holguín, contribuirá a desplegar un pensamiento innovador en los actores involucrados que les condicionará la ejecución de un grupo de acciones estratégicas encaminadas a crear y aplicar novedosas ideas que solucionen problemas públicos y transformen de forma gradual la gestión interna de las instituciones públicas del territorio.
                        </p>
                    </div>
                </div>



                <Sidebar/>

                <Footer/>

            </div>


        </div>
    );
};

export default InitiativeInfoScreen;
