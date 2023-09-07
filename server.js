const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (e.g., your React frontend)
app.use(express.static("client"));

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for incoming messages
  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
