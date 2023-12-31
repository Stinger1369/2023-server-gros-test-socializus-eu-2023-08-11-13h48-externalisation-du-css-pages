//Message Model
// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models

module.exports = (mongoose, Mongoose) => {
  // This section contains the properties of your model, mapped to your collection's properties.
  // Learn more here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Schema = new Mongoose.Schema(
    {
      from: { type: String, required: true }, // user that send messages
      avatar: { type: String, required: true }, // display avatar
      to: { type: String, required: true }, // user that receive messages.
      text: { type: String, required: true }, // message
      read: { type: Boolean, default: false }, // Allow to know if the message  has been read
    },
    {
      timestamps: true, // Created and Updated  messages
    }
  );

  return mongoose.model("Message", Schema, "Message");
};
