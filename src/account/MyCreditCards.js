import React, {Component} from 'react';
import MyCard from './MyCard.js';
import AddCard from './AddCard.js';
//import request from '../database/Request.js';

class MyCreditCards extends Component {

    constructor(props){
        super(props);
        this.state = {
            idUser: this.props.idUser,
            myCards: this.props.myCards,
        }

        this.handleToUpdate = this.props.handleToUpdate;
    }


    static getDerivedStateFromProps(nextProps, prevState) {

        return {
            idUser: nextProps.idUser,
            myCards: nextProps.myCards,
        }
    }

    // Dispay for all cards its details and buttons to remove, modify, payin and payout
    displayListCards(){
        var handleToUpdate  = this.handleToUpdate.bind(this);

        var listCards = this.state.myCards.map( (card) => {
            return(
                <MyCard key={card.id} id={card.id} handleToUpdate={handleToUpdate.bind(this)} 
                myCards={this.state.myCards}/>
            );
        });

        return(<div className='listCards'>  {listCards} </div>);
    }

    render(){
        var handleToUpdate  = this.handleToUpdate.bind(this);

        return(
            <div className='MyCreditCards'>
                <h2> Vos cartes de crédit </h2>
                 {this.displayListCards()} 
                <AddCard idUser={this.state.idUser} handleToUpdate={handleToUpdate.bind(this)}/>
            </div>
        )
    }
    
}

export default MyCreditCards;