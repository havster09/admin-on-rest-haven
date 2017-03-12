import React, { Component } from 'react';
import { Delete } from 'admin-on-rest/lib/mui';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import { PostList,PostEdit,PostCreate } from './posts';
import { UserList } from './users';
import PostIcon from 'material-ui/svg-icons/action/book';
import UserIcon from 'material-ui/svg-icons/social/group';
import Dashboard from './Dashboard';
import authClient from './authClient';


class App extends Component {
  render() {
    return (
      <Admin authClient={authClient} restClient={jsonServerRestClient('http://jsonplaceholder.typicode.com')} title="Statistics" dashboard={Dashboard}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} icon={PostIcon}/>
        <Resource name="users" list={UserList} icon={UserIcon} />
      </Admin>
    );
  }
}

export default App;
