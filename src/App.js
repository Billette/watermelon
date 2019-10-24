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

    this.state = {
      toRefresh: false,
    };

    var usersKey = 'Users';
    var cardsKey = 'Cards';
    var walletsKey = 'Wallets';
    
    // Buiding up the pseudo-database on the session storage
    sessionStorage.setItem(usersKey, JSON.stringify(users));
    sessionStorage.setItem(cardsKey, JSON.stringify(creditCards));
    sessionStorage.setItem(walletsKey, JSON.stringify(wallets));

    this.handleRefresh = this.handleRefresh.bind(this);
    
  }

  handleRefresh(event){
    this.setState({
      toRefresh: true,
    })
    console.log("yo");
  }


  render () {
    return (
      <div className="App">

        <button onClick={ () => this.handleRefresh()}>  <h2> Recharger la page </h2> </button> 
        
        <MyAccount />
      </div>
    );
  }
}

export default App;
