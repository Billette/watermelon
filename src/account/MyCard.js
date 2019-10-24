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
            amount: '',
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

                {this.displayModify()} <br></br>
                {this.displayPay()}

                <br></br><br></br>
                
            </div>
        )
    }

    displayModify(){
        return(
            <div>
                Changer la marque <input type="text" name="newBrand" value={this.state.newBrand} onChange={this.handleChange} />
                Changer les 4 derniers chiffres <input type="text" name="newLastFour" value={this.state.newLastFour} onChange={this.handleChange} />
                Changer la date d'expiration <input type="text" name="newExpireAt" value={this.state.newExpireAt} onChange={this.handleChange} />

                <br></br>
                <button onClick={ () => this.modifyCard(this.state.card.id)}>  <h4> Valider les changements </h4> </button> 
                <br></br>

            </div>
        );
    }

    displayPay(){
        return(
            <div>
                Indiquer le montant: <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange} />

                <br></br>
                <button onClick={ () => this.payin()}>  Effectuer un dépôt </button> <br></br>
                <button onClick={ () => this.payout()}>  Effectuer un retrait </button> <br></br>
                <br></br>

            </div>
        );
    }

    removeCard(idCard){
        var cardsKey = 'Cards';

        var cards = request.getCreditCards();

        //get the new cards without the removed card
        var newCards = cards.filter( card => card.id !== idCard );

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
        var cards = request.getCreditCards();

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

    payin(){
        var walletsKey = 'Wallets';
        var isToPayIn = true;
        var idUser = this.state.card.idUser;
        var amount = parseInt(this.state.amount, 10);

        var myWallet = request.getWalletOfUser(idUser)[0];

        // If the amount is not a number or negative, we cannot allow the payin
        if(isNaN(amount) || amount < 0) {
            isToPayIn = false;
        }

        if(isToPayIn === true) {
            myWallet.balance += amount;

            var wallets = request.getWallets();

            var newWallets = wallets.filter( wallet => wallet.id !== myWallet.id );
            newWallets.push(myWallet);

            sessionStorage.setItem(walletsKey, JSON.stringify(newWallets));

            //Inform the parent (MyCreditCards) to re-render
            var handleToUpdate = this.props.handleToUpdate;
            handleToUpdate();

        } else {
            console.log('Veuillez rentrer un montant de dépot positif');
        }

    }

    payout(){

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