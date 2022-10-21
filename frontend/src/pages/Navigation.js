import {Link, NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faClipboardList, faCloudUploadAlt,
    faHome, faIcons, faIdCardClip, faUserCheck, faUserPlus, faUserTie
} from "@fortawesome/free-solid-svg-icons";

// import Signout from "./Signout";

export default function Navigation() {

    return (
        <div className="navbar_container">
            <header className="header">
                <NavLink to="/"><img className="logo" src="/img/Logo.png" alt="Logo"/> </NavLink>
                <ul className="top_navbar">
                    <li><NavLink to="/laboratorio.html">Laboratorio</NavLink></li>
                    <li><NavLink to="/iniciativa.html">Iniciativa</NavLink></li>
                    <li><NavLink to="/metodologia.html">Metodología</NavLink></li>
                    <li><NavLink to="/interaccion.html">Interacción</NavLink></li>
                </ul>
            </header>
            <nav className="navbar">
                <ul className="bottom_navbar">
                    <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="/">
                        <li><FontAwesomeIcon icon={faHome}/> Inicio</li>
                    </NavLink>
                    <NavLink to="/list.html">
                        <li><FontAwesomeIcon icon={faIcons}/> Aplicaciones</li>
                    </NavLink>
                    <li>Proyectos</li>
                    <li>Noticias</li>
                    <div className="right_nav">
                        <div>
                            <ul className="login">
                                <li className="dropdownMenu">
                                    <Link to="#"><FontAwesomeIcon icon={faUserTie}/> Admin</Link>
                                    <ul className="drop_list">
                                        <NavLink to="/dashboard">
                                            <li className="first_child"><FontAwesomeIcon
                                                icon={faClipboardList}/> Admininstrar
                                            </li>
                                        </NavLink>
                                        <NavLink to="#">
                                            <li className="last_child"><FontAwesomeIcon icon={faCloudUploadAlt}/> Añadir
                                                aplicaci&oacute;n
                                            </li>
                                        </NavLink>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <NavLink to="/profile">
                            <li><FontAwesomeIcon icon={faIdCardClip}/> Perfil</li>
                        </NavLink>
                        <NavLink to="/signup">
                            <li><FontAwesomeIcon icon={faUserPlus}/> Registrar</li>
                        </NavLink>
                        <NavLink to="/signin">
                            <li><FontAwesomeIcon icon={faUserCheck}/> Ingresar</li>
                        </NavLink>
                        <Link to="#">
                            {/*<Signout/>*/}
                        </Link>
                    </div>
                </ul>
            </nav>
        </div>
    )

}