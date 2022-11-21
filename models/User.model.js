const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    owned: [{type: Schema.Types.ObjectId, ref: 'Game'}],
    played: [{type: Schema.Types.ObjectId, ref: 'Game'}],
    wishlist: [{type: Schema.Types.ObjectId, ref: 'Game'}],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
