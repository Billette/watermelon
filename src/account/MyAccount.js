import React, {Component} from 'react';
import request from '../database/Request.js';
import MyCreditCards from './MyCreditCards.js';
import MyWallet from './MyWallet.js';
import MyName from './MyName.js';



class MyAccount extends Component {

    constructor(props){
        super(props);

        // For tests only
        sessionStorage.setItem("idUser", "2");

        this.state = {
            idUser: sessionStorage.getItem('idUser'),
        }

        this.myUser = request.getUserByID(this.state.idUser);
        
    }

    render(){
        return(
            <div className='MyAccount'>
                <MyName idUser={this.state.idUser} />
                <MyCreditCards idUser={this.state.idUser}/>
                <MyWallet idUser={this.state.idUser}/>
            </div>
        )
    }
    
}

export default MyAccount;