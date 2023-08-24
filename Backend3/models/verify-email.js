// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models

module.exports = (mongoose, Mongoose) => {
  // This section contains the properties of your model, mapped to your collection's properties.
  // Learn more here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const schema = Mongoose.Schema(
    {
      email: String,
      token: String,
      createdAt: Date,
      updatedAt: Date
    },
    {
      timestamps: true
    }
  );

  return mongoose.model("verifyEmail", schema, "VerifyEmail");
};
