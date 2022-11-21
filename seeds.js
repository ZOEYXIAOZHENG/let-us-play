// Retrieve an access token
// const axios = require("axios")

// const clientId= process.env.CLIENT_ID
// const clientSecret= process.env.CLIENT_SECRET

// const api= `https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&client_id=${clientId}`
// console.log(api)

// axios.get(api)
// .then(response => {
// console.log(response.data)
// .catch(err => next(err))
// })


const mongoose = require("mongoose");
const Game = require("./models/Game.model");
const User = require("./models/User.model");
require('dotenv').config();

const MONGO_URI =
  process.env.MONGODB_URI;

const games = [
  {
    title: "Settlers of Catan",
  description: "Description",
  players: 2,
  duration: 60,
  rating: 7,
  price: 27,
  imgUrl: "https://loremflickr.com/300/400"
  },
  {
    title: "Wingspan",
  description: "Description",
  players: 3,
  duration: 60,
  rating: 7,
  price: 27,
  imgUrl: "https://loremflickr.com/300/400"
  },
  {title: "Wingspan",
  description: "Description",
  players: 4,
  duration: 60,
  rating: 7,
  price: 27,
  imgUrl: "https://loremflickr.com/300/400"
  },
  {title: "Wingspan",
  description: "Description",
  players: 5,
  duration: 60,
  rating: 7,
  price: 27,
  imgUrl: "https://loremflickr.com/300/400"
  },
  {title: "Wingspan",
  description: "Description",
  players: 6,
  duration: 60,
  rating: 7,
  price: 27,
  imgUrl: "https://loremflickr.com/300/400"
  },
  {title: "Wingspan",
  description: "Description",
  players: 7,
  duration: 60,
  rating: 7,
  price: 27,
  imgUrl: "https://loremflickr.com/300/400"
  },
  {title: "Wingspan",
  description: "Description",
  players: 8,
  duration: 60,
  rating: 7,
  price: 27,
  imgUrl: "https://loremflickr.com/300/400"
  },
  {title: "Wingspan",
  description: "Description",
  players: 9,
  duration: 60,
  rating: 7,
  price: 27,
  imgUrl: "https://loremflickr.com/300/400"
  },
  {title: "Wingspan",
  description: "Description",
  players: 10,
  duration: 60,
  rating: 7,
  price: 27,
  imgUrl: "https://loremflickr.com/300/400"
  }
]
const users = [
  {
    username: "John",
    email: "john@john.de",
    password: "LongPassword123"
  },
  {
    username: "Jenny",
    email: "jenny@jenny.de",
    password: "LongPassword123"
  },
  {
    username: "Jack",
    email: "jack@jack.de",
    password: "LongPassword123"
  },

]

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

    // Create new documents in the books collection
    const createdGames = Game.create(games);
    const createdUsers = User.create(users);
    return {createdGames, createdUsers}
  })
  .then((response) => {
    console.log("Done creating seeds")

    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log("DB connection closed!");
  })
  .catch((err) => {
    console.log(`An error occurred while creating games from the DB: ${err}`);
  });
