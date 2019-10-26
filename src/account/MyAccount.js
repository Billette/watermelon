import React, { Component } from "react";
import MyCreditCards from "./MyCreditCards.js";
import MyWallet from "./MyWallet.js";
import MyName from "./MyName.js";
import MyHistory from "./MyHistory.js";
import request from "../database/Request.js";

class MyAccount extends Component {
  state = {
    idUser: sessionStorage.getItem("idUser"),
    myUser: request.getUserByID(this.props.idUser),
    myCards: request.getCreditCardsOfUser(this.props.idUser),
    myWallet: request.getWalletOfUser(this.props.idUser),
    myHistory: request.getHistoryOfUser(this.props.idUser)
  };

  //Refresh the page when a modification is made
  handleToUpdate = () => {
    this.setState({
      myUser: request.getUserByID(this.state.idUser),
      myCards: request.getCreditCardsOfUser(this.state.idUser),
      myWallet: request.getWalletOfUser(this.state.idUser),
      myHistory: request.getHistoryOfUser(this.state.idUser)
    });
  };

  render() {
    const { idUser, myWallet, myHistory, myCards, myUser } = this.state;
    const { logout } = this.props;
    // Wait for local storage to be loaded
    return (
      <div className="MyAccount">
        {myUser && (
          <MyName
            idUser={idUser}
            myUser={myUser}
            logout={logout}
            handleToUpdate={this.handleToUpdate}
          />
        )}
        <MyCreditCards
          idUser={idUser}
          handleToUpdate={this.handleToUpdate}
          myCards={myCards}
        />
        {myWallet && (
          <MyWallet
            idUser={idUser}
            handleToUpdate={this.handleToUpdate}
            myWallet={myWallet}
          />
        )}
        {myHistory && <MyHistory idUser={idUser} myHistory={myHistory} />}
      </div>
    );
  }
}

export default MyAccount;
