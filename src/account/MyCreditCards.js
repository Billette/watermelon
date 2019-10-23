import React, {Component} from 'react';
import request from '../database/Request.js';
import MyCard from './MyCard.js';
import AddCard from './AddCard.js';

class MyCreditCards extends Component {

    constructor(props){
        super(props);
        this.state = {
            idUser: this.props.idUser,
            myUser: [],
            myCards: [],
        }

        this.handleToUpdate = this.handleToUpdate.bind(this);
    }

    
    componentDidMount() {
        this.setState({
            myUser: request.getUserByID(this.state.idUser),
            myCards: request.getCreditCardsOfUser(this.state.idUser)
        })  
    }   

    //Refresh the cards of the user when a modification is made
    handleToUpdate(){
        this.setState({
            myCards: request.getCreditCardsOfUser(this.state.idUser)
        })
    }

    // Dispay for all cards its details and buttons to remove, modify, payin and payout
    displayListCards(){
        var handleToUpdate  = this.handleToUpdate.bind(this);

        var listCards = this.state.myCards.map( (card) => {
            return(
                <MyCard key={card.id} id={card.id} handleToUpdate={handleToUpdate.bind(this)}/>
            );
        });

        return(<div className='listCards'> <ul> {listCards} </ul> </div>);
    }

    render(){
        var handleToUpdate  = this.handleToUpdate.bind(this);

        console.log("MyCreditCard: myCards");

        return(
            <div className='MyCreditCards'>
                Vos cartes de crédit : {this.displayListCards()} 
                <AddCard idUser={this.state.idUser} handleToUpdate={handleToUpdate.bind(this)}/>
            </div>
        )
    }
    
}

export default MyCreditCards;