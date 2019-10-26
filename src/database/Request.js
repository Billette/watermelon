const request = {
  getUsers: () => JSON.parse(sessionStorage.getItem("Users")),

  getUserByID: idUser => {
    const users = request.getUsers();
    return users && users.find(u => u.id === parseInt(idUser));
  },

  addUser: newUser => {
    const users = request.getUsers() || [];
    const wallets = request.getWallets() || [];
    const walletId = request.IDAutoIncrement(wallets);

    // Init user data
    sessionStorage.setItem("Users", JSON.stringify([...users, newUser]));
    sessionStorage.setItem(
      "Wallets",
      JSON.stringify([
        ...wallets,
        {
          id: walletId,
          idUser: newUser.id,
          balance: 0
        }
      ])
    );
    sessionStorage.setItem("Cards", JSON.stringify([]));
    sessionStorage.setItem("History", JSON.stringify([]));
  },

  getCreditCards: () => JSON.parse(sessionStorage.getItem("Cards")),

  getCreditCardByID: () => creditCardId => {
    const creditCards = request.getCreditCards();
    return (
      creditCards && creditCards.find(c => c.id === parseInt(creditCardId))
    );
  },

  getCreditCardsOfUser: idUser => {
    const creditCards = request.getCreditCards();
    return (
      creditCards && creditCards.filter(c => c.idUser === parseInt(idUser))
    );
  },

  getWallets: () => JSON.parse(sessionStorage.getItem("Wallets")),

  getWalletByID: walletId => {
    const wallets = request.getWallets();
    return wallets && wallets.find(w => w.id === parseInt(walletId));
  },

  getWalletOfUser: idUser => {
    const wallets = request.getWallets();
    return wallets && wallets.find(w => w.idUser === parseInt(idUser));
  },

  getHistory: () => JSON.parse(sessionStorage.getItem("History")),

  getHistoryOfUser: idUser => {
    const wallet = request.getWalletOfUser(idUser);
    const history = request.getHistory();

    return (
      wallet &&
      history &&
      history.filter(
        h => h.idWallet === wallet.id || h.idDebitedWallet === wallet.id
      )
    );
  },

  // Find a suitable ID for an array of object
  IDAutoIncrement: array => {
    const max =
      array &&
      array.length > 0 &&
      Math.max.apply(Math, array.map(({ id }) => id));
    return max ? max + 1 : 1;
  }
};

export default request;
