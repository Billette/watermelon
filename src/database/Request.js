//import React from 'react';
import {userList} from './Users.js';
import {creditCards} from './CreditCards.js';


const request = {

    getUsers: function(idUser){
        var myUsers = [];
        userList.map((user) => {
            if(user.id === parseInt(idUser, 10)){
                myUsers.push(user);
            }
            return myUsers; 
        });

        return myUsers;
    },

    getUserByID: function(idUser){
        var myUser = [];
        userList.map((user) => {
            if(user.id === parseInt(idUser, 10)){
                myUser.push(user);
            }
            return myUser; 
        });

        return myUser;
    },

    getCreditCards : function(){
        var myCards = [];
        creditCards.map((card) => {
            myCards.push(card);
            return myCards; 
        });

        return myCards;
    },

    getCreditCardsOfUser: function(idUser){
        var myCards = [];
        creditCards.map((card) => {
            if(card.idUser === parseInt(idUser, 10)){
                myCards.push(card);
            }
            return myCards; 
        });

        return myCards;
    },

}

export default request;