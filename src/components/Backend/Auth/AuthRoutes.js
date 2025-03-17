const express = require("express");
const { sendOtp,validateOtp, signIn , setPassword } = require("./AuthController");
const router = express.Router();
//const authMiddleware = require("../Middlewares/AuthMiddleware.js");
//need theauthorizer to use it before login to chatroom

router.post("/send-otp", sendOtp);

router.post("/validate-otp", validateOtp);

router.post("/set-password",setPassword) //authMiddleware , 

router.post("/signIn",signIn);

module.exports = router;