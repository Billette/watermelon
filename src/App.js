import React, {Component} from 'react';
import './App.css';
import MyAccount from './account/MyAccount.js';
import {creditCards} from './database/CreditCards.js';
import {users} from './database/Users.js';
import {wallets} from './database/Wallets.js';
import {history} from './database/History.js';

//import request from './database/Request';



class App extends Component {

  constructor(props){
    
    super(props);

    sessionStorage.clear();

    var usersKey = 'Users';
    var cardsKey = 'Cards';
    var walletsKey = 'Wallets';
    var historyKey = 'History';
    
    // For tests only
    sessionStorage.setItem("idUser", "2"); 

    this.state = {
      idUser: sessionStorage.getItem("idUser"),
    }
    
    // Buiding up the pseudo-database on the session storage
    sessionStorage.setItem(usersKey, JSON.stringify(users));
    sessionStorage.setItem(cardsKey, JSON.stringify(creditCards));
    sessionStorage.setItem(walletsKey, JSON.stringify(wallets));
    sessionStorage.setItem(historyKey, JSON.stringify(history));
    
  }

  render () {
    return (
      <div className="App">        
        <MyAccount idUser={this.state.idUser}/>
        <br/>
        <footer> 
          Ce site est à destination du projet Watermelon pour l'ECE Paris-Lyon <br/>
          Il a été réalisé par Maxime Billette et Amir Messedi
        </footer>
      </div>
    );
  }
}

export default App;
