import React, { Component } from "react";
import request from "../database/Request.js";

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBrand: "",
      newLastFour: "",
      newExpireAt: "",
      errorNotFilled: "",

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleToUpdate = this.props.handleToUpdate;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addCard() {
    var cardsKey = "Cards";

    var cards = request.getCreditCards();

    var isToCreate = true;

    let newBrand = "";
    let newLastFour = "";
    let newExpireAt = "";

    // Check for empty text fields
    if (this.state.newBrand !== "") {
      newBrand = this.state.newBrand;
    } else {
      isToCreate = false;
    }

    if (this.state.newLastFour !== "") {
      newLastFour = this.state.newLastFour;
    } else {
      isToCreate = false;
    }

    if (this.state.newExpireAt !== "") {
      newExpireAt = this.state.newExpireAt;
    } else {
      isToCreate = false;
    }

    var newCard = {
      id: request.IDAutoIncrement(cards),
      idUser: parseInt(this.props.idUser, 10),
      lastFour: newLastFour,
      brand: newBrand,
      expireAt: newExpireAt
    };

    // If the new card has all its values settled
    if (isToCreate === true) {
      cards.push(newCard);

      sessionStorage.setItem(cardsKey, JSON.stringify(cards));
      
      // Reset the input text fields
      this.setState({
      newBrand: "",
      newLastFour: "",
      newExpireAt: "",
      isToCreate: true,
      errorNotFilled: "",
    });
    } else {
      this.setState({
        errorNotFilled: "Champs manquants",
      })
    }

    //Inform the parent (MyCreditCards) to re-render
    var handleToUpdate = this.props.handleToUpdate;
    handleToUpdate();
  }

  displayAddCard() {
    var errorNotFilled = this.state.errorNotFilled;
    return (
      <div>
        Indiquer la marque: &ensp;
        <input
          type="text"
          name="newBrand"
          value={this.state.newBrand}
          onChange={this.handleChange}
        />
        &ensp; Indiquer les 4 derniers chiffres &ensp;
        <input
          type="text"
          name="newLastFour"
          value={this.state.newLastFour}
          onChange={this.handleChange}
        />
        &ensp; Indiquer la date d'expiration &ensp;
        <input
          type="text"
          name="newExpireAt"
          value={this.state.newExpireAt}
          onChange={this.handleChange}
        />
        &ensp;
        <br></br>
        <button
          onClick={() => this.addCard()}
          style={{ borderRadius: "15px", marginTop: 10 }}
        >
          <h7> Valider la saisie </h7>
        </button>
        {errorNotFilled==="" ? null : <p style={{ color: "red" }}>{errorNotFilled}</p>}
        <br />
        <br></br>
      </div>
    );
  }

  render() {
    return (
      <div className="AddCard">
        <br></br>
        <h4> Ajouter une carte: </h4>
        {this.displayAddCard()}
      </div>
    );
  }
}

export default AddCard;
