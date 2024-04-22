import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './services';
import Chart from './Chart';
import { MESSAGES } from './constants';
import './dashboard.css';

function Dashboard({ setTransactions }) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [error, setError] = useState('');
  const [graphData, setGraphData] = useState({ income: [], expenses: [] });

  // Update graph data based on transactions
  const updateGraphData = (transactionsArray) => {
    const sortedTransactions = transactionsArray.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Extracting income and expense data
    const incomeData = sortedTransactions
      .filter(t => t.type === 'Income')
      .map(t => ({ date: new Date(t.date), amount: parseFloat(t.amount) }));

    const expensesData = sortedTransactions
      .filter(t => t.type === 'Expense')
      .map(t => ({ date: new Date(t.date), amount: parseFloat(t.amount) }));

    // Finding the maximum amount for scaling
    const maxAmount = Math.max(
      ...incomeData.map(d => d.amount),
      ...expensesData.map(d => d.amount)
    );

    // Scaling data points for rendering on chart
    const svgWidth = 600;
    const svgHeight = 300;

    const scaleDataPoints = (data) => {
      const startDate = sortedTransactions[0].date;
      const endDate = sortedTransactions[sortedTransactions.length - 1].date;
      const dateRange = endDate - startDate;

      return data.map(d => {
        let x = 0;
        if (dateRange > 0) {
          x = (d.date - startDate) / dateRange * svgWidth;
        } else {
          x = svgWidth / 2;
        }
        const y = svgHeight - (d.amount / maxAmount * svgHeight);
        return { x, y };
      });
    };


    // Setting graph data
    setGraphData({
      income: [{ x: 0, y: svgHeight }, ...scaleDataPoints(incomeData)],
      expenses: [{ x: 0, y: svgHeight }, ...scaleDataPoints(expensesData)]
    });
  };


  // Process transactions
  const processTransactions = () => {
    setError('');
    fetchTransactions()
      .then(fetchedTransactions => {
        const transactionsArray = Object.values(fetchedTransactions);
        setTransactions(transactionsArray);
        calculateTotals(transactionsArray);
        updateGraphData(transactionsArray);
        setError('');
      })
      .catch(err => {
        const errorMessage = MESSAGES[err?.error] || MESSAGES.default;
        setError(errorMessage);
      });
  };

  // Process transactions on component mount
  useEffect(() => {
    processTransactions();
  }, []);


  // Calculate totals
  const calculateTotals = (transactionsArray) => {
    const income = transactionsArray.reduce((acc, curr) => curr.type === "Income" ? acc + parseFloat(curr.amount) : acc, 0);
    const expense = transactionsArray.reduce((acc, curr) => curr.type === "Expense" ? acc + parseFloat(curr.amount) : acc, 0);
    setTotalIncome(income);
    setTotalExpense(expense);
    setTotalBalance(income - expense);
  };

  // Rendering the dashboard
  return (
    <div className="dashboard">
      <h1>All Transactions</h1>
      <div>Total Income: ${totalIncome.toFixed(2)}</div>
      <div>Total Expense: ${totalExpense.toFixed(2)}</div>
      <div>Total Balance: ${totalBalance.toFixed(2)}</div>
      <Chart data={graphData} />
    </div>
  );
}

export default Dashboard;
