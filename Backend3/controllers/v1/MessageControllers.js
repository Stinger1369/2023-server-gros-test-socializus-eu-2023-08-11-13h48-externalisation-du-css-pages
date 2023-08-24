const Activity = require("../models/Activity");
const User = require("../models/User");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const CryptoJS = require("crypto-js");

//🇫🇷 Ajouter un message à une activité //🇬🇧 Adding a message to an activity
const activityMessage = async (req, res) => {
  const { activityId } = req.params;
  const { text, sender } = req.body;

  try {
    //🇫🇷 Vérifier si l'activité existe //🇬🇧 Check if the activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    //🇫🇷 Vérifier si l'expéditeur est un utilisateur valide //🇬🇧 Check if the sender is a valid user
    const user = await User.findById(sender);
    if (!user) return res.status(404).json({ error: "Sender not found" });

    //🇫🇷 Vérifier si l'expéditeur participe à l'activité //🇬🇧 Check if the sender participates in the activity
    const isParticipant = activity.participants.find(
      (participant) => participant.user.toString() === sender
    );
    if (!isParticipant)
      return res
        .status(400)
        .json({ error: "Sender is not a participant in this activity" });

    //🇫🇷 Chiffrer le texte du message //🇬🇧 Encrypt message text
    const ciphertext = CryptoJS.AES.encrypt(text, "secret key").toString();

    //🇫🇷 Créer un nouveau message //🇬🇧 Create a new message
    const message = new Message({ text: ciphertext, sender });
    activity.messages.push(message);
    await activity.save();

    //🇫🇷 Notifier les participants de l'ajout d'un nouveau message //🇬🇧 Notify participants when a new message is added
    const participants = activity.participants.map(
      (participant) => participant.user
    );

    //🇫🇷 Notifier les participants de l'ajout d'un nouveau message //🇬🇧 Notify participants when a new message is added
    const notification = new Notification({
      recipient: participants,
      sender,
      type: "new_message",
      activity: activityId,
      message: message._id,
    });
    await notification.save();

    res.json({ message: "Message added successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

//🇫🇷 Obtenir les messages d'une activité //🇬🇧 Get messages from an activity
const getMessage = async (req, res) => {
  const { activityId } = req.params;

  try {
    //🇫🇷 Vérifier si l'activité existe //🇬🇧 Check if the activity exists
    const activity = await Activity.findById(activityId)
      .populate("messages")
      .exec();
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    res.json(activity.messages);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
//🇫🇷 Supprimer un message d'une activité //🇬🇧 Delete a message from an activity
router.delete("/activity/:activityId/message/:messageId", async (req, res) => {
  const { activityId, messageId } = req.params;
  const { userId } = req.body;

  try {
    //🇫🇷 Vérifier si l'activité existe //🇬🇧 Check if the activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    //🇫🇷 Vérifier si le message existe //🇬🇧 Check if the message exists
    const message = activity.messages.find(
      (message) => message._id.toString() === messageId
    );
    if (!message) return res.status(404).json({ error: "Message not found" });

    //🇫🇷 Vérifier si l'utilisateur est l'auteur du message //🇬🇧 Check if the user is the author of the message
    if (message.sender.toString() !== userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized to delete this message" });
    }

    //🇫🇷 Supprimer le message de l'activité //🇬🇧 Remove message from activity
    activity.messages = activity.messages.filter(
      (message) => message._id.toString() !== messageId
    );
    await activity.save();

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
