import { useState } from 'react';
import './addtransactionform.css';
import { SERVER } from './constants';
import Status from './Status';

// Function component to render the form for adding a transaction
function AddTransactionForm({ onAddTransaction }) {

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [reference, setReference] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  function onSubmit(e) {
    e.preventDefault();
    if (!title || !amount || !date || !reference || !type) {
      setError(SERVER.REQUIRED_TRANSACTION);
      return;
    }
    // Adding transaction
    onAddTransaction(title, amount, date, reference, type);
    setTitle('');
    setAmount('');
    setDate('');
    setReference('');
    setType('');
    setError('');
  }

  // Functions to handle input changes
  function onTitleChange(e) {
    if (error) setError('');
    setTitle(e.target.value);
  }

  function onAmountChange(e) {
    if (error) setError('');
    setAmount(e.target.value);
  }

  function onDateChange(e) {
    if (error) setError('');
    setDate(e.target.value);
  }

  function onReferenceChange(e) {
    if (error) setError('');
    setReference(e.target.value);
  }

  function onTypeChange(e) {
    if (error) setError('');
    setType(e.target.value);
  }

  // Rendering the form
  return (
    <form className="add__form" onSubmit={onSubmit}>
      <Status error={error} />
      <input
        type="text"
        className="add__title"
        value={title}
        onChange={onTitleChange}
        placeholder="Enter Title"
      />
      <input
        type="number"
        className="add__amount"
        value={amount}
        onChange={onAmountChange}
        placeholder="Enter Amount"
      />
      <input
        type="date"
        className="add__date"
        value={date}
        onChange={onDateChange}
      />
      <input
        type="text"
        className="add__reference"
        value={reference}
        onChange={onReferenceChange}
        placeholder="Enter Reference"
      />
      <select
        className="add__type"
        value={type}
        onChange={onTypeChange}
      >
        <option value="" disabled>Select Transaction Type</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <button type="submit" className="add__button">Add</button>
    </form>
  );
}

export default AddTransactionForm;
