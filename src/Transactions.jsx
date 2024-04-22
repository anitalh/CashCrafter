import Loading from './Loading';
import TransactionItem from './TransactionItem';
import './transactions.css';

// Function component to render transactions
function Transactions({
  transactions,
  isTransactionPending,
  lastAddedTransactionId,
  onDeleteTransaction,
  onToggleTransaction,
}) {

  // Enumeration for determining what to show based on transaction status
  const SHOW = {
    PENDING: 'pending',
    EMPTY: 'empty',
    TRANSACTIONS: 'transactions',
  };

  // Determine what to show based on transaction status
  let show;
  if (isTransactionPending) {
    show = SHOW.PENDING;
  } else if (!Object.keys(transactions).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.TRANSACTIONS;
  }

  // Reverse the order of transactions for displaying
  const reversedTransactions = [...Object.values(transactions)].reverse();

  // Rendering the transactions component
  return (
    <div className="content">
      {show === SHOW.PENDING && <Loading className="transactions__waiting">Loading Transactions...</Loading>}
      {show === SHOW.EMPTY && (
        <p>No Transaction Items yet, add one!</p>
      )}
      {show === SHOW.TRANSACTIONS && (
        <ul className="transactions">
          {reversedTransactions.map(transaction => (
            <li className="transaction" key={transaction.id}>
              <TransactionItem
                transaction={transaction}
                isLastAdded={lastAddedTransactionId === transaction.id}
                onDeleteTransaction={onDeleteTransaction}
                onToggleTransaction={onToggleTransaction}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Transactions;
