import React, {Component} from 'react';
import {userList} from '../database/Users.js';


class UserList extends Component {

    getUsers(){
        let users = userList.map((item) => {
            return (
                <li key={`${item.id}`}>
                    {item.id} - {item.firstName} - {item.lastName}
                </li>
            );
        });

        return users;
    }

    render(){
        return(
            <div> Ma liste de users : <ul> {this.getUsers()} </ul> </div>
        )
    }
}

export default UserList;