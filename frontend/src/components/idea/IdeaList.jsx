import React from 'react'
import {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBaseball,
    faCoins,
    faEarth,
    faGamepad,
    faMedkit,
    faEye,
    faUsers, faComment
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {url} from "../../helpers/urls"
import {Rating} from "react-simple-star-rating";
import {logDOM} from "@testing-library/react";

export const IdeaList = () => {

    const [idea, setIdea] = useState([]);
    const [items, setItems] = useState();
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const totalPages = idea.length / itemsPerPage
    let pageNumbers = [];

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

    useEffect(() => {
        axios.get(url + '/ideas', {

            headers: {
                limit: 2
            }

        }).then(res => {
            console.log(res.data);
            setIdea(res.data.data)
            setItems(res.data.ideaListSize)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])


    for (let i = 1; i <= Math.ceil(items / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (

        <div className="idea_list_container">

            <Link to="/idea/add" className="go_to_idea_form">
                Agregar idea
            </Link>

            {
                (idea.length === 0) && <p className="no_ideas">No hay ideas. Se el primero en proponer una...</p>
            }

            {
                idea.map(idea => (
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

            {

                pageNumbers.map((number) => (
                    <li key={number} id={number}>
                        {number}
                    </li>
                ))

            }

        </div>
    )
}
