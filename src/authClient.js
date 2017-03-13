import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK } from 'admin-on-rest';


const authClient = (type,params) => {
    if (type === AUTH_LOGIN) {
        localStorage.setItem('token', `Basic aGF2ZW46MTIzNA==`)
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    return Promise.reject('Unknown method');
};



export default authClient;
