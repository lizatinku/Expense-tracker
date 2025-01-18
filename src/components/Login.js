import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import { auth, db } from "../firebaseConfig"; 

function Login() {
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null); 

  const toggleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User logged in:", user);

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data()); 
        console.log("User data from Firestore:", userDoc.data());
      } else {
        console.log("No user data found in Firestore.");
      }

      toggleLoginModal(); 
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <>
      {isLoginOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                Login
              </button>
            </form>
            <button className="close-button" onClick={toggleLoginModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {userData && (
        <div>
          <h3>Welcome, {userData.name}</h3>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </>
  );
}

export default Login;
