import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("OTP sent to your email. Please check your inbox.");
        setTimeout(() => {
          navigate("/validate-otp", { state: { email } }); // Navigate with email state
        }, 1000);
        setFirstName("");
        setLastName("");
        setEmail("");
      } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <center>
        <h2 className={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>First Name</label>
          <input
            type="text"
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label className={styles.label}>Last Name</label>
          <input
            type="text"
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <span className={styles.error}>{error}</span>}

          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
      </center>
    </div>
  );
};

export default SignupForm;


// import React, { useState } from "react";
// import styles from "./SignUp.module.css";
// //import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SignupForm = () => {
//   const [email, setEmail] = useState("");
//   //const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   //const [success, setSuccess] = useState("");
//   const navigate = useNavigate();


//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     setError("");
//     //setSuccess("");

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:4000/api/auth/send-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("OTP sent to your email. Please check your inbox.");
//         setTimeout(() => {
//           navigate("/validate-otp", { state: { email } }); // Navigate with email state
//         }, 1000); // Short delay for better user experience
//         setEmail(""); // Clear the input field
//       } else {
//         setError(data.message || "An error occurred. Please try again.");
//       }
//     } catch (err) {
//       setError("Failed to connect to the server. Please try again.");
//     }

//     setError(""); // Clear the error if validation passes
//     // onSubmit({ email });
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     if (error) setError(""); // Clear the error when the user starts typing
//   };

//   return (
//     <div className={styles.container}><center>
//       <h2 className={styles.title}>Sign Up</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <label className={styles.label}>Email</label>
//         <input
//           type="email"
//           className={`${styles.input} ${error ? styles.errorInput : ""}`}
//           value={email}
//           onChange={handleEmailChange}
//           required
//         />
//         {error && <span className={styles.error}>{error}</span>}

       

//         <button type="submit" className={styles.button}>
//           Sign Up
//         </button>
//       </form></center>
//     </div>
//   );
// };

// export default SignupForm;
