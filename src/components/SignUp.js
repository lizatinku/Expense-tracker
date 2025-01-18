import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, { displayName: name });

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      console.log("User registered and data saved:", user);

      // Redirect to the home page
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.error("Error signing up:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign Up</h2>
        <form>
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
          <button type="button" className="submit-button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;