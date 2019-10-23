import React, {Component} from 'react';
import request from '../database/Request.js';


class MyWallet extends Component {

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
            <div>

            </div>
        )
    }
    
}

export default MyWallet;