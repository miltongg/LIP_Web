import React from 'react'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {url} from "../../helpers/urls"
import {Rating} from "react-simple-star-rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBaseball,
    faCoins,
    faEarth,
    faGamepad,
    faMedkit,
    faEye,
    faUsers, faComment, faDownload
} from "@fortawesome/free-solid-svg-icons";

export const AppList = () => {

    const [app, setApp] = useState([])

    const [loadedApp, setLoadedApp] = useState(false)


    useEffect(() => {
        axios.get(url + '/apps').then(res => {
            console.log(res.data.data);
            setLoadedApp(true)
            setApp(res.data.data)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    return (

        <div className="app_list_container">

            {/*<Link to="/app/add" className="go_to_app_form">*/}
            {/*    Agregar aplicación*/}
            {/*</Link>*/}

            {
                (app.length === 0) && <p className="no_applications">No hay aplicaciones</p>
            }

            {
                app.map(app => (

                    <div key={app.id} className="app_list">
                        <Link to={`/app/${app.id}`} className="app_list_box">
                            <div>
                                {
                                    loadedApp &&
                                    <img className="app_list_icon" src={
                                        url + '/app-imgs/' + app.img
                                    } alt="app_icon"/>
                                }
                            </div>
                            <div className="app_list_data">
                                <p className="title">{app.title}</p>
                                <div className="disable_rating_cursor app_list_rating">
                                    <Rating initialValue={app.rating}/>
                                </div>
                            </div>
                        </Link>
                        <div className="app_item_footer">
                            <div className="app_views">
                                <span><FontAwesomeIcon icon={faEye}/></span>
                                <div className="app_views_count">{app.views}</div>
                            </div>
                            <div className="app_views">
                                <span><FontAwesomeIcon icon={faComment}/></span>
                                <div className="app_views_count">{app.reviewsCount}</div>
                            </div>
                            <div className="app_views">
                                <span><FontAwesomeIcon icon={faDownload}/></span>
                                <div className="app_views_count">{app.downloadsCount}</div>
                            </div>
                        </div>
                    </div>

                ))
            }

        </div>

    )
}