import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from "../Lab/Navbar";
import Footer from "../Lab/Footer";
import {useForm} from "../../hooks/useForm";
// import validator from "validator";
import {useDispatch} from "react-redux";
// import {removeError, setError} from "../../actions/ui";
import Swal from "sweetalert2";
import {startRegister} from "../../actions/auth";

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    // const { msgError } = useSelector( state => state.ui)

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formValues;

    const handleRegister = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            return await Swal.fire('Las contraseñas no coinciden', '', 'warning')
        }

        dispatch(startRegister(name, email, password));
    }


    return (

        <div className="outerShadow">
            <Navbar/>
            <div className="container_single">

                <article className="main grid_item_single">

                    <div className="form_container">
                        <div className="sign_tag">
                            <h2>Registrar Usuario</h2>
                        </div>
                        <form onSubmit={handleRegister}>

                            {/*{*/}
                            {/*    msgError &&*/}
                            {/*    (*/}
                            {/*        <div className="msg_error">*/}
                            {/*            { msgError }*/}
                            {/*        </div>*/}
                            {/*    )*/}
                            {/*}*/}

                            <div className="inner_box">
                                <input
                                    type="name"
                                    name="name"
                                    placeholder="Nombre"
                                    value={name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="inner_box">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo"
                                    value={email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="inner_box password">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={handleInputChange}
                                />
                                <div className="show_pass_button"><i id="icon" className="fas fa-eye"></i></div>
                            </div>
                            <div className="inner_box password">
                                <input
                                    type="password"
                                    name="password2"
                                    id="password_confirm"
                                    placeholder="Confirmar contraseña"
                                    value={password2}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="inner_box">
                                <button>Registrar</button>
                            </div>
                            <div>
                                <Link to="/user/login">
                                    <p className="p_style">&iquest;Ya tienes una cuenta? Accede</p>
                                </Link>
                            </div>
                        </form>
                    </div>

                </article>

            </div>
            <Footer/>

        </div>
    )
}
