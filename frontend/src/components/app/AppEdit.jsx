import React, {useState} from 'react';
import Navbar from "../Lab/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import Footer from "../Lab/Footer";
import {useForm} from "../../hooks/useForm";
import axios from "axios";
import {url} from "../../helpers/urls";
import Swal from "sweetalert2";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBaseball, faCoins, faEarth, faGamepad, faMedkit, faUsers} from "@fortawesome/free-solid-svg-icons";

export const AppEdit = ({appData}) => {

    const navigate = useNavigate()

    const {token} = useSelector(state => state.auth)

    const {appId} = useParams();

    const [formAppValues, handleAppInputChange, handleAppInputChecked, reset] = useForm({
        title: appData.title,
        version: appData.version,
        type: appData.type,
        SORequired: appData.SORequired,
        author: appData.author,
        description: appData.description,
        category: appData.category
    }, appData.category);

    let isChecked = {
        family: false,
        sport: false,
        health: false,
        game: false,
        finance: false,
        internet: false
    }

    const {title, version, type, SORequired, author, category, description} = formAppValues


    console.log(title);

    const [img, setImg] = useState()
    const [app, setApp] = useState()
    // const [imgLoaded, setImgLoaded] = useState(false)
    // const [AppLoaded, setAppLoaded] = useState(false)
    // const appDataFilled = !!title && !!version && !!type && !!SORequired && !!author && !!category.length && !!description
    const [hideButton, setHideButton] = useState(false)

    const validExtImg = ['png', 'jpeg', 'jpg', 'bmp']
    const validExtApp = 'vnd.android.package-archive'

    let postApp;
    let postImg;


    const handleApp = async (e) => {
        e.preventDefault();


        // if (imgLoaded && AppLoaded && appDataFilled) {

        setHideButton(true)


        // UPLOAD IMG //
        if (!!img) {
            let formData = new FormData();
            formData.append('file', img);
            console.log(Object.fromEntries(formData))

            postImg = await axios.post(url + '/upload',

                formData,

                {
                    headers: {
                        token,
                        folder: 'app-imgs',
                        updating: true
                    }
                }).catch(async function (error) {
                const body = await error.response.data
                await Swal.fire(body.message, '', 'error')
            })
        }


        // UPLOAD APP //
        if (!!app) {
            let formAppData = new FormData();
            formAppData.append('file', app);
            console.log(Object.fromEntries(formAppData))

            postApp = await axios.post(url + '/upload',

                formAppData,
                {
                    headers: {
                        token,
                        folder: 'app',
                        validExt: ['apk'],
                        updating: true
                    }
                }).catch(async function (error) {
                const body = await error.response.data
                await Swal.fire(body.message, '', 'error')
            })
        }

        // POST APP DATA //

        await axios.put(url + '/app', {
            title, version, type, SORequired, author, description, category,
            appPhoto: postImg?.data.name,
            appUrl: postApp?.data.name
        }, {
            headers: {
                token,
                id: appId
            }
        }).then(async res => {
            console.log(res.data)
            if (res.data.ok)
                await Swal.fire('Aplicación editada satisfactoriamente', '', 'success')
            reset()
            navigate(`/app/${appId}`, {replace: true});
            const ckeckedButtons = document.getElementsByName("category");
            for (const e of ckeckedButtons) {
                e.checked = false;
            }
        }).catch(async function (error) {
            console.log(error)
            const body = await error.response.data.message
            await Swal.fire(body, '', 'error')
        })
        // } else if (!imgLoaded) {
        //     await Swal.fire('Por favor, selecciona una imagen', '', 'warning')
        // } else if (!AppLoaded) {
        //     await Swal.fire('Por favor, selecciona una aplicación', '', 'warning')
        // } else {
        //     await Swal.fire('No pueden haber campos vacíos', '', 'warning')
        // }
    }

    const handleAppChange = async (e) => {
        console.log(e.target.files[0])
        setApp(e.target.files[0])

        // const checkExt = e.target.files[0].type.split('/')[1]
        //
        // if (validExtApp.includes(checkExt)) {
        //     setAppLoaded(true)
        // } else {
        //     await Swal.fire(`Por favor, elija un formato de aplicación válido`, `formatos permitidos: ${validExtApp}`, 'error')
        // }
    }

    const handleImgChange = async (e) => {
        console.log(e.target.files[0])
        setImg(e.target.files[0])

        // const checkExt = e.target.files[0].type.split('/')[1]
        //
        // if (validExtImg.includes(checkExt)) {
        //     setImgLoaded(true)
        // } else {
        //     await Swal.fire(`Por favor, elija un formato de imagen válida`, `Imágenes permitidas: ${validExtImg}`, 'error')
        // }
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
                                        {(category.includes('deportes')) && (isChecked.sport = true)}
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="deportes"
                                            onChange={handleAppInputChecked}
                                            checked={isChecked.sport}
                                        />
                                        <span className="idea_category"><FontAwesomeIcon icon={faBaseball}/></span>
                                    </label>
                                    <label>
                                        {(category.includes('finanzas')) && (isChecked.finance = true)}
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="finanzas"
                                            onChange={handleAppInputChecked}
                                            checked={isChecked.finance}
                                        />
                                        <span className="idea_category"><FontAwesomeIcon icon={faCoins}/></span>
                                    </label>
                                    <label>
                                        {(category.includes('salud')) && (isChecked.health = true)}
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="salud"
                                            onChange={handleAppInputChecked}
                                            checked={isChecked.health}
                                        />
                                        <span className="idea_category"><FontAwesomeIcon icon={faMedkit}/></span>
                                    </label>
                                    <label>
                                        {(category.includes('familia')) && (isChecked.family = true)}
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="familia"
                                            onChange={handleAppInputChecked}
                                            checked={isChecked.family}
                                        />
                                        <span className="idea_category"><FontAwesomeIcon icon={faUsers}/></span>
                                    </label>
                                    <label>
                                        {(category.includes('juego')) && (isChecked.game = true)}
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="juego"
                                            onChange={handleAppInputChecked}
                                            checked={isChecked.game}
                                        />
                                        <span className="idea_category"><FontAwesomeIcon icon={faGamepad}/></span>
                                    </label>
                                    <label>
                                        {(category.includes('internet')) && (isChecked.internet = true)}
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value="internet"
                                            onChange={handleAppInputChecked}
                                            checked={isChecked.internet}
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
                                {(!hideButton) ? <button>Editar</button> :
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