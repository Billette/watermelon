//import React from 'react';
//import {userList} from './Users.js';
//import {creditCards} from './CreditCards.js';


const request = {

    getUsers: function(idUser){
        var myUsers = [];
        var usersKey = 'Users';
        var users = JSON.parse(sessionStorage.getItem(usersKey));
        users.map((user) => {
            if(user.id === parseInt(idUser, 10)){
                myUsers.push(user);
            }
            return myUsers; 
        });

        return myUsers;
    },

    getUserByID: function(idUser){
        var myUser = [];
        var usersKey = 'Users';
        var users = JSON.parse(sessionStorage.getItem(usersKey));
        users.map((user) => {
            if(user.id === parseInt(idUser, 10)){
                myUser.push(user);
            }
            return myUser; 
        });

        return myUser;
    },

    getCreditCards : function(){
        var myCards = [];
        var cardsKey = 'Cards';
        var creditCards = JSON.parse(sessionStorage.getItem(cardsKey));
 
        creditCards.map((card) => {
            myCards.push(card);
            return myCards; 
        });

        return myCards;
    },

    getCreditCardByID: function(idCard){
        var myCards = [];
        var cardsKey = 'Cards';
        var cards = JSON.parse(sessionStorage.getItem(cardsKey));
        cards.map((card) => {
            if(card.id === parseInt(idCard, 10)){
                myCards.push(card);
            }
            return myCards; 
        });

        return myCards;
    },

    getCreditCardsOfUser: function(idUser){
        var myCards = [];
        var cardsKey = 'Cards';
        var creditCards = JSON.parse(sessionStorage.getItem(cardsKey));

        creditCards.map((card) => {
            if(card.idUser === parseInt(idUser, 10)){
                myCards.push(card);
            }
            return myCards; 
        });

        return myCards;
    },
    
    // Find a suitable ID for an array of object
    IDAutoIncrement: function(array){
        return (Math.max.apply(Math, array.map(function(object) { 
            return (object.id); 
        })) + 1)
    }    

}

export default request;