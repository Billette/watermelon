import React, {Component} from 'react';
import request from '../database/Request.js';

class MyCreditCards extends Component {

    constructor(props){
        super(props);
        this.state = {
            idUser: this.props.idUser,
        }

        this.myUser = request.getUserByID(this.state.idUser);
        this.myCards = request.getCreditCardsOfUser(this.state.idUser);
        //console.log(this.myCards);
    }

    componentDidUpdate() {
        this.myUser = request.getUserByID(this.state.idUser);
        this.myCards = request.getCreditCardsOfUser(this.state.idUser);
    }

    listCards(){
        var listCards = this.myCards.map( (card) => {
            //console.log(card);
            return(
                <li key={`${card.id}`}> ID: {card.id} - Marque: {card.brand} - 4 derniers chiffres: {card.lastFour}
                 - Expire le: {card.expireAt} </li>
            );
        });

        return(<div className='listCards'> <ul> {listCards} </ul> </div>);
    }

    removeCard(idCard){
        var cardID = 'CardID';
        cardID = cardID.concat('',idCard);

        var cardToRemove = JSON.parse(sessionStorage.getItem(cardID));

        console.log(cardToRemove);

        sessionStorage.removeItem(cardID);

    }

    render(){
        return(
            <div className='MyCreditCards'>
                Vos cartes de crédit : {this.listCards()}
                <button onClick={ () => this.removeCard(5)}>  Supprimer la carte </button>
            </div>
        )
    }
    
}

export default MyCreditCards;