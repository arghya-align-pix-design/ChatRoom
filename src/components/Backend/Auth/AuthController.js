const User = require("../User/models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
//const crypto = require("crypto");
const jwt = require("jsonwebtoken");
//const Otp = require("../User/models/Otp.js");
const dotenv = require("dotenv");
dotenv.config();
const userOtpMap = new Map();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // App password
  },
});

const sendOtp = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new user with email only
      user = new User({ firstName, lastName, email });
      await user.save();
    }
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //userOtpMap.set(email,otp);
    //console.log(`Generated OTP: ${otp} for email: ${email}`);

    // Save OTP to the database
    userOtpMap.set(email, otp);

    // Send the OTP via email
    await transporter.sendMail({
      from: '"Your App" <your-email@gmail.com>', // Sender address
      to: email, // Recipient email
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });
    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
};

const validateOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {

    // Find user based on OTP (assuming OTP and email were saved in the DB)
    //const user = await User.findOne({ email, otp });

    if (!email || !otp) {
      return res.status(400).json({ message: "Invalid email or OTP" });
    }
    console.log(`Validating OTP for email: ${email}`);

    const savedOtp = userOtpMap.get(email).toString();
    const ver = otp.toString();
    //compare otp
    if (savedOtp !== ver) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Clear the OTP after successful validation
    userOtpMap.delete(email); // Optional: Remove OTP after validation
    
    res.status(200).json({
      message: "OTP validated successfully",
      //   token, // Send the token to the client
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Endpoint to set a password .

const setPassword = async (req, res) => {
  const { 
    fname,
    lname, 
    email, 
    password,
    shortName  
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user.email);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Update the user's password
    user.password = hashedPassword;
    user.firstName = fname;
    user.lastName = lname;
    user.shortName= shortName;

    console.log(user.email, user.password);
    console.log(user.firstName, user.lastName, user.shortName);

    user.isVerified = true; // Mark user as verified
    await user.save();
    console.log("User is saved");

    return res.status(200).json({ message: "Password set successfully!" });
  } catch (err) {
    console.error("Error in /set-password:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ 
      id: user._id, 
      email: user.email,
    }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ 
      message: "Login successful", 
      token,
      shortName:user.shortName, });
      console.log(token,user.shortName);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { sendOtp, validateOtp,  setPassword, signIn};

// Verify OTP route
// router.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;

//   // Check if OTP is valid
//   if (otpStore[email] !== parseInt(otp)) {
//     return res.status(400).json({ error: "Invalid OTP. Please try again." });
//   }

//   // Create user after successful verification
//   const newUser = new User({ email, password });
//   await newUser.save();

//   delete otpStore[email]; // Remove OTP after verification
//   res.status(201).json({ message: "User registered successfully!" });
// });
