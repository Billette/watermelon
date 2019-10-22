import React, {Component} from 'react';
import './App.css';
import MyAccount from './account/MyAccount.js';
import {creditCards} from './database/CreditCards.js';



class App extends Component {

  constructor(props){
    super(props);


    creditCards.map((card) => {
      var cardID = 'CardID';
      cardID = cardID.concat('',card.id);
      sessionStorage.setItem(cardID, JSON.stringify(card));

      return null; 
    });

  }


  componentDidUpdate(){

  }

  render () {
    return (
      <div className="App">
        <MyAccount />
      </div>
    );
  }
}

export default App;
