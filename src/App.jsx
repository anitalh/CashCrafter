import { useState, useEffect } from 'react';

import './App.css';
import './controls.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchTransactions,
  fetchDeleteTransaction,
  fetchAddTransaction,
} from './services';

import LoginForm from './LoginForm';
import Transactions from './Transactions';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddTransactionForm from './AddTransactionForm';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import About from './About';

// Function component to render the main application
function App() {

  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [lastAddedTransactionId, setLastAddedTransactionId] = useState();
  const [currentView, setCurrentView] = useState('dashboard');

  // Function to handle user login
  function onLogin(username) {
    setIsTransactionPending(true);
    fetchLogin(username)
      .then(fetchedTransactions => {
        setError('');
        setTransactions(Array.isArray(fetchedTransactions) ? fetchedTransactions : []);
        setIsTransactionPending(false);
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  // Function to handle user logout
  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setTransactions([]);
    setLastAddedTransactionId('');
    fetchLogout()
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  // Function to refresh transactions
  function onRefresh() {
    setError('');
    setIsTransactionPending(true);
    fetchTransactions()
      .then(transactions => {
        setTransactions(transactions);
        setLastAddedTransactionId('');
        setIsTransactionPending(false);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  // Function to delete a transaction
  function onDeleteTransaction(id) {
    setError('');
    setIsTransactionPending(true);
    fetchDeleteTransaction(id)
      .then(() => {
        return fetchTransactions();
      })
      .then(transactions => {
        setTransactions(transactions);
        setIsTransactionPending(false);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  // Function to toggle the status of a transaction
  function onToggleTransaction(id) {
    fetchUpdateTransaction(id, { done: !transactions[id].done })
      .then(transaction => {
        setTransactions({
          ...transactions,
          [id]: transaction,
        });
        setLastAddedTransactionId('');
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  // Function to add a transaction
  function onAddTransaction(title, amount, date, reference, type) {
    fetchAddTransaction(title, amount, date, reference, type)
      .then(transaction => {
        setTransactions({
          ...transactions,
          [transaction.id]: transaction,
        });
        setLastAddedTransactionId(transaction.id);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });

  }

  // Function to check for an existing session
  function checkForSession() {
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchTransactions();
      })
      .catch(err => {
        if (err?.error === CLIENT.NETWORK_ERROR || err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
        else {
          setError(err?.error || 'ERROR');
        }
      })
      .then(transactions => {
        setTransactions(transactions);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }

        setError(err?.error || 'ERROR');
      });

  }

  // Effect hook to check for session on component mount
  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  // Rendering the main application
  return (
    <div className="app">
      <main className="">
        {error && <Status error={error} />}
        {loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <div className="navbar">
              <Navbar username={username} setCurrentView={setCurrentView} />
              <Controls onLogout={onLogout} onRefresh={onRefresh} />
            </div>
            <div className="dashboard-content">
              {currentView === 'dashboard' && <Dashboard transactions={transactions} setTransactions={setTransactions} />}
              {currentView === 'transactions' && (
                <div className="dashboard-content">
                  <Transactions
                    isTransactionPending={isTransactionPending}
                    transactions={transactions}
                    lastAddedTransactionId={lastAddedTransactionId}
                    onDeleteTransaction={onDeleteTransaction}
                    onToggleTransaction={onToggleTransaction}
                  />
                  <AddTransactionForm onAddTransaction={onAddTransaction} />
                </div>
              )}
              {currentView === 'aboutus' && <About />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
