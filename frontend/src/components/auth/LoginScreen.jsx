import React from 'react'
import Navbar from "../Lab/Navbar";
import Footer from "../Lab/Footer";
import {useForm} from "../../hooks/useForm";
import {useDispatch} from "react-redux";
import {startLogin} from "../../actions/auth";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        email: '',
        password: ''
    });

    const {email, password} = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(email, password));
    }

    return (
        <div className="outerShadow">
            <Navbar/>

            <div className="container_single">

                <article className="main grid_item_single">

                    <div className="form_container">
                        <div className="sign_tag">
                            <h2>Iniciar Sesión</h2>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="inner_box">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Correo o Alias"
                                    value={email}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="inner_box password">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={handleLoginInputChange}
                                />
                                <div className="show_pass_button"><i id="icon" className="fas fa-eye"></i></div>
                            </div>
                            <div className="inner_box">
                                <button type="submit">
                                    Ingresar
                                </button>
                            </div>
                        </form>
                        <Link to="/user/register">
                            <p className="p_style">&iquest;No tienes una cuenta? Crea una</p>
                        </Link>
                    </div>

                </article>

            </div>
            <Footer/>
        </div>
    )
}
