import React, {Component} from 'react';
import request from '../database/Request.js';


class ConnectionUser extends Component {

    render(){
        return(
            <div className='listFromDB'>
                <div> Ma liste de users : <ul> {request.getUsers()} </ul> </div>
                <div> Ma liste de cartes de crédit : <ul> {request.getCreditCards()} </ul> </div>
                <div> Liste de cartes de crédit de idUser 1 : <ul> {request.getCreditCardsOfUser(1)} </ul> </div>
            </div>
        )
    }
    
}

export default ConnectionUser;