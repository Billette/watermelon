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
                <li key={`${card.id}`}> {card.brand} - {card.lastFour} - {card.expireAt} </li>
            );
        });

        return(<div className='listCards'> <ul> {listCards} </ul> </div>);
    }

    render(){
        return(
            <div className='MyCreditCards'>
                Vos cartes de crédit : {this.listCards()}
            </div>
        )
    }
    
}

export default MyCreditCards;