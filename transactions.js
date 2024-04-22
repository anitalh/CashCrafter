const uuid = require('uuid').v4;

function makeTransactionList() {

  // store transactions and transaction list
  const transactionList = {};
  const transactions = {};

  // check if a transaction exists
  transactionList.contains = function contains(id) {
    return !!transactions[id];
  };

  // get all transactions
  transactionList.getTransactions = function getTransactions() {
    return transactions;
  };

  // add a new transaction
  transactionList.addTransaction = function addTransaction(title, amount, date, reference, type) {
    const id = uuid();
    transactions[id] = {
      id,
      title,
      amount,
      date,
      reference,
      type,
      done: false,
    };
    return id;
  };

  // get a specific transaction by ID
  transactionList.getTransaction = function getTransaction(id) {
    return transactions[id];
  };

  // delete a transaction by ID
  transactionList.deleteTransaction = function deleteTransaction(id) {
    delete transactions[id];
  };

  return transactionList;
};

module.exports = {
  makeTransactionList,
};
