const { Server } = require("socket.io");
const chalk = require("chalk");

//🇫🇷Initialiser et configurer un serveur de socket en utilisant la bibliothèque Socket
const initSocketServer = (httpServer) => {
  //🇬🇧 Server socket connect //🇫🇷 Connexion socket serveur
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(
      chalk.yellow(
        `New socket with id ${socket.id} connected the socket server` //🇫🇷afficher un message dans la console lorsque un nouveau socket se connecte au serveur de socket.
      )
    );
    //🇬🇧Allow to join room //🇫🇷Autoriser à rejoindre le salon

    //🇬🇧Allow to send messages //🇫🇷Autoriser l'envoi de messages
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", {
        author: data.author,
        message: data.message,
      });
      socket.broadcast.emit("receive_message", () => {
        console.log(
          "rjtlhzrtizrhtouizrthtoihzroithzriothzrtiorhiozrthzrithzriothzrthzrito"
        );
      });
    });
    //🇬🇧 Allow to disconnect when user exit //🇫🇷 Autoriser la déconnexion lors de la sortie de l'utilisateur
    socket.on("disconnect", () => {
      console.log(chalk.red(`Socket with id ${socket.id} disconnected`));
    });
  });
};

module.exports = initSocketServer;
