import React, { Component } from "react";
import MyCard from "./MyCard.js";
import AddCard from "./AddCard.js";
//import request from '../database/Request.js';

class MyCreditCards extends Component {
  render() {
    const { handleToUpdate, idUser, myCards } = this.props;
    return (
      <div className="MyCreditCards">
        <h2>Vos cartes de crédit</h2>
        <div className="listCards">
          {myCards &&
            myCards.map(card => (
              <MyCard key={card.id} handleToUpdate={handleToUpdate} {...card} />
            ))}
        </div>
        <AddCard idUser={idUser} handleToUpdate={handleToUpdate} />
      </div>
    );
  }
}

export default MyCreditCards;
