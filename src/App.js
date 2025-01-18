import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import StockData from "./components/StockData";
import "./App.css";
import "./components/StockData.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("date");
  const [user, setUser] = useState(null); 
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); 

  const toggleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsSignUpOpen(false); 
  };

  const toggleSignUpModal = () => {
    setIsSignUpOpen(!isSignUpOpen);
    setIsLoginOpen(false); 
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth); 
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
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
        <header className="header-container">
          <h1>Expense Tracker</h1>
          <div className="auth-buttons">
            {!user ? (
              <>
                <button className="sign-up-button" onClick={toggleSignUpModal}>
                  Sign Up
                </button>
                <button className="login-button" onClick={toggleLoginModal}>
                  Login
                </button>
              </>
            ) : (
              <>
                <span>Welcome, {user.email}</span>
                <button className="sign-out-button" onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            )}
          </div>
        </header>

        {isLoginOpen && <Login onClose={toggleLoginModal} />}
        {isSignUpOpen && <SignUp onClose={toggleSignUpModal} />}

        <Routes>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;