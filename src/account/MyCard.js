import React, { Component } from "react";
import request from "../database/Request.js";

class MyCard extends Component {
  state = {
    newBrand: "",
    newLastFour: "",
    newExpireAt: "",
    errorPayIn: "",
    errorPayOut: "",
    errorNoModif: "",
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Dispay a single card and its details and buttons to remove, modify, payin and payout
  displayCard = () => {
    const { brand, lastFour, expireAt, id } = this.props;
    return (
      <div>
        <h3>------------------------------------------------- </h3>
        <b> Marque : </b> {brand} &emsp;-&emsp; <b>4 derniers chiffres :</b>{" "}
        {lastFour}
        &emsp;-&emsp; <b> Expire le : </b> {expireAt} <br></br>
        <button onClick={() => this.removeCard(id)}>
          {" "}
          <h4> Supprimer la carte </h4>{" "}
        </button>
        {this.displayModify()} <br></br>
        {this.displayPay()}
        <h3>------------------------------------------------- </h3>
      </div>
    );
  };

  displayModify = () => {
    var errorNoModif = this.state.errorNoModif;
    return (
      <div>
        Changer la marque: &ensp;{" "}
        <input
          type="text"
          name="newBrand"
          value={this.state.newBrand}
          onChange={this.handleChange}
        />{" "}
        &ensp; Changer les 4 derniers chiffres: &ensp;{" "}
        <input
          type="text"
          name="newLastFour"
          value={this.state.newLastFour}
          onChange={this.handleChange}
        />{" "}
        &ensp; Changer la date d'expiration: &ensp;{" "}
        <input
          type="text"
          name="newExpireAt"
          value={this.state.newExpireAt}
          onChange={this.handleChange}
        />{" "}
        &ensp;
        <br></br>
        <button onClick={() => this.modifyCard(this.props.id)}>
          {" "}
          <h4> Valider les changements </h4>{" "}
        </button>
        {errorNoModif==="" ? null : <p style={{ color: "red" }}>{errorNoModif}</p>}
        <br></br>
      </div>
    );
  };

  displayPay = () => {
    var errorPayIn = this.state.errorPayIn;
    var errorPayOut = this.state.errorPayOut;
    //var errorNoModif = this.state.errorNoModif;

    return (
      <div>
        Indiquer le montant: &ensp;{" "}
        <input
          type="text"
          name="amount"
          value={this.state.amount}
          onChange={this.handleChange}
        />

        <br></br>
        <button onClick={() => this.payin()}> Effectuer un dépôt </button>{" "}
        {errorPayIn==="" ? null : <p style={{ color: "red" }}>{errorPayIn}</p>}
        <br></br>
        <button onClick={() => this.payout()}>  Effectuer un retrait </button>{" "}
        {errorPayOut==="" ? null : <p style={{ color: "red" }}>{errorPayOut}</p>}
        <br></br>
        <br></br>
      </div>
    );
  };

  removeCard = idCard => {
    const cards = request.getCreditCards();
    //get the new cards without the removed card
    const newCards = cards.filter(card => card.id !== idCard);
    sessionStorage.setItem("Cards", JSON.stringify(newCards));

    //Inform the super-parent (MyAccount) to re-render
    this.props.handleToUpdate();
  };

  modifyCard = idCard => {
    var cardsKey = "Cards";
    var cards = request.getCreditCards();
    var isToModify = true;

    //get the new cards without the removed card
    var newCards = cards.filter(card => card.id !== idCard);

    //get the card to modify
    var cardToModify = cards.find(card => card.id === idCard);

    let newBrand = "";
    let newLastFour = "";
    let newExpireAt = "";

    // If all fields are empty, noting to modify
    if (
      this.state.newBrand === "" &&
      this.state.newLastFour === "" &&
      this.state.newExpireAt === ""
    ) {
      isToModify = false;
    }

    if (isToModify === true) {
      // Check for empty text fields
      if (this.state.newBrand !== "") {
        newBrand = this.state.newBrand;
      } else {
        newBrand = cardToModify.brand;
      }

      if (this.state.newLastFour !== "") {
        newLastFour = this.state.newLastFour;
      } else {
        newLastFour = cardToModify.lastFour;
      }

      if (this.state.newExpireAt !== "") {
        newExpireAt = this.state.newExpireAt;
      } else {
        newExpireAt = cardToModify.expireAt;
      }

      var newCard = {
        id: cardToModify.id,
        idUser: cardToModify.idUser,
        lastFour: newLastFour,
        brand: newBrand,
        expireAt: newExpireAt
      };

      newCards.push(newCard);

      sessionStorage.setItem(cardsKey, JSON.stringify(newCards));

      // Reset the input text fields
      this.setState({
        newBrand: "",
        newLastFour: "",
        newExpireAt: "",
        errorNoModif: "",
      });

      //Inform the super-parent (MyAccount) to re-render
      var handleToUpdate = this.props.handleToUpdate;
      handleToUpdate();
    } else {
      this.setState({
        errorNoModif: "Rien à modifier",
      });
      //console.log("Rien à modifier");
    }
  };

  payin = () => {
    var isToPayIn = true;
    var idUser = this.props.idUser;
    var amount = parseInt(this.state.amount, 10);

    var myWallet = request.getWalletOfUser(idUser);

    // If the amount is not a number or negative, we cannot allow the payin
    if (isNaN(amount) || amount < 0) {
      isToPayIn = false;
    }

    if (isToPayIn === true) {
      myWallet.balance += amount;

      var wallets = request.getWallets();

      var newWallets = wallets.filter(wallet => wallet.id !== myWallet.id);
      newWallets.push(myWallet);

      var history = request.getHistory();
      var transaction = {
        id: request.IDAutoIncrement(history),
        type: "payin",
        idWallet: myWallet.id,
        amount: amount
      };

      history.push(transaction);
      var newHistory = history;

      //Put into the wallet storage
      var walletsKey = "Wallets";
      sessionStorage.setItem(walletsKey, JSON.stringify(newWallets));

      //put into the history storage
      var historyKey = "History";
      sessionStorage.setItem(historyKey, JSON.stringify(newHistory));

      this.setState({
        amount: "",
        errorPayIn: "",
      });

      //Inform the parent (MyCreditCards) to re-render
      this.props.handleToUpdate();

    } else {
      //console.log("Veuillez rentrer un montant de dépôt positif");
      this.setState({
        errorPayIn: "Veuillez rentrer un montant de dépôt positif",
      })
    }
  };

  payout = () => {
    var isToPayOut = true;
    var idUser = this.props.idUser;
    var amount = parseInt(this.state.amount, 10);

    var myWallet = request.getWalletOfUser(idUser);

    // If the amount is not a number or negative, or exceed the balance, we cannot allow the payout
    if (isNaN(amount) || amount < 0 || amount > myWallet.balance) {
      isToPayOut = false;
    }

    if (isToPayOut === true) {
      myWallet.balance -= amount;

      var wallets = request.getWallets();

      var newWallets = wallets.filter(wallet => wallet.id !== myWallet.id);
      newWallets.push(myWallet);

      var history = request.getHistory();
      var transaction = {
        id: request.IDAutoIncrement(history),
        type: "payout",
        idWallet: myWallet.id,
        amount: amount
      };

      history.push(transaction);
      var newHistory = history;

      //Put into the wallet storage
      var walletsKey = "Wallets";
      sessionStorage.setItem(walletsKey, JSON.stringify(newWallets));

      //put into the history storage
      var historyKey = "History";
      sessionStorage.setItem(historyKey, JSON.stringify(newHistory));

      this.setState({
        amount: "",
        errorPayOut: "",
      });

      //Inform the parent (MyCreditCards) to re-render
      var handleToUpdate = this.props.handleToUpdate;
      handleToUpdate();
    } else {
      this.setState({
        errorPayOut: "Veuillez rentrer un montant de retrait adéquat",
      })
      //console.log("Veuillez rentrer un montant de retrait adéquat");
    }
  };

  render() {
    return <div className="MyCard">{this.displayCard()}</div>;
  }
}

export default MyCard;
