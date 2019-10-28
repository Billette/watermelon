import React, { Component } from "react";
import "./App.css";
import MyAccount from "./account/MyAccount.js";
import Login from "./login";
import { users } from "./database/Users";
import { creditCards } from "./database/CreditCards";
import { wallets } from "./database/Wallets";
import { history } from "./database/History";

class App extends Component {
  constructor(props) {
    super(props);

    sessionStorage.clear();

    var usersKey = "Users";
    var cardsKey = "Cards";
    var walletsKey = "Wallets";
    var historyKey = "History";

    this.state = {
      idUser: sessionStorage.getItem("idUser"),
      isAuthenticated: !!sessionStorage.getItem("idUser")
    };

    // Buiding up the pseudo-database on the session storage
    sessionStorage.setItem(usersKey, JSON.stringify(users));
    sessionStorage.setItem(cardsKey, JSON.stringify(creditCards));
    sessionStorage.setItem(walletsKey, JSON.stringify(wallets));
    sessionStorage.setItem(historyKey, JSON.stringify(history));
  }

  render() {
    const { isAuthenticated, idUser } = this.state;
    return (
      <div className="App">
        {isAuthenticated ? (
          <MyAccount
            idUser={idUser}
            logout={() => {
              // Clear local storage
              sessionStorage.setItem("idUser", null);
              // Clear state
              this.setState({
                idUser: null,
                isAuthenticated: false
              });
            }}
          />
        ) : (
          <Login
            onConnection={idUser => {
              // Set in local storage
              sessionStorage.setItem("idUser", idUser);
              // Update state
              this.setState({
                idUser,
                isAuthenticated: true
              });
            }}
          />
        )}
        <br />
        <footer>
          Ce site est à destination du projet Watermelon pour l'ECE Paris-Lyon{" "}
          <br />
          Il a été réalisé par Maxime Billette et Amir Messedi
        </footer>
      </div>
    );
  }
}

export default App;
