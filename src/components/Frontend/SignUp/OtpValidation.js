import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const OtpValidation = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpValidated, setOtpValidated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    //If email isnt provided, back to signup
    navigate("/signup");
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/validate-otp",
        { email, otp }
      );

      setSuccess(response.data.message); // Show success message
      setOtpValidated(true);
      // }
    } catch (err) {
      setError(err.response?.data?.message || "Error validating OTP"); // Show error
    }
  };

  // Handle password setup
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // const token = localStorage.getItem("jwtToken");

    try {
      
      const shortName = `${fname[0]}${lname[0]}`.toUpperCase();

      const response = await axios.post(
        "http://localhost:4000/api/auth/set-password",
        {
          fname,
          lname,
          email,
          password,
          shortName,
        }
      );

      setSuccess(response.data.message); // Show success message
      setTimeout(() => navigate("/signIn",{state:{email}}), 2000); // Redirect to chatroom
    } catch (err) {
      setError(err.response?.data?.message || "Error setting password");
    }
  };

  return (
    <div className="otp-validation">
      <h2>OTP Validation</h2>
      {!otpValidated && (
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Validate</button>
        </form>
      )}

      {otpValidated && (
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Add Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />{" "}
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Set Details</button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default OtpValidation;
