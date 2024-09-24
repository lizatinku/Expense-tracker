import React, { useState, useEffect } from 'react';

function ExpenseForm({ addExpense, editingExpense, deleteExpense }) {
  const [expense, setExpense] = useState({
    date: '',
    location: '',
    amount: '',
    category: ''
  });

  useEffect(() => {
    if (editingExpense) {
      setExpense(editingExpense);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!expense.date || !expense.location || !expense.amount || !expense.category) {
      alert('Please fill out all fields');
      return;
    }

    // Ensure amount is a number
    const expenseToAdd = {
      ...expense,
      amount: parseFloat(expense.amount) // Convert amount to a number
    };

    // Call addExpense function and reset form
    addExpense(expenseToAdd);
    setExpense({ date: '', location: '', amount: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-row">
        <label>
          Date:
          <input
            type="date"
            value={expense.date}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={expense.location}
            onChange={(e) => setExpense({ ...expense, location: e.target.value })}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          />
        </label>
        <label>
          Category:
          <select
            value={expense.category}
            onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          >
            <option value="">Select a category</option>
            <option value="groceries">Groceries</option>
            <option value="restaurants">Restaurants</option>
            <option value="rental payments">Rental payments</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="educational">Educational</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>
      <button type="submit">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
      {editingExpense && (
        <button type="button" onClick={() => deleteExpense(editingExpense.id)}>Delete Expense</button>
      )}
    </form>
  );
}

export default ExpenseForm;