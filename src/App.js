import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import StockData from "./components/StockData";
import "./App.css";
import "./components/StockData.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("date");
  const [user, setUser] = useState(null); // State to track the current user
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State to control the login modal

  const toggleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

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
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const startEditing = (expense) => {
    setEditingExpense(expense);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Header Section */}
        <header className="header-container">
          <h1>Expense Tracker</h1>
          <div className="auth-buttons">
            {!user ? (
              <>
                {/* Show Sign Up and Login buttons when no user is logged in */}
                <SignUp />
                <button className="login-button" onClick={toggleLoginModal}>
                  Login
                </button>
              </>
            ) : (
              <>
                {/* Show Sign Out button when a user is logged in */}
                <span>Welcome, {user.email} </span>
                <button className="sign-out-button" onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            )}
          </div>
        </header>

        {/* Login Modal */}
        {isLoginOpen && <Login onClose={toggleLoginModal} />}

        {/* Routes */}
        <Routes>
          {/* Main Expense Tracker */}
          <Route
            path="/"
            element={
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
            }
          />

          {/* Sign Up Page */}
          <Route path="/signup" element={<SignUp />} />

          {/* Login Page */}
          <Route path="/login" element={<div />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;