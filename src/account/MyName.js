import React, {Component} from 'react';
import request from '../database/Request.js';


class MyName extends Component {

    constructor(props){
        super(props);
        this.state = {
            idUser: this.props.idUser,
            myUser: {},
        }
    }

    componentDidMount(){
        this.setState({
            myUser: request.getUserByID(this.state.idUser)[0],
        });
    }

    render(){
        return(
            <div className='MyName'>
                <div> Votre compte : {this.state.myUser.firstName} - {this.state.myUser.lastName} - {this.state.myUser.email}</div>
            </div>
        )
    }
    
}

export default MyName;