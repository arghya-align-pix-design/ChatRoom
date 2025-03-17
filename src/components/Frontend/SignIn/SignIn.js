import React, { useState, useEffect } from "react";
import styles from "./SignIn.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mail = location.state?.email || ""; // Default to empty if no email passed

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initialize email state if mail is provided
  useEffect(() => {
    if (mail) {
      setEmail(mail);
    }
  }, [mail]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/auth/signin", { email, password });

      // Save the token for authenticated requests
      localStorage.setItem("token", response.data.token);

      // Pass the shortName to the chatroom
      navigate("/ChatRoom", { state: { shortName: response.data.shortName } });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Sign-In failed!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back</h2>
        <form onSubmit={handleSignIn} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
