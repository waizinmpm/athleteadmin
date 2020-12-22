import api from '../api/apiBasePath';
export function registerUser(credentials) {
    return new Promise((res, rej) => {
        api.post('/v1/auth/register', credentials)
            .then(response => {
                res(response.data);
            })
            .catch(err => {
                rej('An error occured.. try again later.' + err)
            })
    })
}

export function login(credentials) {
    return new Promise((resolve, reject) => {
        api.post('/v1/auth/login', credentials)
            .then(response => {                
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function getLoggedinUser() {
    const userStr = localStorage.getItem('adminuser');

    if (!userStr) {
        return null
    }

    return JSON.parse(userStr);
}