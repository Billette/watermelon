//import React from 'react';
//import {userList} from './Users.js';
//import {creditCards} from './CreditCards.js';


const request = {

    getUsers: function(){
        var myUsers = [];
        var usersKey = 'Users';
        var users = JSON.parse(sessionStorage.getItem(usersKey));
        users.map((user) => {

            myUsers.push(user);
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

    getWallets: function(){
        var myWallet = [];
        var walletsKey = 'Wallets';
        var wallets = JSON.parse(sessionStorage.getItem(walletsKey));
        wallets.map((wallet) => {

            myWallet.push(wallet);
            return myWallet; 
        });

        return myWallet;
    },

    getWalletByID: function(idWallet){
        var myWallet = [];
        var walletsKey = 'Wallets';
        var wallets = JSON.parse(sessionStorage.getItem(walletsKey));
        wallets.map((wallet) => {
            if(wallet.id === parseInt(idWallet, 10)){
                myWallet.push(wallet);
            }
            return myWallet; 
        });

        return myWallet;
    },

    getWalletOfUser: function(idUser){
        var myWallet = [];
        var walletsKey = 'Wallets';
        var wallets = JSON.parse(sessionStorage.getItem(walletsKey));

        wallets.map((wallet) => {
            if(wallet.idUser === parseInt(idUser, 10)){
                myWallet.push(wallet);
            }
            return myWallet; 
        });

        return myWallet;
    },
    
    // Find a suitable ID for an array of object
    IDAutoIncrement: function(array){
        return (Math.max.apply(Math, array.map(function(object) { 
            return (object.id); 
        })) + 1)
    }    

}

export default request;