const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.io = io;
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/socket", (req, res) => {
  io.emit("msg", "New Data Coming");
  res.end();
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
