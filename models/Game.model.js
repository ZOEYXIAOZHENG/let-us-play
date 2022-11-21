const { Schema, model } = require("mongoose");

const GameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    players: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    price: {
      type: Number,
    },
    imgUrl: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Game = model("Game", GameSchema);

module.exports = Game;
