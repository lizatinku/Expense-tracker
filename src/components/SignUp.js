import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

function SignUp() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const toggleSignUpModal = () => {
    setIsSignUpOpen(!isSignUpOpen);
    setError(""); 
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), { name, email, createdAt: new Date() });

      console.log("User registered:", user);
      toggleSignUpModal(); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <button className="sign-up-button" onClick={toggleSignUpModal}>
        Sign Up
      </button>

      {isSignUpOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-text">{error}</p>}
              <button type="submit" className="submit-button">
                Sign Up
              </button>
            </form>
            <button className="close-button" onClick={toggleSignUpModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
