import React, {Component} from 'react';
import request from '../database/Request.js';

class AddCard extends Component {

    constructor(props){
        super(props);
        this.state = {

            newBrand: '',
            newLastFour: '',
            newExpireAt: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleToUpdate = this.props.handleToUpdate;
    }

    /*
    componentDidMount() {
        this.setState({

        })
    } */
        

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    addCard(){
        var cardsKey = 'Cards';

        var cards = JSON.parse(sessionStorage.getItem(cardsKey));

        var isToCreate = true;

        let newBrand = '';
        let newLastFour = '';
        let newExpireAt = '';

        // Check for empty text fields
        if(this.state.newBrand !== '') 
        {
            newBrand = this.state.newBrand;
        } else {
            isToCreate = false;
        }

        if(this.state.newLastFour !== '') 
        {
            newLastFour = this.state.newLastFour;
        } else {
            isToCreate = false;
        }

        if(this.state.newExpireAt !== '') 
        {
            newExpireAt = this.state.newExpireAt;
        } else {
            isToCreate = false;
        }

        console.log(cards);

        var newCard = {
            id: request.IDAutoIncrement(cards),
            idUser: parseInt(this.props.idUser,10),
            lastFour: newLastFour,
            brand: newBrand,
            expireAt: newExpireAt, 
        }

        // If the new card has all its values settled
        if(isToCreate === true) {
            cards.push(newCard);

            console.log(newCard);
    
            sessionStorage.removeItem(cardsKey);
            sessionStorage.setItem(cardsKey, JSON.stringify(cards));
    
            cards = JSON.parse(sessionStorage.getItem(cardsKey));
    
        } else {
            console.log("champs manquants");

        }

        // Reset the input text fields
        this.setState({
            newBrand: '',
            newLastFour: '',
            newExpireAt: '',
            isToCreate: true,
        });

        //Inform the parent (MyCreditCards) to re-render
        var handleToUpdate = this.props.handleToUpdate;
        handleToUpdate();        
    }

    displayAddCard(){

        return(
            <div>
                Indiquer la marque <input type="text" name="newBrand" value={this.state.newBrand} onChange={this.handleChange} />
                Indiquer les 4 derniers chiffres <input type="text" name="newLastFour" value={this.state.newLastFour} onChange={this.handleChange} />
                Indiquer la date d'expiration <input type="text" name="newExpireAt" value={this.state.newExpireAt} onChange={this.handleChange} />

                <br></br>
                <button onClick={ () => this.addCard() }>  Valider la saisie </button> <br></br> <br></br>
                <br></br>
            </div>
        );
    }

    render(){
        return(
            <div className='AddCard'> 
                <br></br>
                Ajouter une carte : <br></br> 
                {this.displayAddCard()}
            </div>
        )
    }
    
}

export default AddCard;