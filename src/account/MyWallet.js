import React, {Component} from 'react';
import request from '../database/Request.js';


class MyWallet extends Component {

    constructor(props){
        super(props);
        this.state = {
            idUser: this.props.idUser,
            myWallet: this.props.myWallet,
            idWalletDest: '',
            amount: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleToUpdate = this.props.handleToUpdate;
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        return {
            myWallet: nextProps.myWallet,
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    displayWalletInfo(){
        return(
            <div className='WalletInfo'>
                Vos information de portefeuille : <br></br>
                ID : {this.state.myWallet.id} &emsp; Montant : {this.state.myWallet.balance}
            </div>
        );
    }

    displayTransfer(){
        return(
            <div>
                <h3> Virement bancaire </h3>
                ID du portefeuille destinataire :  <input type="text" name="idWalletDest" value={this.state.idWalletDest} onChange={this.handleChange} />
                Montant <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange} />

                <br></br>
                <button onClick={ () => this.transfer(this.state.myWallet.id, this.state.idWalletDest, this.state.amount)}>  Valider le virement </button> 
                <br></br>
            </div>
        );
    }

    transfer(idWallet, idWalletDest, amount){

        idWallet = parseInt(idWallet, 10);
        idWalletDest = parseInt(idWalletDest, 10);
        amount = parseInt(amount, 10);

        var myWallet = this.state.myWallet;
        var destWallet = request.getWalletByID(idWalletDest);

        var walletsKey = 'Wallets';
        var wallets = request.getWallets();

        //get the new wallets without the removed wallets of source and destination
        var newWallets = wallets.filter( wallet => (wallet.id !== idWallet) && (wallet.id !== idWalletDest));

        var isToTransfer = true;

        // If the amount is negative, or too high, or not a number
        if(amount <= 0 || amount > myWallet.balance || isNaN(amount)) 
        {
            isToTransfer = false;
        }

        // If the transfer is validated
        if(isToTransfer === true)
        {
            myWallet.balance -= amount;
            destWallet.balance += amount;

            newWallets.push(myWallet);
            newWallets.push(destWallet);

            sessionStorage.removeItem(walletsKey);
            sessionStorage.setItem(walletsKey, JSON.stringify(newWallets));

            // resetting the input text fields,
            this.setState({
                idWalletDest: '',
                amount: '',

            });

            //Inform the super-parent (MyAccount) to re-render
            var handleToUpdate = this.props.handleToUpdate;
            handleToUpdate();

        } else {
            console.log('Merci de rentrer un nombre entier positif');
        }

    }


    render(){
        return(
            <div className='MyWallet'>
                {this.displayWalletInfo()} <br/>
                {this.displayTransfer()} <br/>
            </div>
        )
    }
    
}

export default MyWallet;