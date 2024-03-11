require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const db = require("./config/database");
const isAuthenticated = require("./src/middlewares/auth");
const authRouter = require("./src/routers/user");
const chatRouter = require("./src/routers/chat");
const messageRouter = require("./src/routers/message");
const port = process.env.PORT;

console.log(process.env.PORT);

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", isAuthenticated, chatRouter);
app.use("/api/v1/message", isAuthenticated, messageRouter);

io.on("connection", (socket) => {
  console.log("Connected to " + socket.address);

  socket.on("message", (data) => {
    console.log("message received", JSON.stringify(data));

    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

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
