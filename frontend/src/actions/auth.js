import {types} from "../types/types";
import {fetchConToken, fetchSinToken} from "../helpers/fetch";
import Swal from 'sweetalert2'

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('signin', {email, password}, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                token: body.token,
                role: body.role,
                id: body.id,
                name: body.name,
                username: body.username,
                email: body.email
            }))

            Swal.fire('Has iniciado sesión', '', 'success')

        } else {
            await Swal.fire(body.message, '', 'error')
        }
    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {

        const resp = await fetchSinToken('signup', {name, email, password}, 'POST');
        const body = await resp.json();

        if (body.ok) {

            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())


            dispatch(login({
                token: body.token,
                role: body.role,
                id: body.id,
                name: body.name,
                username: body.username,
                email: body.email
            }))

        } else {
            await Swal.fire('Error', body.message, 'error')
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('renew');
        let body = {}

        if (!resp) {
            return dispatch(checkingFinish())
        }

        body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                token: body.token,
                role: body.role,
                id: body.id,
                name: body.name,
                username: body.username,
                email: body.email
            }))
        } else {
            await Swal.fire('Error', body.message, 'error')
            dispatch(checkingFinish())
        }
    }
}

// export const getIdeaList = () => {
//     return async (dispatch) => {
//         const resp = await fetchSinToken('ideas');
//         const body = await resp.json();
//
//         if (body.ok) {
//             dispatch (idea({
//                 data: body
//             }))
//         }
//     }
// }

const checkingFinish = () => ({type: types.authCheckingFinish})

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

// const idea = ( idea ) => ({
//     type: types.ideaGetList,
//     payload: idea
// })

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout())
    }
}

const logout = () => ({type: types.authLogout})