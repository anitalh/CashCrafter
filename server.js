const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3000;

const transactions = require('./transactions');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }

  res.json({
    username
  });
});

// POST request for creating a session
app.post('/api/session', (req, res) => {
  const {
    username
  } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({
      error: 'required-username'
    });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({
      error: 'auth-insufficient'
    });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if (!existingUserData) {
    users.addUserData(username, transactions.makeTransactionList());
  }

  res.cookie('sid', sid);
  res.json(users.getUserData(username).getTransactions());
});

// DELETE request for ending a session
app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {

    sessions.deleteSession(sid);
  }

  res.json({
    username
  });
});

// GET request for fetching transactions
app.get('/api/transactions', (req, res) => {

  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }
  res.json(users.getUserData(username).getTransactions());
});

// POST request for adding a transaction
app.post('/api/transactions', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }
  const {
    title,
    amount,
    date,
    reference,
    type
  } = req.body;
  if (!title || !amount || !date || !reference || !type) {
    res.status(400).json({
      error: 'required-details'
    });
    return;
  }
  const transactionList = users.getUserData(username);
  const id = transactionList.addTransaction(title, amount, date, reference, type);
  res.json(transactionList.getTransaction(id));
});

// GET request for fetching a specific transaction based on id
app.get('/api/transactions/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }
  const transactionList = users.getUserData(username);
  const {
    id
  } = req.params;
  if (!transactionList.contains(id)) {
    res.status(404).json({
      error: `noSuchId`,
      message: `No transaction with id ${id}`
    });
    return;
  }
  res.json(transactionList.getTransaction(id));
});

// DELETE request for deleting a specific transaction based on id 
app.delete('/api/transactions/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }
  const {
    id
  } = req.params;
  const transactionList = users.getUserData(username);
  const exists = transactionList.contains(id);
  if (exists) {
    transactionList.deleteTransaction(id);
  }
  res.json({
    message: exists ? `transaction ${id} deleted` : `transaction ${id} did not exist`
  });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));