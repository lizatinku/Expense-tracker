import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import StockData from './components/StockData';
import './App.css';
import './components/StockData.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('date');

  const addExpense = (expense) => {
    if (editingExpense) {
      setExpenses(
        expenses.map((exp) =>
          exp.id === editingExpense.id ? { ...expense, id: editingExpense.id } : exp
        )
      );
      setEditingExpense(null);
    } else {
      setExpenses([...expenses, { ...expense, id: Date.now() }]);
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const startEditing = (expense) => {
    setEditingExpense(expense);
  };

  const handleSignIn = async () => {
    try {
      await logIn(email, password); 
      alert("Logged in successfully!");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div className="app-container">
      <header className="header-container">
        <h1>Expense Tracker</h1>
      </header>
      <div className="main-content">
        <div className="form-section">
          <div className="spacing-after-form">
            <ExpenseForm 
              addExpense={addExpense} 
              editingExpense={editingExpense} 
              deleteExpense={deleteExpense} 
            />
          </div>
          <div className="stock-data-section">
            <StockData />
            <div className="stock-buttons-container">
            </div>
          </div>
        </div>
        <div className="expense-list">
          <h2>Expense List</h2>
          <ExpenseList 
            expenses={expenses}
            sortCriteria={sortCriteria}
            onEdit={startEditing}
            onDelete={deleteExpense}
            onSortChange={(criteria) => setSortCriteria(criteria)} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;