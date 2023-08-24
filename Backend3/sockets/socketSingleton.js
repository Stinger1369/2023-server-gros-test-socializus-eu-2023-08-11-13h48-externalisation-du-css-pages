const { Server } = require("socket.io");
const chalk = require("chalk");
const crypto = require("crypto-js"); // Ajout de la bibliothèque de cryptage

class SocketSingleton {
  constructor() {
    if (!SocketSingleton.instance) {
      this.io = null;
      SocketSingleton.instance = this;
    }

    return SocketSingleton.instance;
  }

  init(httpServer) {
    if (!this.io) {
      this.io = new Server(httpServer, {
        cors: {
          origin: "*",
          credentials: true,
        },
      });
      this.listen();
    }
  }

  getIO() {
    if (!this.io) {
      throw new Error("Must call init() before getIO()");
    }
    return this.io;
  }

  listen() {
    this.io.on("connection", (socket) => {
      console.log(
        chalk.yellow(
          `New socket with id ${socket.id} connected the socket server`
        )
      );

      // Utilisateur en ligne
      socket.on("online", (username) => {
        console.log(chalk.green(`${username} is online`));

        this.io.emit("user_online", username);
      });

      // Utilisateur hors ligne (déconnecté)
      socket.on("disconnect", (username) => {
        console.log(chalk.red(`${username} is offline`));

        this.io.emit("user_offline", username);
      });

      // Rejoindre une salle de chat
      socket.on("join_room", (data) => {
        console.log(
          chalk.blue(`Socket with id ${socket.id} joined room ${data.room}`)
        );

        socket.join(data.room);
      });

      // Envoyer un message
      socket.on("send_message", (data) => {
        console.log(chalk.orange(`New message sent in room ${data.room}`));

        const decryptedMessage = crypto.AES.decrypt(
          data.message,
          process.env.CRYPTO_SECRET
        ).toString();

        this.io.to(data.room).emit("receive_message", {
          author: data.author,
          message: decryptedMessage,
        });
      });

      // Recevoir une nouvelle notification
      socket.on("new notification", (data) => {
        console.log(chalk.green(`New notification for ${data.to}`));

        this.io.to(data.to).emit("receive_notification", data);
      });

      // Recevoir un nouveau message
      socket.on("new message", (data) => {
        console.log(chalk.blue(`New message for ${data.to}`));

        this.io.to(data.to).emit("receive_message", data);
      });
    });
  }
}

const instance = new SocketSingleton();

module.exports = instance;
