import SideBar from "./SideBar";
import "../css/style.css";
import "../css/animation.css";
import Footer from "./Footer";

export default function HomePage() {

    return (

        <div className="container">

            <article className="main grid_item">

                {/*<div className="slider_box">*/}
                {/*  <section className="slider" id="slider-container">*/}

                {/*    <div className="slider_images" id="slider-js"></div>*/}

                {/*    <div className="slider_navigation" id="slider-navigation"></div>*/}

                {/*  </section>*/}
                {/*</div>*/}

                <div className="band_info">
                    <p>Noticias más recientes</p>
                </div>

                <div className="news_box">

                    <div className="news">
                        <div className="icon_box">
                            <img className="news_icon" src="/img/premios-720x380.jpg" alt="premios"/>
                        </div>
                        <div className="news_description">
                            <p className="news_title">
                                Proyectos del Laboratorio de Gobierno, la ECLAP y el Cabildo de la Palma ganadores de
                                los Premios
                                NovaGob Excelencia 2022
                            </p>

                            Tras la deliberación del jurado, ya conocemos los proyectos que han resultado ganadores en
                            esta edición de
                            los premios NovaGob en las tres categorías que quedaban por decidir.
                        </div>

                    </div>

                    <div className="news">
                        <div className="icon_box">
                            <img className="news_icon" src="/img/WhatsApp-Image-2022-05-20-at-12.17.25-PM-720x380.jpeg"
                                 alt="noticias"/>
                        </div>
                        <div className="news_description">
                            <p className="news_title">
                                La Fundación NovaGob y el Ayuntamiento de Riba-Roja formarán a más de cien personas
                                empleadas públicas
                                en innovación y transparencia en la segunda edición de SKILLS 2030
                            </p>

                        </div>

                    </div>


                    <div className="news">
                        <div className="icon_box">
                            <img className="news_icon" src="/img/WhatsApp-Image-2022-04-26-at-1.37.20-PM-930x620.jpg"
                                 alt="noticias"/>
                        </div>
                        <div className="news_description">
                            <p className="news_title">
                                OTORGAN EL PREMIO U-GOB A LA INNOVACIÓN PÚBLICA 2022 AL #GEM.
                            </p>

                            • Entregan premio por la elaboración del Atlas de Género del Estado de México.
                            <br/>
                            • Señalan que es una herramienta de información estadística y geográfica con enfoque de
                            derechos humanos
                            y perspectiva de género.
                        </div>

                    </div>


                </div>

                <div className="band_info">
                    <p>Ultimas Aplicaciones</p>
                </div>

                <div className="dev_apps_box">

                    <div className="dev_app">
                        <div className="icon_box">
                            <img className="dev_app_icon" src="/img/Imgen%20de%20Test%20Cosntitucional.png"
                                 alt="app_icon"/>
                            <p>Test Constitucional</p>
                        </div>
                        <div className="dev_app_description">
                            Producto informático para sistema Androide, basado en el uso de las TIC en el proceso de
                            Enseñanza-Aprendizaje que permite a servidores públicos y ciudadanos profundizar los
                            conocimientos
                            relacionados con la Constitución de la República de Cuba
                        </div>

                    </div>

                    <div className="dev_app">
                        <div className="icon_box">
                            <img className="dev_app_icon"
                                 src="/img/imagen%20de%20multimedia%20participacion%20ciudadana.png"
                                 alt="app_icon"/>
                            <p>Multimedia educativa de participación ciudadana</p>
                        </div>
                        <div className="dev_app_description">
                            Producto informático de escritorio que agrupa elementos de la participación ciudadana cubana
                            en
                            contribución a la profundización del contenido de leyes y decretos.
                        </div>
                    </div>

                </div>

                <div className="band_info">
                    <p>Aplicaciones en Desarrollo</p>
                </div>

                <div className="dev_apps_box">

                    <div className="dev_app">
                        <div className="icon_box">
                            <img className="dev_app_icon" src="/img/medioambiente.png" alt="app_icon"/>
                            <p>Medio ambiente</p>
                        </div>
                        <div className="dev_app_description">
                            Aplicación móvil que provee información sobre la ley de medio ambiente
                        </div>

                    </div>

                    <div className="dev_app">
                        <div className="icon_box">
                            <img className="dev_app_icon" src="/img/bandera.png" alt="app_icon"/>
                            <p>Símbolos patrios</p>
                        </div>
                        <div className="dev_app_description">
                            Aplicación móvil que provee información sobre la ley de los símbolos patrios
                        </div>
                    </div>

                    <div className="dev_app">
                        <div className="icon_box">
                            <img className="dev_app_icon" src="/img/seguridad_alimentaria.jpg" alt="app_icon"/>
                            <p>Seguridad alimentaria</p>
                        </div>
                        <div className="dev_app_description">
                            Aplicación móvil que provee información sobre la ley de seguridad alimentaria
                        </div>
                    </div>

                </div>


            </article>

            <SideBar/>

            <Footer/>

        </div>

    )
}