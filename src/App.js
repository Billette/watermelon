import React, {Component} from 'react';
import './App.css';
import MyAccount from './account/MyAccount.js';
import {creditCards} from './database/CreditCards.js';
import {users} from './database/Users.js';
import {wallets} from './database/Wallets.js';
//import request from './database/Request';



class App extends Component {

  constructor(props){
    
    super(props);

    sessionStorage.clear();

    var usersKey = 'Users';
    var cardsKey = 'Cards';
    var walletsKey = 'Wallets';
    
    // Buiding up the pseudo-database on the session storage
    sessionStorage.setItem(usersKey, JSON.stringify(users));
    sessionStorage.setItem(cardsKey, JSON.stringify(creditCards));
    sessionStorage.setItem(walletsKey, JSON.stringify(wallets));
    
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
