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
            myUser: request.getUserByID(this.state.idUser),
        });
    }

    render(){
        return(
            <div className='MyName'>
                <div> <h2> Votre compte </h2>
                {this.state.myUser.firstName} {this.state.myUser.lastName} &emsp;-&emsp; {this.state.myUser.email}</div>
                <br/>
            </div>
        )
    }
    
}

export default MyName;