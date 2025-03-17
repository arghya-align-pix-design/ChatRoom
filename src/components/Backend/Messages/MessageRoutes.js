const express = require('express');
const Message = require('../Messages/MessagesModel');

const router = express.Router();

// POST /send-message - Send a message
router.post('/send-message', async (req, res) => {
  // Logic to save the message in the database
});

router.get("/get-messages",async(req,res) =>{
 //logic to getmessages
});

module.exports = router;
