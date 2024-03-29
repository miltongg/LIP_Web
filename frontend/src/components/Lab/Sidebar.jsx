import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBaseball,
    faCoins,
    faEarth,
    faGamepad,
    faMedkit,
    faSearch,
    faUsers
}
    from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    return (
        <aside className="aside grid_item">

            <div className="search_box">
                <input type="search" placeholder="&iquest;Qu&eacute; desea buscar?"/>
                <div className="button_box">
                    <button className="search_button"><FontAwesomeIcon icon={faSearch}/></button>
                </div>
            </div>

            <div className="categoria_ideas_box">
                <p>Categorias</p>
                <ul>
                    <li><FontAwesomeIcon icon={faBaseball}/></li>
                    <li><FontAwesomeIcon icon={faCoins}/></li>
                    <li><FontAwesomeIcon icon={faMedkit}/></li>
                    <li><FontAwesomeIcon icon={faUsers}/></li>
                    <li><FontAwesomeIcon icon={faGamepad}/></li>
                    <li><FontAwesomeIcon icon={faEarth}/></li>
                </ul>
            </div>

            <div className="social_media_box">

                <div className="facebook">
                    <div className="facebook_header">
                        Facebook
                    </div>
                    <div className="social_media_body">
                        <img className="social_foto" src={require("../../img/facebook.png")} alt=""/>
                    </div>
                </div>

                <div className="twitter">
                    <div className="twitter_header">
                        Twitter
                    </div>
                    <div className="social_media_body">
                        <img className="social_foto" src={require("../../img/twitter.png")} alt=""/>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
