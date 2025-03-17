const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./components/Backend/Auth/AuthRoutes');
const messageRoutes = require('./components/Backend/Messages/MessageRoutes');
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());  // Middleware to parse JSON
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*", // Allow the client to connect
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for a room join event
  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);
  });

  socket.on("chatmessage", (data) => {
    console.log(`Message received in room ${data.room}: ${data.text} by ${data.sender}`);
    console.log(data);
    //io.to(room).emit("chat message", msg); // Send to all in the room
    // Broadcast the message to all other connected clients
    socket.to(data.room).emit("chatmessage", { text:data.text, sender: data.sender });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/auth', authRoutes);  // Any route that starts with /auth will use authRoutes.js
app.use('/api/message', messageRoutes);  // Any route that starts with /message will use messageRoutes.js

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
