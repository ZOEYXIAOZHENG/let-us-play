const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const Game = require("../models/Game.model");

/* GET home page */
router.get("/", (req, res, next) => {
  return Game.find()
    .then((games) => {
      let homeGames=[];

       for(let i = 0; i< 8; i++){
        let duplicate = false;
       const random = games[Math.floor(Math.random() * games.length)];

       for (let homeGame of homeGames) {
        if(homeGame._id === random._id){
          i--;
          duplicate = true;
        }
      }
      if (!duplicate){
          homeGames.push(random);
      }
       }

      res.render("homepage", {
          games: homeGames,
          user: req.session.currentUser,
      });
    })
    .catch((error) => {
      console.log("Error while getting the games from the DB: ", error);
      next(error);
    });
});
// Get all games
router.get("/games", (req, res, next) => {
  return Game.find().then((games) => {
      res.render("games", { games, user: req.session.currentUser });
    })
    .catch((error) => {
      console.log("Error while getting the games from the DB: ", error);
      next(error);
    });
  });


router.post('/games/:gameId/delete', (req, res, next) => {
  const gameId = req.params.gameId
  Game.findByIdAndDelete(gameId)
    .then((x) => { res.redirect("/profile")})
    .catch(error => next(error));
});

// GET single game page
router.get("/games/:id", (req, res) => {
  Game.findById(req.params.id).then((game) =>
    res.render("game-page", {user: req.session.currentUser, game}))
});

//GET users profile
router.get("/profile", (req, res) => {
  User.findById(req.session.currentUser).populate("owned").populate("played").populate("wishlist").then((user) => res.render("profile", {user}))
  });


//Edit user's profile
router.get('/profile/edit', (req, res, next) => {
  console.log(req.session.currentUser)

  User.findById(req.session.currentUser).populate("owned").populate("played").populate("wishlist")
    .then(user => {
      res.render(
          "edit-profile",
          ({ user: req.session.currentUser, owned, played, wishlist } = user)
      );
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
  const game = await Game.find({name: req.body.query})
  console.log(game)
  res.render("games", { user: req.session.currentUser, games: game[0] });
});

router.post('/add-game/:gameId', async (req, res) => {
  const list = req.body.list
  const gameId = req.params.gameId
  const game = await Game.findById(gameId)
  if (req.session.currentUser) {
    if (list === "owned") {
      await User.findByIdAndUpdate(req.session.currentUser._id, { $push: { owned: game._id } })
    } else if (list === "played") {
      await User.findByIdAndUpdate(req.session.currentUser._id, { $push: { played: game._id } })
    } else if (list === "wishlist") {
      await User.findByIdAndUpdate(req.session.currentUser._id, { $push: { wishlist: game._id } })
    }
    res.render("game-page", { game, message: `${game.name} was added to your "${list}" list!`, user: req.session.currentUser});
  } else {
    res.redirect(`/login`)
  }
});



module.exports = router;
