import React, { Component } from "react";
import request from "../database/Request.js";

class MyHistory extends Component {
  // Display the histoy of the transactions
  displayListHistory = () => {
    const { idUser, myHistory } = this.props;
    var myWallet = request.getWalletOfUser(idUser);

    var listHistory = myHistory.map(transaction => {
      if (transaction.type === "transfer") {
        // If the user gave money to someone
        if (transaction.idDebitedWallet === myWallet.id) {
          // Get the destination user
          var destWallet = request.getWalletByID(transaction.idCreditedWallet);
          var destUser = request.getUserByID(destWallet.idUser);

          return (
            <li key={transaction.id}>
              Vous avez transféré {transaction.amount}&nbsp; à
              {destUser.firstName} {destUser.lastName} (ID de portefeuille :
              &nbsp;
              {destWallet.id})
            </li>
          );
        } else if (transaction.idCreditedWallet === myWallet.id) {
          // If the user received money from someone

          // Get the source user
          var srcWallet = request.getWalletByID(transaction.idDebitedWallet);
          var srcUser = request.getUserByID(srcWallet.idUser);

          return (
            <li key={transaction.id}>
              Vous avez reçu {transaction.amount}&nbsp; de {srcUser.firstName}
              {srcUser.lastName} (ID de portefeuille : &nbsp;
              {srcWallet.id})
            </li>
          );
        }
      } else if (transaction.type === "payin") {
        return (
          <li key={transaction.id}>
            Vous avez déposé {transaction.amount}&nbsp; sur votre portefeuille
          </li>
        );
      } else if (transaction.type === "payout") {
        return (
          <li key={transaction.id}>
            Vous avez retiré {transaction.amount}&nbsp; de votre portefeuille
          </li>
        );
      } else {
        return null;
      }

      return listHistory;
    });

    return <div> {listHistory} </div>;
  };

  render() {
    return (
      <div className="MyHistory" style={{ marginBottom: "50px" }}>
        <h2> Votre historique de transaction </h2>
        {this.displayListHistory()}
      </div>
    );
  }
}

export default MyHistory;
