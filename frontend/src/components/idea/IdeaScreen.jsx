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

export const IdeaScreen = () => {

    const user = useSelector(state => state.auth)

    let navigate = useNavigate();

    const {ideaId} = useParams();

    const [idea, setIdea] = useState([])

    const [actRat, setActRat] = useState([])

    useEffect(() => {
        axios.get(url + '/idea', {
            headers: {id: ideaId, token: user?.token}
        }).then(res => {
            console.log(res.data)
            setIdea(
                res.data.data
            )
        }).catch(err => {
            console.log(err.message)
        })
    }, [ideaId, user?.token, actRat])

    const handleIdeaDelete = () => {

        Swal.fire({
            title: '¿Estas seguro de eliminar la idea?',
            text: "",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: '¡Si, eliminar!',
            denyButtonText: '¡No, cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url + '/idea', {
                    headers: {
                        id: ideaId,
                        token: user.token
                    }
                }).then(async res => {
                    console.log(res.data)

                    await Swal.fire(
                        res.data.message,
                        '',
                        'success')
                    navigate('/idea/list')
                })
            }
        })
    }

    return (
        <div className="outerShadow">

            <Navbar/>

            <div className="container_single">

                <div className="idea_screen_container">

                    <div className="top_idea_screen_container">
                        <div className="idea_screen_title">
                            {idea.title}
                            <hr className="idea_screen_hr"/>
                        </div>
                        <div className="idea_screen_rating">
                            <div className="disable_rating_cursor">
                                <Rating
                                    initialValue={idea.rating}
                                    allowHover={false}
                                />
                            </div>
                            <div className="idea_screen_reviews_count">
                                {idea.reviewsCount} <FontAwesomeIcon icon={faComment}/>
                            </div>
                            <div className="idea_screen_reviews_views">
                                {idea.views} <FontAwesomeIcon icon={faEye}/>
                            </div>
                            {(idea.editable || user?.role === 'admin') &&
                                <div className="idea_screen_buttons_box">
                                    <Link to={`/idea/edit/${ideaId}`}>
                                        <div className="edit_idea_button">
                                            Editar
                                        </div>
                                    </Link>
                                    <div className="delete_idea_button" onClick={handleIdeaDelete}>
                                        Borrar
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="idea_screen_description">
                        {idea.description}
                    </div>

                </div>


                <div className="commentContainer">
                    <div className="idea_screen_category">
                        {
                            (idea.category?.includes('deportes')) &&
                            <FontAwesomeIcon className="idea_screen_category_item" icon={faBaseball}/>
                        }
                        {
                            (idea.category?.includes('finanzas')) &&
                            <FontAwesomeIcon className="idea_screen_category_item" icon={faCoins}/>
                        }
                        {
                            (idea.category?.includes('salud')) &&
                            <FontAwesomeIcon className="idea_screen_category_item" icon={faMedkit}/>
                        }
                        {
                            (idea.category?.includes('familia')) &&
                            <FontAwesomeIcon className="idea_screen_category_item" icon={faUsers}/>
                        }
                        {
                            (idea.category?.includes('juego')) &&
                            <FontAwesomeIcon className="idea_screen_category_item" icon={faGamepad}/>
                        }
                        {
                            (idea.category?.includes('internet')) &&
                            <FontAwesomeIcon className="idea_screen_category_item" icon={faEarth}/>
                        }
                    </div>
                    {/*<div className="signup_tag">*/}
                    {/*    <h2 className="comment_h2_form">Comentarios</h2>*/}
                    {/*</div>*/}
                    <hr/>

                    <Comments loggedUser={user} elementId={ideaId} setActRat={setActRat}/>

                </div>

            </div>

            <Footer/>
        </div>
    );
};

