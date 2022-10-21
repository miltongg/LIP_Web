import axios from "axios";
import {useNavigate, Navigate, Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserLock} from "@fortawesome/free-solid-svg-icons"

import {Route} from "react-router-dom";

export default function Signout() {
    const navigate = useNavigate()

    const handleClick = async () => {

        let token = localStorage.getItem('Token')

        if (!token) {
            navigate('/signin')
        } else {
            await axios.post('signout'), {}, {
                headers: {'token': token}
            }
            localStorage.removeItem('token')

            < Navigate
            push
            to = "/signin" / >
        }

    }
}