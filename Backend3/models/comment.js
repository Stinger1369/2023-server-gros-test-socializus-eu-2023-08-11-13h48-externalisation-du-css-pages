module.exports = (mongoose, Mongoose) => {
  const schema = Mongoose.Schema(
    {
      comment: String,
      image: String,
      location: {
        type: {
          latitude: Number,
          longitude: Number,
          latitudeDelta: Number,
          longitudeDelta: Number,
        },
      },
      image: String,
      user: { type: Mongoose.Schema.Types.ObjectId, ref: "user" },
      activity_id: String,
      createdAt: Date,
      updatedAt: Date,
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("comment", schema, "Comment");
};
