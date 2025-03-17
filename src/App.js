// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/Frontend/ChatRoom/ChatRoom";
import SignUp from "./components/Frontend/SignUp/SignUp";
import OtpValidation from "./components/Frontend/SignUp/OtpValidation";
import SignIn from "./components/Frontend/SignIn/SignIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} /> 
        <Route path="/validate-otp" element={<OtpValidation />} /> 
        <Route path="/signIn" element={ <SignIn/>} />  
        <Route path="/ChatRoom" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
