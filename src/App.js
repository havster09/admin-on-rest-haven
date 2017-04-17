import React, {Component} from 'react';
import {Delete} from 'admin-on-rest/lib/mui';
import {jsonServerRestClient,simpleRestClient, fetchUtils, Admin, Resource} from 'admin-on-rest';
import { PostList,PostEdit,PostCreate } from './posts';
import {UserList,UserEdit,UserCreate,UserShow} from './users';
import PostIcon from 'material-ui/svg-icons/action/book';
import UserIcon from 'material-ui/svg-icons/social/group';
import Dashboard from './Dashboard';
import authClient from './authClient';
import {apiEndpoint} from './config';

const httpClient = (url, options) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};
class App extends Component {
    render() {
        return (
            <Admin authClient={authClient} restClient={ jsonServerRestClient(`${apiEndpoint}/api`,httpClient)}
                   title="Statistics" dashboard={Dashboard}>
                <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} show={UserShow}/>
            </Admin>
        );
    }
}

export default App;
