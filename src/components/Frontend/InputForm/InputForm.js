// src/components/InputForm.js
import React, { useState } from "react";
import styles from "./InputForm.module.css"

const InputForm = ({ onSendMessage }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState('');


  const maxMessageLength = 255; // Set character limit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      setError("Message can't be empty.");
      return;
    }

    if (input.length > maxMessageLength) {
      setError(`Message can't exceed ${maxMessageLength} characters.`);
      return;
    }


    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
    setError(''); // Clear the error message whenever the user types
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type a message..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Send
      </button>
    </form>
  );
};

// const styles = {
 
// };

export default InputForm;
