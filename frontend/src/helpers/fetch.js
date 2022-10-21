const baseUrl = 'http://localhost:4000/api';


const fetchSinToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url)
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

const fetchConToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (!token)
        return false;

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                token: token
            }
        })
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                token: token
            },
            body: JSON.stringify(data)
        })
    }
}

// const fetchIdeaListSinToken = (endpoint, data, method = 'GET') => {
//     const url = `${ baseUrl }/${ endpoint }`;
//
//     if (method === 'GET') {
//         return fetch( url )
//     } else {
//         return fetch(url, {
//             method,
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify( data )
//         })
//     }
// }

export {
    fetchSinToken,
    fetchConToken,
    // fetchIdeaListSinToken
}