// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
//const { regexp } = require("sequelize/types/lib/operators");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });


  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Displays favorite info 
  app.get("/api/favorites", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.Pet.findAll({
        where: {
          UserId: req.user.id
        }
      }).then(function (faves) {
        console.log(faves)
        res.json(faves)
      });
    }
  });

  // Creates new favorite
  app.post("/api/favorites", (req, res) => {
    db.Pet.create({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      size: req.body.size,
      url: req.body.url,
      img: req.body.img,
      notes: req.body.notes
    }).then(function (newFave) {
      res.json(newFave)
    });
  });
  //Update the favorites note
  app.put("api/favorites", (req, res) => {
    db.Pet.update({
      note: req.body.note
    }, {
      where: {
        id: req.body.id
      }
    }).then(function (newNote) {
      res.json(newNote)
    });
  });

  // Delete the favorites note
  app.delete("/api/favorites/:id", (req, res) => {
    db.Pet.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (deletedFave) {
      res.json(deletedFave);
    });
  });
};
