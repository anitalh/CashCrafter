import './transactionitem.css';

function TransactionItem({
  transaction,
  isLastAdded,
  onDeleteTransaction,
  onToggleTransaction,
}) {

  // Determining classes based on transaction status
  const isDoneClass = transaction.done ? "transaction__text--complete" : "";
  const isAddedClass = isLastAdded ? "transaction__text--added" : "";

  // Rendering the transaction item
  return (
    <>
      <label>
        <input
          className="transaction__toggle"
          data-id={transaction.id}
          type="checkbox"
          checked={transaction.done}
          onChange={(e) => {
            const id = e.target.dataset.id;
            onToggleTransaction(id);
          }}
        />
        <span
          data-id={transaction.id}
          className={`transaction__toggle transaction__text ${isDoneClass} ${isAddedClass}`}
        >
          {transaction.title}, {transaction.amount}, {transaction.date}, {transaction.reference}, {transaction.type}
        </span>
      </label>
      <button
        data-id={transaction.id}
        className="transaction__delete"
        onClick={(e) => {
          const id = e.target.dataset.id;
          onDeleteTransaction(id);
        }}
      >
        &#10060;
      </button>
    </>
  );
}

export default TransactionItem;
