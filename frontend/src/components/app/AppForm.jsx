import React, {useState} from 'react';
import Navbar from "../Lab/Navbar";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../Lab/Footer";
import {useForm} from "../../hooks/useForm";
import axios from "axios";
import {url} from "../../helpers/urls";
import Swal from "sweetalert2";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBaseball, faCoins, faEarth, faGamepad, faMedkit, faUsers} from "@fortawesome/free-solid-svg-icons";

export const AppForm = () => {

    const navigate = useNavigate()

    const {token} = useSelector(state => state.auth)


    const [formAppValues, handleAppInputChange, handleAppInputChecked, reset] = useForm({
        title: '',
        version: '',
        type: '',
        SORequired: '',
        author: '',
        description: '',
        category: []
    });

    const {title, version, type, SORequired, author, category, description} = formAppValues


    const [img, setImg] = useState()
    const [app, setApp] = useState()
    const [imgLoaded, setImgLoaded] = useState(false)
    const [AppLoaded, setAppLoaded] = useState(false)
    const appDataFilled = !!title && !!version && !!type && !!SORequired && !!author && !!category.length && !!description
    const [hideButton, setHideButton] = useState(false)

    const validExtImg = ['png', 'jpeg', 'jpg', 'bmp']
    const validExtApp = 'vnd.android.package-archive'


    const handleApp = async (e) => {
        e.preventDefault();


        if (imgLoaded && AppLoaded && appDataFilled) {

            setHideButton(true)

            // UPLOAD IMG //
            let formData = new FormData();
            formData.append('file', img);
            console.log(Object.fromEntries(formData))

            const postImg = await axios.post(url + '/upload',

                formData,

                {
                    headers: {
                        token,
                        folder: 'app-imgs'
                    }
                }).catch(async function (error) {
                const body = await error.response.data
                await Swal.fire(body.message, '', 'error')
            })


            // UPLOAD APP //
            let formAppData = new FormData();
            formAppData.append('file', app);
            console.log(Object.fromEntries(formAppData))

            const postApp = await axios.post(url + '/upload',

                formAppData,
                {
                    headers: {
                        token,
                        folder: 'app',
                        validExt: ['apk']
                    }
                }).catch(async function (error) {
                const body = await error.response.data
                await Swal.fire(body.message, '', 'error')
            })

            // console.log(postImg);
            // console.log(postApp);


            // POST APP DATA //

            await axios.post(url + '/app', {
                title, version, type, SORequired, author, description, category,
                appPhoto: postImg.data.name,
                appUrl: postApp.data.name,
                size: app.size
            }, {
                headers: {token}
            }).then(async res => {
                console.log(res.data)
                if (res.data.ok)
                    await Swal.fire('Aplicación añadida satisfactoriamente', '', 'success')
                reset()
                navigate(`/app/${res.data.id}`, {replace: true});
                const ckeckedButtons = document.getElementsByName("category");
                for (const e of ckeckedButtons) {
                    e.checked = false;
                }
            }).catch(async function (error) {
                console.log(error)
                const body = await error.response.data.message
                await Swal.fire(body, '', 'error')
            })
        } else if (!imgLoaded) {
            await Swal.fire('Por favor, selecciona una imagen', '', 'warning')
        } else if (!AppLoaded) {
            await Swal.fire('Por favor, selecciona una aplicación', '', 'warning')
        } else {
            await Swal.fire('No pueden haber campos vacíos', '', 'warning')
        }
    }

    const handleAppChange = async (e) => {
        console.log(e.target.files[0])
        setApp(e.target.files[0])

        const checkExt = e.target.files[0].type.split('/')[1]

        if (validExtApp.includes(checkExt)) {
            setAppLoaded(true)
        } else {
            await Swal.fire(`Por favor, elija un formato de aplicación válido`, `formatos permitidos: ${validExtApp}`, 'error')
        }
    }

    const handleImgChange = async (e) => {
        console.log(e.target.files[0])
        setImg(e.target.files[0])

        const checkExt = e.target.files[0].type.split('/')[1]

        if (validExtImg.includes(checkExt)) {
            setImgLoaded(true)
        } else {
            await Swal.fire(`Por favor, elija un formato de imagen válida`, `Imágenes permitidas: ${validExtImg}`, 'error')
        }
    }

    return (
        <div className="outerShadow">
            <Navbar/>
            <div className="container_single">

                <article className="main grid_item_single">

                    <div className="app_form_container">
                        <div className="sign_tag">
                            <h2>Añadir Aplicación</h2>
                        </div>
                        <form onSubmit={handleApp}>

                            <div className="app_form_box">

                                <div className="app_inner_box">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Nombre de la aplicación"
                                        value={title}
                                        onChange={handleAppInputChange}
                                    />
                                </div>
                                <div className="app_inner_box">
                                    <input
                                        type="text"
                                        name="version"
                                        placeholder="Versión de la aplicación"
                                        value={version}
                                        onChange={handleAppInputChange}
                                    />
                                </div>
                                <div className="app_inner_box">
                                    <input
                                        type="text"
                                        name="type"
                                        placeholder="Tipo de aplicación"
                                        value={type}
                                        onChange={handleAppInputChange}
                                    />
                                </div>
                                <div className="app_inner_box">
                                    {/*<p className="tag_category">Categorías</p>*/}
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="deportes"
                                            onChange={handleAppInputChecked}
                                        />
                                        <span className="idea_category"><FontAwesomeIcon icon={faBaseball}/></span>
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="finanzas"
                                            onChange={handleAppInputChecked}
                                        />
                                        <span className="idea_category"><FontAwesomeIcon icon={faCoins}/></span>
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="salud"
                                            onChange={handleAppInputChecked}
                                        />
                                        <span className="idea_category"><FontAwesomeIcon icon={faMedkit}/></span>
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="familia"
                                            onChange={handleAppInputChecked}
                                        />
                                        <span className="idea_category"><FontAwesomeIcon icon={faUsers}/></span>
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="juego"
                                            onChange={handleAppInputChecked}
                                        />
                                        <span className="idea_category"><FontAwesomeIcon icon={faGamepad}/></span>
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="internet"
                                            onChange={handleAppInputChecked}
                                        />
                                        <span className="idea_category"><FontAwesomeIcon icon={faEarth}/></span>
                                    </label>
                                </div>
                                <div className="app_inner_box">
                                    <input
                                        type="text"
                                        name="SORequired"
                                        placeholder="Versión de android requerido"
                                        value={SORequired}
                                        onChange={handleAppInputChange}
                                    />
                                </div>
                                <div className="app_inner_box">
                                    <input
                                        type="text"
                                        name="author"
                                        placeholder="Autor"
                                        value={author}
                                        onChange={handleAppInputChange}
                                    />
                                </div>
                            </div>
                            <div className="app_inner_box">
                                <textarea
                                    name="description"
                                    rows="1"
                                    placeholder="Descripción de la aplicación"
                                    value={description}
                                    onChange={handleAppInputChange}
                                >
                                </textarea>
                            </div>
                            <div className="button_upload_container">
                                <div className="app_inner_box upload">
                                    <div className="upload_image">
                                        <input type="file"
                                               className="tag"
                                               id="imgFile"
                                               name="image"
                                               onChange={handleImgChange}
                                        />
                                        <label htmlFor="imgFile">
                                            Cargar imagen
                                        </label>
                                    </div>
                                </div>
                                <div className="app_inner_box upload">
                                    <div className="upload_image">
                                        <input
                                            type="file"
                                            className="tag"
                                            id="appFile"
                                            name="app"
                                            onChange={handleAppChange}
                                        />
                                        <label htmlFor="appFile">
                                            Cargar aplicación
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="app_inner_box">
                                {(!hideButton) ? <button>Subir</button> :
                                    <button className='uploading' disabled>Procesando</button>}
                            </div>
                        </form>
                    </div>

                </article>

            </div>
            <Footer/>

        </div>
    );
};