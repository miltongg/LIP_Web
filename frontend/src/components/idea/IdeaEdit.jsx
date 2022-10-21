import React, {useEffect} from 'react';
import Footer from "../Lab/Footer";
import Navbar from "../Lab/Navbar";
import {useForm} from "../../hooks/useForm";
import axios from "axios";
import {useSelector} from "react-redux";
import Swal from 'sweetalert2'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCoins,
    faBaseball,
    faEarth,
    faUsers,
    faMedkit,
    faGamepad
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {url} from "../../helpers/urls";

export const IdeaEdit = ({ideaData}) => {

    const navigate = useNavigate()

    const {token, id, role} = useSelector(state => state.auth)

    const {ideaId} = useParams();


    const [formIdeaValues, handleIdeaInputChange, handleIdeaInputChecked, reset] = useForm({
        title: ideaData.title,
        email: ideaData.email,
        description: ideaData.description,
        category: ideaData.category
    }, ideaData.category);

    let isChecked = {
        family: false,
        sport: false,
        health: false,
        game: false,
        finance: false,
        internet: false
    }

    // const ckeckedButtons = document.getElementsByName("category");
    // for (const e of ckeckedButtons) {
    //     e.checked = true;
    // }

    const {title, email, description, category} = formIdeaValues;

    if (category.includes('familia')) {
        isChecked.family = true
    }
    if (category.includes('deportes')) {
        isChecked.sport = true
    }
    if (category.includes('salud')) {
        isChecked.health = true
    }
    if (category.includes('juego')) {
        isChecked.game = true
    }

    if (category.includes('finanzas')) {
        isChecked.finance = true
    }
    if (category.includes('internet')) {
        isChecked.internet = true
    }

    // switch (category) {
    //     case category.includes('familia'):
    //         return isChecked.family = true
    //     case category.includes('deportes'):
    //         return isChecked.sport = true
    //     case category.includes('salud'):
    //         return isChecked.health = true
    //     case category.includes('finanzas'):
    //         return isChecked.finance = true
    //     case category.includes('juego'):
    //         return isChecked.game = true
    //     case category.includes('internet'):
    //         return isChecked.internet = true
    // }

    const handleIdea = async (e) => {
        e.preventDefault();
        await axios.put(url + '/idea', {
            title,
            email,
            description,
            category
        }, {
            headers: {token, id: ideaId}
        })
            .then(async function (res) {
                console.log(res.data)
                if (res.data.ok) await Swal.fire(res.data.message, '', 'success')
                reset()
                navigate("/idea/" + ideaId, {replace: true});
                const ckeckedButtons = document.getElementsByName("category");
                for (const e of ckeckedButtons) {
                    e.checked = false;
                }
            })
            .catch(async function (error) {
                const body = await error.response.data
                await Swal.fire(body.message, '', 'error')
            })
    }

    console.log(role)

    useEffect(() => {

        if (id !== ideaData.author && role !== "admin")
            navigate("/idea/list", {replace: true});

    }, [id, ideaData.author, navigate, role]);

    return (

        <div className="outerShadow">
            <Navbar/>

            <div className="container_single">

                <article className="main grid_item_single">

                    <div className="form_container">
                        <div className="sign_tag">
                            <h2>Editar Idea</h2>
                        </div>
                        <form onSubmit={handleIdea}>
                            <div className="inner_cat_box">
                                <p className="tag_category">Categorías</p>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value="deportes"
                                        onChange={handleIdeaInputChecked}
                                        checked={isChecked.sport}
                                    />
                                    <span className="idea_category"><FontAwesomeIcon icon={faBaseball}/></span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value="finanzas"
                                        onChange={handleIdeaInputChecked}
                                        checked={isChecked.finance}
                                    />
                                    <span className="idea_category"><FontAwesomeIcon icon={faCoins}/></span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value="salud"
                                        onChange={handleIdeaInputChecked}
                                        checked={isChecked.health}
                                    />
                                    <span className="idea_category"><FontAwesomeIcon icon={faMedkit}/></span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value="familia"
                                        onChange={handleIdeaInputChecked}
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
                                        onChange={handleIdeaInputChecked}
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
                                        onChange={handleIdeaInputChecked}
                                        checked={isChecked.internet}
                                    />
                                    <span className="idea_category"><FontAwesomeIcon icon={faEarth}/></span>
                                </label>
                            </div>

                            <div className="inner_box">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Nombre"
                                    value={title}
                                    onChange={handleIdeaInputChange}
                                />
                            </div>
                            <div className="inner_box">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo (opcional)"
                                    value={email}
                                    onChange={handleIdeaInputChange}
                                />
                            </div>
                            <div className="inner_box">
                                <textarea
                                    name="description"
                                    id=""
                                    rows="3"
                                    cols=""
                                    placeholder="Descripción..."
                                    value={description}
                                    onChange={handleIdeaInputChange}
                                ></textarea>
                            </div>
                            <div className="inner_box">
                                <button type="submit">
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>

                </article>

            </div>

            <Footer/>

        </div>
    );
};