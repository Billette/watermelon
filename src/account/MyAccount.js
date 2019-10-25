import React, {Component} from 'react';
import MyCreditCards from './MyCreditCards.js';
import MyWallet from './MyWallet.js';
import MyName from './MyName.js';
import request from '../database/Request.js';



class MyAccount extends Component {

    constructor(props){
        super(props);

        // For tests only
        sessionStorage.setItem("idUser", "2");

        this.state = {
            idUser: sessionStorage.getItem('idUser'),
            myUser: request.getUserByID( sessionStorage.getItem('idUser') ),
            myCards: request.getCreditCardsOfUser( sessionStorage.getItem('idUser') ),
            myWallet: request.getWalletOfUser( sessionStorage.getItem('idUser') ),
        }
        
    }


    //Refresh the page when a modification is made
    handleToUpdate(){
        this.setState({
            myUser: request.getUserByID(this.state.idUser),
            myCards: request.getCreditCardsOfUser(this.state.idUser),
            myWallet: request.getWalletOfUser(this.state.idUser),
        });
    }

    render(){
        var handleToUpdate  = this.handleToUpdate.bind(this);
        //console.log(this.state.myWallet);

        return(
            <div className='MyAccount'>
                <MyName idUser={this.state.idUser} handleToUpdate={handleToUpdate.bind(this)} />

                <MyCreditCards idUser={this.state.idUser} handleToUpdate={handleToUpdate.bind(this)}
                 myCards={this.state.myCards}/>

                <MyWallet idUser={this.state.idUser} handleToUpdate={handleToUpdate.bind(this)}
                 myWallet={this.state.myWallet}/>
            </div>
        )
    }
    
}

export default MyAccount;