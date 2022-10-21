import {fetchConToken} from "../helpers/fetch";


export const postIdea = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('signin', {}, 'POST')
    }
}