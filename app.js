require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const db = require("./config/database");
const isAuthenticated = require("./src/middlewares/auth");
const authRouter = require("./src/routers/user");
const chatRouter = require("./src/routers/chat");
const messageRouter = require("./src/routers/message");
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = socketIO(server);

// Serve static files 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Set the view engine and the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Render the 'home.ejs' template
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", isAuthenticated, chatRouter);
app.use("/api/v1/message", isAuthenticated, messageRouter);

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages
  socket.on("message", (data) => {
    console.log("Message received:", data);
    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const startApp = async () => {
  console.log("Testing the database connection..");
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    server.listen(port, () => {
      console.log(`Server is up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startApp();
