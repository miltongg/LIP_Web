import React from 'react';
import Navbar from "../Lab/Navbar";
import Footer from "../Lab/Footer";
import Sidebar from "../Lab/Sidebar";

const LaboratoryInfoScreen = () => {
  return (
      <div className="outerShadow">

        <Navbar/>

          <div className="container">

              <div>
                  <img src={require("../../img/imagen pestana laboratorio.jpg")} alt="imagen_laboratorio" className="lab_img fadeIn" />
                      <div className="lab_container">

                          <p className="lab_p">
                              Los laboratorios de innovación pública son espacios flexibles, dinámicos y modernos, que
                              han incorporado las tecnologías de la información y comunicación en su gestión operativa.
                              Tienen su foco de atención en la solución a los problemas internos de la administración
                              pública y en los que se generan en la sociedad. Su finalidad es experimentar para producir
                              valor público para con la ciudadanía.
                          </p>
                      </div>
              </div>



              <Sidebar/>

              <Footer/>

          </div>


      </div>
  );
};

export default LaboratoryInfoScreen;
