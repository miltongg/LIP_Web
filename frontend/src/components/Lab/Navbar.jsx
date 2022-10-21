import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {startLogout} from "../../actions/auth";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import {url} from "../../helpers/urls";

const Navbar = () => {

    const {token, role} = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const handleLogout = () => {
        axios.post(url + '/signout', {}, {
            headers: {token}
        }).then(function (res) {
            console.log(res)
            Swal.fire('Cerraste sesión', "", 'success')
        })
        dispatch(startLogout());

    }

    return (
        <div className="navbar_container">
            <header className="header">
                <NavLink to="/">
                    <img className="logo" src={require("../../img/Logo.png")} alt="Logo"/>
                </NavLink>
                <ul className="top_navbar">
                    <li><NavLink to="views/laboratorio.html">Laboratorio</NavLink></li>
                    <li><NavLink to="views/iniciativa.html">Iniciativa</NavLink></li>
                    <li><NavLink to="views/metodologia.html">Metodología</NavLink></li>
                    <li><NavLink to="views/interaccion.html">Interacción</NavLink></li>
                </ul>
            </header>

            <nav className="navbar">
                <ul className="bottom_navbar">
                    <NavLink to="/">
                        <li><span><i className="fas fa-home"></i> </span>Inicio</li>
                    </NavLink>
                    <NavLink to="/app/list">
                        <li><span><i className="fas fa-boxes"></i> </span>Aplicaciones</li>
                    </NavLink>
                    <NavLink to="views/projects.html">
                        <li><span><i className="fa fa-folder"></i> </span>Proyectos</li>
                    </NavLink>
                    <NavLink to="views/noticias.html">
                        <li><span><i className="fas fa-newspaper"></i> </span>Noticias</li>
                    </NavLink>
                    <div className="right_nav">
                        {
                            (role === 'admin') &&
                            <div>
                                <ul className="login">
                                    <li className="dropdownMenu">
                                        <NavLink to="#"><i className="fas fa fa-user-tie"></i> Admin&#9662;</NavLink>
                                        <ul className="drop_list">
                                            <NavLink to="/dashboard">
                                                <li className="first_child"><i
                                                    className="fas fa fa-clipboard-list"></i> Admininstrar
                                                </li>
                                            </NavLink>
                                            <NavLink to="/app/add">
                                                <li className="last_child"><i
                                                    className="fas fa fa-cloud-upload-alt"></i> Añadir aplicaci&oacute;n
                                                </li>
                                            </NavLink>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        }
                        {/*{*/}
                        {/*    (user.role === 'admin' || user.role === 'moderator') &&*/}


                        {/*}*/}

                        <div>
                            <ul className="login">
                                <li className="dropdownMenu">
                                    <NavLink to="#"><i className="fas fa-lightbulb"></i> Ideas&#9662; </NavLink>
                                    <ul className="drop_list">
                                        <NavLink to="/idea/add">
                                            <li className="first_child"><i className=""></i> Proponer Ideas</li>
                                        </NavLink>
                                        <NavLink to="/idea/list">
                                            <li className="last_child"><i className=""></i> Ideas Propuestas</li>
                                        </NavLink>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {
                            (!!token) && <NavLink to="/user/profile">
                                <li><i className="fas fa-id-card-alt"></i> Perfil</li>
                            </NavLink>
                        }

                        {
                            (!token) && <NavLink to="/user/register">
                                <li><span><i className="fas fa-user-check"></i> </span>Registrar</li>
                            </NavLink>
                        }
                        {
                            (!token) && <NavLink to="/user/login">
                                <li><span><i className="fas fa-user-check"></i> </span>Login</li>
                            </NavLink>
                        }

                        {
                            (!!token) && <NavLink to="/user/login" className="logout_button" onClick={handleLogout}>
                                <li>Logout</li>
                            </NavLink>
                        }

                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
