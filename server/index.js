const https = require("https");
const http = require("http");
const fs = require("fs");
const io = require("socket.io");
// const { loadChatUsers } = require("./src/models/chatUsers/chatUsers.modal");

require("dotenv").config();

const app = require("./src/app");

const { mongoConnect } = require("./src/services/mongo");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const socketSever = io(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const sockets = require("./src/socket");

async function startServer() {
  // await loadChatUsers();
  await mongoConnect();
  sockets.listen(socketSever);

  server.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
  });
}

startServer();
