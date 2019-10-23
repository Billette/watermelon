import React, {Component} from 'react';
import request from '../database/Request.js';


class MyName extends Component {

    constructor(props){
        super(props);
        this.state = {
            idUser: this.props.idUser,
        }

        this.myUser = request.getUserByID(this.state.idUser);
    }

    componentDidUpdate() {
        this.myUser = request.getUserByID(this.state.idUser);
    }

    render(){
        return(
            <div className='MyName'>
                <div> Votre compte : {this.myUser[0].firstName} - {this.myUser[0].lastName} - {this.myUser[0].email}</div>
            </div>
        )
    }
    
}

export default MyName;