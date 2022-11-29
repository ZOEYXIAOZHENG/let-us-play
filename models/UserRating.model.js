const { Schema, model } = require("mongoose");

const UserRatingSchema = new Schema(
  {
    game: {type: Schema.Types.ObjectId, ref: 'Game'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserRating = model("UserRating", UserRatingSchema);

module.exports = UserRating;
