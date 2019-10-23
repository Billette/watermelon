import React, {Component} from 'react';
import request from '../database/Request.js';

class MyCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            newBrand: '',
            newLastFour: '',
            newExpireAt: '',
            card: {},
        }

        this.id = this.props.id;        

        this.handleChange = this.handleChange.bind(this);
        this.handleToUpdate = this.props.handleToUpdate;
    }

    componentDidMount() {
        this.setState({
            myCards: request.getCreditCardsOfUser(this.state.idUser),
            card: request.getCreditCardByID(this.props.id)[0],
        })
    } 
        

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    // Dispay a single card and its details and buttons to remove, modify, payin and payout
    displayCard(){
        
        return(
            <div> 
                ID: {this.state.card.id} - Marque: {this.state.card.brand} - 4 derniers chiffres: {this.state.card.lastFour}
                - Expire le: {this.state.card.expireAt} <br></br>
                    
                <button onClick={ () => this.removeCard(this.state.card.id)}>  Supprimer la carte </button> <br></br> 

                {this.displayModify(this.state.card.id)}
                
            </div>
        )
    }

    displayModify(cardID){

        return(
            <div>
                Changer la marque <input type="text" name="newBrand" value={this.state.newBrand} onChange={this.handleChange} />
                Changer les 4 derniers chiffres <input type="text" name="newLastFour" value={this.state.newLastFour} onChange={this.handleChange} />
                Changer la date d'expiration <input type="text" name="newExpireAt" value={this.state.newExpireAt} onChange={this.handleChange} />

                <br></br>
                <button onClick={ () => this.modifyCard(cardID)}>  Valider les changements </button> <br></br> <br></br>
                <br></br>
            </div>
        );
    }

    removeCard(idCard){
        var cardsKey = 'Cards';

        var cards = JSON.parse(sessionStorage.getItem(cardsKey));

        //get the new cards without the removed card
        var newCards = cards.filter( card => card.id !== idCard );

        sessionStorage.removeItem(cardsKey);
        sessionStorage.setItem(cardsKey, JSON.stringify(newCards));

        // New state of cards
        this.setState({
            myCards: request.getCreditCardsOfUser(this.state.idUser),
            card: {},
        })

        //Inform the parent (MyCreditCards) to re-render
        var handleToUpdate = this.props.handleToUpdate;
        handleToUpdate();
        

    }

    modifyCard(idCard){
        var cardsKey = 'Cards';

        var cards = JSON.parse(sessionStorage.getItem(cardsKey));

        //get the new cards without the removed card
        var newCards = cards.filter( card => card.id !== idCard );

        //get the card to modify
        var cardToModify = cards.filter( card => card.id === idCard );

        let newBrand = '';
        let newLastFour = '';
        let newExpireAt = '';

        // Check for empty text fields
        if(this.state.newBrand !== '') 
        {
            newBrand = this.state.newBrand;
        } else {
            newBrand = cardToModify[0].brand;
        }

        if(this.state.newLastFour !== '') 
        {
            newLastFour = this.state.newLastFour;
        } else {
            newLastFour = cardToModify[0].lastFour;
        }

        if(this.state.newExpireAt !== '') 
        {
            newExpireAt = this.state.newExpireAt;
        } else {
            newExpireAt = cardToModify[0].expireAt;
        }

        var newCard = {
            id: cardToModify[0].id,
            idUser: cardToModify[0].idUser,
            lastFour: newLastFour,
            brand: newBrand,
            expireAt: newExpireAt, 
        }

        newCards.push(newCard);

        sessionStorage.removeItem(cardsKey);
        sessionStorage.setItem(cardsKey, JSON.stringify(newCards));

        // New state of cards
        this.setState({
            myCards: request.getCreditCardsOfUser(this.state.idUser),
            card: request.getCreditCardByID(this.props.id)[0],
        });

        // Reset the input text fields
        this.setState({
            newBrand: '',
            newLastFour: '',
            newExpireAt: '',
        });
    }

    render(){
        return(
            <div className='MyCard'> 
                {this.displayCard()}
            </div>
        )
    }
    
}

export default MyCard;