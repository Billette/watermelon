import React from 'react';
import {userList} from './Users.js';
import {creditCards} from './CreditCards.js';


const request = {

    getUsers: function(){
        var users = userList.map((user) => {
            return (
                <li key={`${user.id}`}>
                    {user.id} - {user.firstName} - {user.lastName}
                </li>
            );
        });

        return users;
    },

    getCreditCards : function(){
        var cards = creditCards.map((card) => {
            return (
                <li key={`${card.id}`}>
                    {card.id} - {card.idUser} - {card.brand} - {card.expireAt}
                </li>
            );
        });

        return cards;
    },

    getCreditCardsOfUser : function(idUser){
        var cardsOfUser = creditCards.map((card) => {
            if(card.idUser === idUser){
                return (
                    <li key={`${card.id}`}>
                        {card.id} - {card.idUser} - {card.brand} - {card.expireAt}
                    </li>
                );
            } else {
                return null;
            }
        });

        return cardsOfUser;
    }
}

export default request;