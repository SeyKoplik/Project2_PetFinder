require('dotenv').config()

// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({ apiKey: process.env.PET_FINDER_API_KEY, secret: process.env.PET_FINDER_SECRET });


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

  app.post("/api/search", (req, res) => {
    client.animal.search({
        location: req.body.zipcode,
        distance: 15,
        type: req.body.animalType,
        gender: req.body.gender,
        age: req.body.age,
        size: req.body.size,
        page: 1,
        limit: 9,
      //change limit when ready.. limit is number of results to appear
      }).then(petData => {
      console.log(`=======================`);
      petData.data.animals.forEach(function(animal) {
      //  console.log(animal);
       console.log(animal.name);
       console.log(animal.gender);
       console.log(animal.description);
       console.log(animal.status);
       let distance = parseInt(animal.distance)
       let newDistance = distance.toFixed(1);
       console.log(`${newDistance} miles away`);
       console.log(animal.breeds.primary);
      //  console.log(animal.breeds.secondary);
       console.log(`Mixed breed? ${animal.breeds.mixed}`);
      //  console.log(animal.breeds.unknown);
       console.log(animal.url);
      console.log(`=======================`);

      });

      res.json(petData.data.animals);

    })
  })
  
};