const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const Game = require("../models/Game.model");

/* GET home page */
router.get("/", (req, res, next) => {
  return Game.find()
    .then((games) => {
      res.render("homepage", { games });
    })
    .catch((error) => {
      console.log("Error while getting the games from the DB: ", error);
      next(error);
    });
});
// Get all games
router.get("/games", (req, res, next) => {
  return Game.find().then((games) => {
    const newArr = []
    console.log("GAMES",games[0])
    games.forEach((game)=> {
      newArr.push({...game._doc, rating: Math.floor(game.rating)})
    })
    return newArr
  })
    .then((games) => {
      res.render("games", {games});
    })
    .catch((error) => {
      console.log("Error while getting the games from the DB: ", error);
      next(error);
    });
});

// GET single game page
router.get("/games/:id", (req, res) => {
  console.log("req: ", req.params.id)
  Game.findById(req.params.id).then((game) => res.render("game-page", {game}))
});

//GET users profile
router.get("/profile", (req, res) => {
  User.findById(req.session.currentUser._id).populate("owned").populate("played").populate("wishlist")
  .then((user) => {
    console.log(user)
    res.render("profile", {user})})
});

//Edit user's profile
router.get('/profile/edit', (req, res, next) => {
  console.log(req.session.currentUser)

  User.findById(req.session.currentUser).populate("owned").populate("played").populate("wishlist")
    .then(user => {
      res.render("edit-profile", { owned, played, wishlist } = user)
    })
    .catch(error => next(error));
});

router.post('/profile/edit', (req, res, next) => {
  const { owned, played, wishlist } = req.body;

  User.findByIdAndUpdate(req.params.id, { owned, played, wishlist }, { new: true })
    .then(() => res.redirect(`/profile`)) // go to the details page to see the updates
    .catch(error => next(error));
});

 router.post('/games/search', async (req, res) => {
  console.log(req.body.query)
  const game = await Game.find({name: req.body.query})
  console.log(game[0])
  res.render("games", { games: game[0] })

});

router.post('/add-game/:gameId', async (req, res) => {
  const list = req.body.list
  console.log("list", list)
  const gameId = req.params.gameId
  console.log("game id", gameId)
  const game = await Game.findById(gameId)
  if (req.session.currentUser) {
    if (list === "owned") {
      await User.findByIdAndUpdate(req.session.currentUser._id, { $push: { owned: game._id } })
    } else if (list === "played") {
      await User.findByIdAndUpdate(req.session.currentUser._id, { $push: { played: game._id } })
    } else if (list === "wishlist") {
      await User.findByIdAndUpdate(req.session.currentUser._id, { $push: { wishlist: game._id } })
    }
    console.log(req.session.currentUser)
    res.render("game-page", { game, message: `${game.name} was added to your "${list}" list!`});
  } else {
    res.redirect(`/login`)
  }
});
module.exports = router;
