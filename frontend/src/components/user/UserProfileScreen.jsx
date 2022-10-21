import React, {useEffect, useState} from 'react';
import Navbar from "../Lab/Navbar";
import Footer from "../Lab/Footer";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {url} from "../../helpers/urls"
import {Rating} from "react-simple-star-rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBaseball, faCoins, faEarth, faGamepad, faMedkit, faEye, faUsers, faComment, faEdit
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {startLogout} from "../../actions/auth";

export const UserProfileScreen = () => {

    const {token, id} = useSelector(state => state.auth)

    if (!id) {
        window.location.replace('/user/login')
        localStorage.clear();
    }

    const [user, setUser] = useState([]);
    const [ideas, setIdeas] = useState([])
    const [img, setImg] = useState()
    const [imgLoaded, setImgLoaded] = useState(false)
    const [updateImg, setUpdateImg] = useState(false)
    const validExtImg = ['png', 'jpeg', 'jpg', 'bmp']

    const dispatch = useDispatch();

    useEffect(() => {

        axios.get(url + '/user', {
            headers: {token}
        })
            .then(res => {
                console.log(res.data.data);
                setUser(res.data.data)
            })
            .catch(error => {
                console.log(error.message)
            })

    }, [token, updateImg])

    useEffect(() => {
        axios.get(url + '/ideas', {

            headers: {
                author: user.id
            }

        }).then(res => {
            console.log(res.data.data);
            setIdeas(res.data.data)
        }).catch(error => {
            console.log(error.message)
        })
    }, [user])

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

    useEffect(() => {

        if (imgLoaded) {

            let formData = new FormData();
            formData.append('file', img);
            console.log(Object.fromEntries(formData))

            axios.post(url + '/upload',

                formData,

                {
                    headers: {
                        token,
                        folder: 'user-imgs'
                    }
                }).then(async res => {
                console.log(res.data)
                await axios.put(url + '/user', {
                    img: res.data.name
                }, {
                    headers: {token}
                }).then(() => {
                    setUpdateImg(!updateImg)
                })
            }).catch(async function (error) {
                const body = await error.response.data
                await Swal.fire(body.message, '', 'error')
            })

        }

    }, [img, imgLoaded, token])


    const handleDeleteButton = () => {

        Swal.fire({
            title: '¿Estas seguro de eliminar el usuario?',
            text: "¡Es proceso es irreversible!",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: '¡Si, eliminar!',
            denyButtonText: '¡No, cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startLogout())
                axios.delete(url + '/user', {

                    headers: {
                        id,
                        token
                    }

                }).then(async res => {
                    console.log(res.data)
                    await Swal.fire(
                        '¡Eliminado!',
                        res.data.message,
                        'success'
                    )
                }).catch(err => {
                    console.log(err.message)
                })
            }
        })
    }

    return (

        <div className="outerShadow">
            <Navbar/>
            <div className="container_single">

                <div className="edit_user_buttons_box">
                    <Link to={`/user/edit/${user.id}`}>
                        <button className="edit_user_button">Editar</button>
                    </Link>
                    <button className="delete_user_button" onClick={handleDeleteButton}>Borrar</button>
                </div>

                <div className="profile_container">
                    <div className="pic_box profile_grid">
                        {(user.img) &&
                            <img className="profile_pic" src={
                                url + '/user-imgs/' + user.img
                            } alt="profile_pic"/>
                        }
                        <div className="upload_pic_button">
                            <input
                                type="file"
                                className="tag"
                                id="imgFile"
                                name="img"
                                onChange={handleImgChange}
                            />
                            <label className="change_img_text" htmlFor="imgFile">
                                Cambiar Foto
                            </label>
                        </div>
                        {/* <div className="edit_user_buttons_box">
                            <button className="delete_user_button" onClick={handleDeleteButton}>Borrar</button>
                        </div> */}
                    </div>

                    <div className="profile_data profile_grid">

                        <div className="name_field">
                            <div className="name_tag">Nombre</div>
                            <div className="name_value">{user.name}</div>
                        </div>

                        <div className="username_field">
                            <div className="name_tag">Nickname</div>
                            <div className="name_value">{user.username}</div>
                        </div>

                        <div className="email_field">
                            <div className="email_tag">Correo <i className="fas fa-edit"></i></div>
                            <div className="email_value">{user.email}</div>
                        </div>

                        <div className="userlevel_field">
                            <div className="userlevel_tag">nivel de usuario</div>
                            <div className="userlevel_value">{user.role}</div>
                        </div>

                    </div>

                </div>


                <div className="profile_data_extra_box">
                    <div className="reviewed_app_tag">
                        Tus ideas propuestas
                    </div>
                    {
                        !ideas.length &&
                        <div className='no_ideas_in_profile'>No tienes ideas publicadas</div>
                    }


                    {
                        ideas.map(idea => (

                            <div key={idea.id} className="profile_data_extra">
                                <div className="user_idea_box">
                                    <h3 className="user_idea_title">{idea.title}</h3>
                                    <div className="idea_category_list">
                                        {
                                            (idea.category.includes('deportes')) &&
                                            <FontAwesomeIcon className="idea_category_item" icon={faBaseball}/>
                                        }
                                        {
                                            (idea.category.includes('finanzas')) &&
                                            <FontAwesomeIcon className="idea_category_item" icon={faCoins}/>
                                        }
                                        {
                                            (idea.category.includes('salud')) &&
                                            <FontAwesomeIcon className="idea_category_item" icon={faMedkit}/>
                                        }
                                        {
                                            (idea.category.includes('familia')) &&
                                            <FontAwesomeIcon className="idea_category_item" icon={faUsers}/>
                                        }
                                        {
                                            (idea.category.includes('juego')) &&
                                            <FontAwesomeIcon className="idea_category_item" icon={faGamepad}/>
                                        }
                                        {
                                            (idea.category.includes('internet')) &&
                                            <FontAwesomeIcon className="idea_category_item" icon={faEarth}/>
                                        }
                                    </div>
                                    <p className="user_idea_description">{idea.description}</p>
                                </div>
                                <div className="idea_item_footer">
                                    <div className="idea_views">
                                        <span><FontAwesomeIcon icon={faEye}/></span>
                                        <div className="idea_views_count">{idea.views}</div>
                                    </div>
                                    <div className="idea_views">
                                        <span><FontAwesomeIcon icon={faComment}/></span>
                                        <div className="idea_views_count">{idea.reviewsCount}</div>
                                    </div>
                                    <div className="disable_rating_cursor idea_list_rating">
                                        <Rating initialValue={idea.rating}/>
                                    </div>
                                    <Link to={`/idea/${idea.id}`}>
                                        <p className="ver">Ver detalles...</p>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }

                </div>

            </div>
            <Footer/>
        </div>
    );
};