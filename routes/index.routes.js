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

       console.log("games: ", homeGames)

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
    const newArr = []
    console.log("GAMES",games[0])
    games.forEach((game)=> {
      newArr.push({...game._doc, rating: Math.floor(game.rating)})
    })
    return newArr
  })
    .then((games) => {
      console.log("gnewArraz", games[0])
      res.render("games", { games, user: req.session.currentUser });
    })
    .catch((error) => {
      console.log("Error while getting the games from the DB: ", error);
      next(error);
    });
});

// GET single game page
router.get("/games/:id", (req, res) => {
  Game.findById(req.params.id).then((game) =>
      res.render(
          "game-page",
          ({
              user: req.session.currentUser,
              title,
              description,
              players,
              duration,
              rating,
              price,
              imgUrl,
          } = game)
      )
  );
});

//GET users profile
router.get("/profile", (req, res) => {
  User.findById(req.session.currentUser).then((user) =>{
  const {username,
              owned,
              played,
              wishlist} = user
      res.render(
          "profile",
          {
              user: req.session.currentUser,
              username,
              owned,
              played,
              wishlist,
          })
        });
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
  console.log(req.body.query)
  const game = await Game.find({name: req.body.query})
  console.log(game[0])
  res.render("games", { user: req.session.currentUser, games: game[0] });

});
module.exports = router;
