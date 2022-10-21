import React, {useEffect, useState} from 'react';
import Navbar from "../Lab/Navbar";
import Footer from "../Lab/Footer";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {url} from "../../helpers/urls";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBaseball, faCoins, faEarth, faGamepad, faMedkit, faUsers,
    faEye, faComment
} from "@fortawesome/free-solid-svg-icons";
import {Comments} from "../comment/Comments";
import {useSelector} from "react-redux";
import {Rating} from "react-simple-star-rating";
import Swal from "sweetalert2";


export const AppScreen = () => {

    const user = useSelector(state => state.auth)

    let navigate = useNavigate();

    const {appId} = useParams();

    const [app, setApp] = useState({})

    const [loadedApp, setLoadedApp] = useState(false)

    const [actRat, setActRat] = useState(false)

    // const [img, setImg] = useState('')

    useEffect(() => {
        axios.get(url + '/app', {
            headers: {
                id: appId,
                token: user?.token
            }
        }).then(({data}) => {
            console.log(data)
            setApp(data.data)
            setLoadedApp(true)
        }).catch(err => {
            console.log(err.message)
        })
    }, [appId, user?.token, actRat])

    const handleAppDelete = () => {

        Swal.fire({
            title: '¿Estas seguro de eliminar la aplicación?',
            text: "",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: '¡Si, eliminar!',
            denyButtonText: '¡No, cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url + '/app', {
                    headers: {
                        id: appId,
                        token: user.token
                    }
                }).then(async res => {
                    console.log(res.data)

                    await Swal.fire(
                        res.data.message,
                        '',
                        'success')
                    navigate('/app/list')
                })
            }
        })
    }

    const handleAppDownload = () => {

        axios.put(url + '/app', {

            download: 1

        }, {

            headers: {
                id: appId
            }

        }).then(() => {

            setActRat(!actRat)

        })

    }


    return (

        <div className="outerShadow">

            <Navbar/>

            <div className="container_single">

                <article className="idea_screen_container">

                    <div className="top_container">

                        <div className="left_container">

                            <div className="img_container">
                                {
                                    loadedApp &&
                                    <img className="app_icon" src={
                                        url + '/app-imgs/' + app.img
                                    } alt="app_icon"/>
                                }
                            </div>
                            <div className="top_left_data_container">
                                <p className="app_title">{app.title}</p>

                                <div className="app_info_lite">
                                    <p>versión: {app.version}</p>
                                </div>
                                <div className="app_info_lite">
                                    <p>Author: {app.author}</p>
                                </div>
                                <div className="app_info_lite">
                                    <p>Tipo: {app.type}</p>
                                </div>
                                <div className="app_info_lite">
                                    <p>Actualizado: {app.updatedAt}</p>
                                </div>
                            </div>

                        </div>

                        <div className="right_container">

                            <a href={url + '/app/' + app.appUrl} className="download_button"
                               onClick={handleAppDownload}>
                                Descargar APK <span>({app.size})</span>
                            </a>

                            <div className="app_info_lite info_stars">
                                <div className="disable_rating_cursor">
                                    <Rating
                                        initialValue={app.rating}
                                        allowHover={false}
                                    />
                                    <span>{app.reviewsCount} <FontAwesomeIcon icon={faComment}/></span>
                                    <div className="app_info_lite views">
                                        {app.views} <FontAwesomeIcon icon={faEye}/>
                                    </div>
                                </div>
                            </div>

                            <div className="app_buttons_box">
                                {(app.editable || user?.role === 'admin') &&
                                    <div className="idea_screen_buttons_box">
                                        <Link to={`/app/edit/${appId}`}>
                                            <div className="edit_idea_button">
                                                Editar
                                            </div>
                                        </Link>
                                        <div className="delete_idea_button" onClick={handleAppDelete}>
                                            Borrar
                                        </div>
                                    </div>
                                }
                            </div>

                        </div>

                    </div>

                    <hr/>
                    <div className="middle_container">
                        <h2>Descripción de <b>{app.title}</b></h2>
                        <p>
                            {app.description}
                        </p>
                    </div>

                    <hr/>

                    <div className="bottom_container">
                        <h2>Información adicional</h2>
                        <p>
                            Categoría{': '}
                            {
                                (app.category?.includes('deportes')) &&
                                <FontAwesomeIcon className="app_screen_category_item" icon={faBaseball}/>
                            }
                            {
                                (app.category?.includes('finanzas')) &&
                                <FontAwesomeIcon className="app_screen_category_item" icon={faCoins}/>
                            }
                            {
                                (app.category?.includes('salud')) &&
                                <FontAwesomeIcon className="app_screen_category_item" icon={faMedkit}/>
                            }
                            {
                                (app.category?.includes('familia')) &&
                                <FontAwesomeIcon className="app_screen_category_item" icon={faUsers}/>
                            }
                            {
                                (app.category?.includes('juego')) &&
                                <FontAwesomeIcon className="app_screen_category_item" icon={faGamepad}/>
                            }
                            {
                                (app.category?.includes('internet')) &&
                                <FontAwesomeIcon className="app_screen_category_item" icon={faEarth}/>
                            }
                        </p>
                        {/*<p>*/}
                        {/*    Actualizado:*/}
                        {/*</p>*/}
                        <p>
                            Android Requerido: {app.SORequired}
                        </p>
                        <p>
                            Tamaño: {app.size}
                        </p>
                        <p>
                            Descargas: {app.downloadsCount}
                        </p>
                    </div>
                    <hr/>

                    <div className="commentContainer">
                        {/*<div className="idea_screen_category">*/}
                        {/*    {*/}
                        {/*        (idea.category?.includes('deportes')) && <FontAwesomeIcon className="idea_screen_category_item" icon={ faBaseball } />*/}
                        {/*    }*/}
                        {/*    {*/}
                        {/*        (idea.category?.includes('finanzas')) && <FontAwesomeIcon className="idea_screen_category_item" icon={ faCoins } />*/}
                        {/*    }*/}
                        {/*    {*/}
                        {/*        (idea.category?.includes('salud')) && <FontAwesomeIcon className="idea_screen_category_item" icon={ faMedkit } />*/}
                        {/*    }*/}
                        {/*    {*/}
                        {/*        (idea.category?.includes('familia')) && <FontAwesomeIcon className="idea_screen_category_item" icon={ faUsers } />*/}
                        {/*    }*/}
                        {/*    {*/}
                        {/*        (idea.category?.includes('juego')) && <FontAwesomeIcon className="idea_screen_category_item" icon={ faGamepad } />*/}
                        {/*    }*/}
                        {/*    {*/}
                        {/*        (idea.category?.includes('internet')) && <FontAwesomeIcon className="idea_screen_category_item" icon={ faEarth } />*/}
                        {/*    }*/}
                        {/*</div>*/}
                        {/*<div className="signup_tag">*/}
                        {/*    <h2 className="comment_h2_form">Comentarios</h2>*/}
                        {/*</div>*/}
                        <hr/>

                        <Comments loggedUser={user} elementId={appId} setActRat={setActRat}/>

                    </div>


                </article>

            </div>

            <Footer/>
        </div>
    );
};

