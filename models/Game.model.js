const { Schema, model } = require("mongoose");

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    min_players: {
      type: Number,
      required: true,
    },
    max_players: {
      type: Number,
      required: true,
    },
    min_playtime: {
      type: Number,
      required: true,
    },
    min_age: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    price: {
      type: Number,
    },
    image_url: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Game = model("Game", GameSchema);

module.exports = Game;
