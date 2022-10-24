import React, {useState} from 'react'
import Navbar from "../Lab/Navbar";
import Footer from "../Lab/Footer";
import {useForm} from "../../hooks/useForm";
import Swal from "sweetalert2";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {url} from "../../helpers/urls";
import {useNavigate} from "react-router-dom";

export const EditUserScreen = () => {

    // const { msgError } = useSelector( state => state.ui)

    // const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()


    const [passwordShown, setPasswordShown] = useState(false)
    const [passwordShown2, setPasswordShown2] = useState(false)


    const {name: userName, email: userEmail, username: userNick, token} = useSelector(state => state.auth)


    const [formValues, handleInputChange] = useForm({
        name: userName,
        email: userEmail,
        username: userNick,
        password: '',
        password2: ''
    })

    const {name, email, username, password, password2} = formValues;

    const handleEdit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            return Swal.fire('Las contraseñas no coinciden', '', 'warning')
        }

        axios.put(url + '/user', {
            name,
            email,
            username,
            password
        }, {
            headers: {
                token
            }
        }).then(async res => {
            console.log(res.data)
            await Swal.fire(res.data.message, '', 'success')
            navigate("/user/profile", {replace: true});
        }).catch(async error => {
            console.log(error)
            await Swal.fire(error.response.data.message, '', 'warning')
        })


        // if (isFormValid()) {
        //     console.log('Formulario correcto')
        // }
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const togglePassword2 = () => {
        setPasswordShown2(!passwordShown2)
    }

    // const isFormValid = () => {
    //
    //     if (name.trim().length === 0) {
    //         dispatch(setError('Se requiere un nombre'))
    //         return false
    //     } else if ( !validator.isEmail(email) ) {
    //         dispatch(setError('El correo no es correcto'))
    //         return false
    //     } else if (password !== password2) {
    //         dispatch(setError('Las contraseñas no coinciden'))
    //         return false
    //     }
    //     dispatch(removeError())
    //     return true
    // }

    return (

        <div className="outerShadow">
            <Navbar/>
            <div className="container_single">

                <article className="main grid_item_single">

                    <div className="form_container">
                        <div className="sign_tag">
                            <h2>Editar Usuario</h2>
                        </div>
                        <form onSubmit={handleEdit}>

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
                                    type="text"
                                    name="username"
                                    placeholder="Alias"
                                    value={username}
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
                                    type={passwordShown ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={handleInputChange}
                                />
                                <div onClick={togglePassword}>{!passwordShown ? <FontAwesomeIcon icon={faEye}/> :
                                    <FontAwesomeIcon icon={faEyeSlash}/>}</div>
                                <div className="show_pass_button"><i id="icon" className="fas fa-eye"></i></div>
                            </div>
                            <div className="inner_box password">
                                <input
                                    type={passwordShown2 ? "text" : "password"}
                                    name="password2"
                                    id="password_confirm"
                                    placeholder="Confirmar contraseña"
                                    value={password2}
                                    onChange={handleInputChange}
                                />
                                <div onClick={togglePassword2}>{!passwordShown2 ? <FontAwesomeIcon icon={faEye}/> :
                                    <FontAwesomeIcon icon={faEyeSlash}/>}</div>
                                <div className="show_pass_button"><i id="icon" className="fas fa-eye"></i></div>
                            </div>
                            <div className="inner_box">
                                <button>Actualizar</button>
                            </div>
                            {/*<div>*/}
                            {/*    <Link to="/user/login">*/}
                            {/*        <p className="p_style">&iquest;Ya tienes una cuenta? Accede</p>*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                        </form>
                    </div>

                </article>

            </div>
            <Footer/>

        </div>
    )
}
