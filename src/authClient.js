import {AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK} from 'admin-on-rest';
import {apiEndpoint} from './config';


const authClient = (type, params) => {
  if (type === AUTH_LOGIN) {
    const {username, password} = params;
    const request = new Request(`${apiEndpoint}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({token}) => {
        localStorage.setItem('token', token);
      });
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
  }

  if (type === AUTH_CHECK) {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject({redirectTo: '/login'});
  }

  return Promise.resolve();
};


export default authClient;
