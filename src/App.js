import React, {Component} from 'react';
import './App.css';
import MyAccount from './account/MyAccount.js';
import {creditCards} from './database/CreditCards.js';
import {userList} from './database/Users.js';



class App extends Component {

  constructor(props){
    
    super(props);

    sessionStorage.clear();

    var usersKey = 'Users';
    var cardsKey = 'Cards';
    
    // Buiding up the pseudo-database on the session storage
    sessionStorage.setItem(usersKey, JSON.stringify(userList));
    sessionStorage.setItem(cardsKey, JSON.stringify(creditCards));

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
