const history = [
    {
        id: 1,
        type: 'transfer',
        idDebitedWallet: 1,
        idCreditedWallet: 2,
        amount: 400,
    },
    {
        id: 2,
        type: 'payin',
        idWallet: 1,
        amount: 350,
    },
    {
        id: 3,
        type: 'payout',
        idWallet: 1,
        amount: 1200,
    },
    {
        id: 4,
        type: 'transfer',
        idDebitedWallet: 3,
        idCreditedWallet: 1,
        amount: 1000,
    },
    {
        id: 5,
        type: 'payout',
        idWallet: 2,
        amount: 800,
    },

];

export {history};