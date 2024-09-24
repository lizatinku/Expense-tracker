import React, { useState } from 'react';
import { exportToCSV } from '../utils/exportToCSV';
import { exportToPDF } from '../utils/exportToPDF';
import './ExpenseList.css'; // Ensure you have the correct CSS file

function ExpenseList({ expenses, onEdit, onDelete }) {
  const [sortCriteria, setSortCriteria] = useState('date'); // Default sort by date

  // Function to handle sorting
  const sortExpenses = (criteria) => {
    return [...expenses].sort((a, b) => {
      if (criteria === 'amount') {
        return a.amount - b.amount;
      } else if (criteria === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return a.location.localeCompare(b.location); // Changed 'where' to 'location'
      }
    });
  };

  // Function to handle CSV export
  const handleExportCSV = () => {
    exportToCSV(expenses);
  };

  // Function to handle PDF export
  const handleExportPDF = () => {
    exportToPDF(expenses);
  };

  return (
    <div className="expense-list">
      <div className="header">
        <h2>Table of Expenses</h2>
        <div className="sort-options">
          <label>
            Sort by:
            <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
              <option value="date">Date</option>
              <option value="location">Location</option>
              <option value="amount">Amount</option>
            </select>
          </label>
        </div>
        <div className="export-buttons">
          <button onClick={handleExportCSV}>Export to CSV</button>
          <button onClick={handleExportPDF}>Export to PDF</button>
        </div>
      </div>
      <ul>
        {sortExpenses(sortCriteria).map((expense) => (
          <li key={expense.id}>
            <span>{expense.date}</span>
            <span>{expense.location}</span> {/* Changed 'where' to 'location' */}
            <span>${expense.amount.toFixed(2)}</span>
            <span>{expense.category}</span>
            <div className="expense-actions">
              <button onClick={() => onEdit(expense)}>Edit</button>
              <button onClick={() => onDelete(expense.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;