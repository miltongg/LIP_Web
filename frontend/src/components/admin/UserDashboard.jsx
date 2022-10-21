import React, {useEffect, useState} from "react";
import axios from "axios";
import {url} from "../../helpers/urls";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit, faUserTimes} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";


export const UserDashboard = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        axios.get(url + '/users')
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            }).catch(err => {
            console.log(err.message)
        })

    }, [setUsers])

    const handleDeleteButton = (e) => {

        Swal.fire({
            title: '¿Estas seguro de eliminar el usuario?',
            text: "¡Es proceso es irreversible!",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: '¡Si, eliminar!',
            denyButtonText: '¡No, cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url + '/user', {

                    headers: {
                        id: e
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

        <div className="container_single">

            <article className="main grid_item_single">

                <div className="crud_container">
                    <div className="crud_header">

                    </div>
                    <div className="crud_body">

                        <table className="crud_table">
                            <thead>
                            <tr>
                                <th>Foto</th>
                                <th>ID</th>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                users.map(user => (

                                    <tr key={user.id}>
                                        <td>

                                            <img className="dashboard_profile_pic" src={
                                                url + '/user-imgs/' + user.img
                                            } alt="profile_pic"/>

                                        </td>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            {user.role}
                                        </td>
                                        <td>{user.email}</td>
                                        <td className="crud_action_buttons_container">
                                            <Link to={`/user/edit/${user.id}`}>
                                                <button className="crud_edit_button"><FontAwesomeIcon
                                                    icon={faUserEdit}/>
                                                </button>
                                            </Link>

                                            <input type="hidden" name="_method" value="DELETE"/>
                                            <button className="crud_delete_button"
                                                    onClick={(e) => handleDeleteButton(user.id)}
                                                    id="btn-delete-profile"><FontAwesomeIcon icon={faUserTimes}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

            </article>
        </div>


    )
}