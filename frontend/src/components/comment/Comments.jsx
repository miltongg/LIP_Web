import React from 'react';
import {useForm} from "../../hooks/useForm";
import axios from "axios";
import {url} from '../../helpers/urls'
import Swal from "sweetalert2";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {Rating} from "react-simple-star-rating";

export const Comments = (user) => {

    const {token, id, name, role} = useSelector(state => state.auth)

    const [formCommentValues, handleCommentInputChange, undefined, reset] = useForm({
        comment: '', rating: '', elementId: user.elementId
    });

    const [comments, setComments] = useState([])

    const [rating, setRating] = useState(0)

    const {comment, ratings = rating / 20, elementId} = formCommentValues;

    const [deletedComment, setDeletedComment] = useState()

    const handleComment = async (e) => {

        e.preventDefault();

        await axios.post(url + '/review', {}, {
            headers: {
                comment,
                rating: ratings,
                elementId,
                token
            }
        }).then(async function (res) {
            console.log(res.data)
            if (!comment)
                return await Swal.fire(res.data.message, '', 'warning')

            if (!rating || rating === 0)
                return await Swal.fire(res.data.message, '', 'warning')
            if (res.data.ok) await Swal.fire(res.data.message, '', 'success')
            setRating(0);
            user.setActRat(comment)
            reset()
        }).catch(async function (error) {
            const body = await error.response.data
            await Swal.fire(body.message, '', 'warning')
        })

    }

    useEffect(() => {

        axios.get(url + '/reviews', {
            headers: {elementId: user.elementId}
        }).then(res => {
            console.log(res.data.data);
            setComments(
                res.data.data
            )

        }).catch(err => {
            console.log(err.message)
        })

    }, [user.elementId, comment, deletedComment])

    const handleLike = (e) => {
        console.log(e)
        axios.post(url + '/like', {}, {
            headers: {
                token,
                id: e
            }
        }).then(res => {
            console.log(res.data);

            let newArray = [...comments];
            let getIndex = newArray.findIndex(obj => {
                return obj.id === e
            });

            if (res.data.like === true)
                newArray[getIndex].likes = newArray[getIndex].likes + 1

            if (res.data.like === false)
                newArray[getIndex].likes = newArray[getIndex].likes - 1

            if (res.data.dislike === true)
                newArray[getIndex].dislikes = newArray[getIndex].dislikes - 1

            setComments(
                newArray
            )

        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleDislike = (e) => {
        console.log(e)
        axios.post(url + '/dislike', {}, {
            headers: {
                token,
                id: e
            }
        }).then(res => {
            console.log(res.data);

            let newArray = [...comments];
            let getIndex = newArray.findIndex(obj => {
                return obj.id === e
            });

            if (res.data.dislike === true)
                newArray[getIndex].dislikes = newArray[getIndex].dislikes + 1

            if (res.data.dislike === false)
                newArray[getIndex].dislikes = newArray[getIndex].dislikes - 1

            if (res.data.like === true)
                newArray[getIndex].likes = newArray[getIndex].likes - 1

            setComments(
                newArray
            )

        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleRating = (rate: number) => {
        setRating(rate)
    }

    const handleDeleteComment = (e) => {

        console.log(e)

        Swal.fire({
            title: '¿Estas seguro de eliminar el comentario?',
            text: "",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: '¡Si, eliminar!',
            denyButtonText: '¡No, cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url + '/review', {

                    headers: {
                        id: e,
                        elementId,
                        token
                    }

                }).then(async res => {
                    console.log(res.data)
                    await Swal.fire(
                        res.data.message, '', 'success'
                    )
                    setDeletedComment(e)
                    user.setActRat(e)

                }).catch(err => {
                    console.log(err.message)
                })
            }
        })
    }


    return (

        <>
            {
                token &&

                <div className="comment_form_outer_box" id="post-comment">
                    <p className="text_comment">Vas a comentar como: <b>{token && name}</b></p>

                    <div className='rating_view'>
                        <Rating
                            onClick={handleRating}
                            transition
                            ratingValue={rating}
                        />
                    </div>
                    <form onSubmit={handleComment}>

                        <div className="comment_form_inner_box">
                        <textarea
                            name="comment"
                            rows="3"
                            placeholder="Danos tu opinión ..."
                            value={comment}
                            onChange={handleCommentInputChange}
                        >
                        </textarea>
                        </div>
                        <button type="submit" className="commentButton">
                            Comentar
                        </button>
                    </form>

                </div>
            }

            <div>

                {
                    !token && <p className="auth_comment_sign">Debes autenticarte para poder comentar</p>
                }
                {
                    (comments.length === 0) &&
                    <p className="no_comments">No hay comentarios. <br/>Se el primero en comentar</p>
                }
                {
                    comments.map(com => (

                        <div key={com.id} className="commentList">
                            <div className="commentData">
                                {
                                    com.userImg && <img className="comment_image" src={
                                        url + '/user-imgs/' + com.userImg
                                    } alt='user-img'/>
                                }

                                <p className="commentTagName">{com.user}</p>
                                <p className="commentTagTime">{com.createdAt}</p>
                                <div className="rated comment_rating">
                                    <Rating
                                        initialValue={com.rating}
                                        allowHover={false}
                                    />
                                </div>
                                <li>
                                    {com.comment}
                                </li>
                            </div>


                            <footer className="idea_item_footer">
                                <div className="like_box">
                                    <button className="like_button" onClick={(e) => handleLike(com.id)}>
                                        <FontAwesomeIcon icon={faThumbsUp}/>
                                    </button>
                                    <div className="like_count">{com.likes}</div>
                                </div>
                                <div className="like_box">
                                    <button className="dislike_button" onClick={(e) => handleDislike(com.id)}>
                                        <FontAwesomeIcon icon={faThumbsDown}/>
                                    </button>
                                    <div className="dislike_count">{com.dislikes}</div>
                                </div>

                                {(id === com.userId || role === 'admin') &&
                                    <div className="delete_comment_button" onClick={(e) => handleDeleteComment(com.id)}>
                                        Borrar
                                    </div>
                                }

                            </footer>

                        </div>

                    ))
                }
            </div>
        </>

    );
};
