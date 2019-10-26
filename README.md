Watermelon
=========

Watermelon is a project belonging to the school ECE Paris-Lyon, made by __Maxime Billette__ and __Amir Messedi__ in october 2019. It consists in a simple payment application between customers

------------------------

Usage (for evaluation)
----------

We simulated a database that is stored in the _sessionStorage_ of the browser. A small set of data is already usable : 
<ul>
    <li>
        <b>email :</b> kevin.frydman@esquad.co &emsp;
        <b>password :</b> kefry1234 &emsp;
        <b>ID of Wallet:</b> 3 
    </li> <br/>
    <li>
        <b>email :</b> amir.messedi@edu.ece.fr &emsp;
        <b>password :</b> amirBG75 &emsp;
        <b>ID of Wallet:</b> 1 
    </li> <br/>
    <li>
        <b>email :</b> maxime.billette@gmail.com &emsp;
        <b>password :</b> maxou123 &emsp;
        <b>ID of Wallet:</b> 2
    </li> <br/>
</ul>

The idea is that the ID of the wallet represents the __IBAN__ of a user, so it is kept _secret_ until the user give this number to another one for a transfer.

The transfer is done from wallet to wallet, however the payins/payout are made through a specific card. There is no checks for the amount of money made for payins. 

The rest should correspond to the specifications. We do not add server-side or any bonus.