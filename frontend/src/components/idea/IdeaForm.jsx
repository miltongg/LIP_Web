import React from 'react';
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
import {useNavigate} from "react-router-dom";
import {url} from "../../helpers/urls";

export const IdeaForm = () => {

    const navigate = useNavigate()

    const {token} = useSelector(state => state.auth)

    const [formIdeaValues, handleIdeaInputChange, handleIdeaInputChecked, reset] = useForm({
        email: '',
        title: '',
        description: '',
        category: []
    });

    const {title, category, email, description} = formIdeaValues;

    const handleIdea = async (e) => {
        e.preventDefault();
        await axios.post(url + '/idea', {
            title,
            email,
            description,
            category
        }, {
            headers: {token}
        })
            .then(async function (res) {
                console.log(res.data)
                if (res.data.ok) await Swal.fire(res.data.message, '', 'success')
                reset()
                navigate("/idea/list", {replace: true});
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

    return (

        <div className="outerShadow">
            <Navbar/>

            <div className="container_single">

                <article className="main grid_item_single">

                    <div className="form_container">
                        <div className="sign_tag">
                            <h2>Proponer Idea</h2>
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
                                    />
                                    <span className="idea_category"><FontAwesomeIcon icon={faBaseball}/></span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value="finanzas"
                                        onChange={handleIdeaInputChecked}
                                    />
                                    <span className="idea_category"><FontAwesomeIcon icon={faCoins}/></span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value="salud"
                                        onChange={handleIdeaInputChecked}
                                    />
                                    <span className="idea_category"><FontAwesomeIcon icon={faMedkit}/></span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value="familia"
                                        onChange={handleIdeaInputChecked}
                                    />
                                    <span className="idea_category"><FontAwesomeIcon icon={faUsers}/></span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value="juego"
                                        onChange={handleIdeaInputChecked}
                                    />
                                    <span className="idea_category"><FontAwesomeIcon icon={faGamepad}/></span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value="internet"
                                        onChange={handleIdeaInputChecked}
                                    />
                                    <span className="idea_category"><FontAwesomeIcon icon={faEarth}/></span>
                                </label>
                            </div>

                            <div className="inner_box">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Nombra tu idea"
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
                                    rows="5"
                                    cols=""
                                    placeholder="Cuentanos tu idea"
                                    value={description}
                                    onChange={handleIdeaInputChange}
                                ></textarea>
                            </div>
                            <div className="inner_box">
                                <button type="submit">
                                    Enviar
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