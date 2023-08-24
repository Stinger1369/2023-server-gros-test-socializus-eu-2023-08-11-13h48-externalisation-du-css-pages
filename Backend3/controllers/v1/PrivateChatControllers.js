const Message = require("../../models/Message");
const Notification = require("../../models/Notification");
const PrivateChat = require("../../models/PrivateChat");
const crypto = require("crypto-js");
const socketSingleton = require("../../sockets/socketSingleton");

const sendPrivateMessage = (req, res) => {
  const { from, avatar, to, text } = req.body;

  // Cryptage du message
  const encryptedText = crypto.AES.encrypt(
    text,
    process.env.CRYPTO_SECRET
  ).toString();

  const message = new Message({ from, avatar, to, text: encryptedText });

  // Obtenez l'instance de socket.io
  const io = socketSingleton.getIO();

  message
    .save()
    .then((message) => {
      // Ajout du message à la conversation privée entre les deux utilisateurs
      PrivateChat.findOneAndUpdate(
        {
          $or: [
            {
              user1: from,
              user2: to,
            },
            {
              user1: to,
              user2: from,
            },
          ],
        },
        { $push: { messages: message._id } },
        { upsert: true, new: true }
      )
        .then((privateChat) => {
          // Envoi de la notification au destinataire du message
          const notification = new Notification({
            author: from,
            recipient: to,
            message: `Vous avez reçu un nouveau message privé de ${from}`,
            type: "private message",
            location: "/private-chat",
          });
          notification.save();

          io.to(to).emit("new_notification", notification); // Envoi de la notification via socket.io

          io.to(to).emit("receive_message", message); // Envoi du message via socket.io
        })
        .catch((err) => res.status(400).json({ success: false, err }));
    })
    .catch((err) => res.status(400).json({ success: false, err }));
};
const deletePrivateMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    // Déchiffrer le message
    const decryptedText = crypto.AES.decrypt(
      message.text,
      process.env.CRYPTO_SECRET
    ).toString(CryptoJS.enc.Utf8);
    message.text = decryptedText;

    await message.remove();
    res.json({ message: "Message was successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
};

const modifyPrivateMessage = async (req, res) => {
  try {
    const { messageId, newText } = req.body;

    // Récupération du message
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(400).json({
        error: "Le message n'existe pas.",
      });
    }

    // Cryptage du nouveau message
    const encryptedText = crypto.AES.encrypt(
      newText,
      process.env.CRYPTO_SECRET
    ).toString();

    // Modifier le message
    message.text = encryptedText;
    await message.save();

    return res.status(200).json({
      success: "Message modifié avec succès.",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      error: "Erreur serveur. Veuillez réessayer plus tard.",
    });
  }
};

const getPrivateMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).populate('from', 'username avatar').populate('to', 'username');
    const decryptedMessages = messages.map((message) => {
      const decryptedText = crypto.AES.decrypt(
        message.text,
        process.env.CRYPTO_SECRET
      ).toString(CryptoJS.enc.Utf8);
      return {
        ...message._doc,
        text: decryptedText
      };
    });
    res.send(decryptedMessages);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getPrivateChatHistory = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    // Récupération de la conversation privée entre ces deux utilisateurs
    const privateChat = await PrivateChat.findOne({
      $or: [
        {
          user1: user1,
          user2: user2,
        },
        {
          user1: user2,
          user2: user1,
        },
      ],
    }).populate("messages");

    if (!privateChat) {
      return res.status(404).json({
        error:
          "Aucune conversation privée trouvée entre ces deux utilisateurs.",
      });
    }

    // Déchiffrer tous les messages
    privateChat.messages = privateChat.messages.map((message) => {
      const decryptedText = crypto.AES.decrypt(
        message.text,
        process.env.CRYPTO_SECRET
      ).toString();
      message.text = decryptedText;
      return message;
    });

    return res.status(200).json({
      success: "L'historique des messages privés a été récupéré avec succès.",
      chatHistory: privateChat.messages,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      error: "Erreur serveur. Veuillez réessayer plus tard.",
    });
  }
};

module.exports = {
  sendPrivateMessage,
  deletePrivateMessage,
  modifyPrivateMessage,
  getPrivateMessages,
  getPrivateChatHistory,
};
