import React, {Component} from 'react';
import {Delete} from 'admin-on-rest/lib/mui';
import {jsonServerRestClient,simpleRestClient, fetchUtils, Admin, Resource} from 'admin-on-rest';
import { PostList,PostEdit,PostCreate } from './posts';
import {UserList} from './users';
import PostIcon from 'material-ui/svg-icons/action/book';
import UserIcon from 'material-ui/svg-icons/social/group';
import Dashboard from './Dashboard';
import authClient from './authClient';

const httpClient = (url, options) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', token);
    options.user = {
        authenticated: true,
        token: token
    }
    return fetchUtils.fetchJson(url, options);
};

const restClient = simpleRestClient('http://localhost:2770/api');

class App extends Component {
    render() {
        return (
            <Admin authClient={authClient} restClient={ jsonServerRestClient('http://localhost:2770/api',httpClient)}
                   title="Statistics" dashboard={Dashboard}>
                <Resource name="users" list={UserList} icon={UserIcon}/>
            </Admin>
        );
    }
}

export default App;
