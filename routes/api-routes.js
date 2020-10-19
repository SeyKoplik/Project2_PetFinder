// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
require('dotenv').config()
const petfinder = require("@petfinder/petfinder-js");
const client = new petfinder.Client({ apiKey: process.env.PET_FINDER_API_KEY, secret: process.env.PET_FINDER_SECRET });

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
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
//Route for connecting favorites and MySQL
  // app.get("/api/favorites/", (req, res) => {
  //   db.Pet.findAll({
  //     where: {
  //       UserId: req.user.id,
  //     }
  //   }).then(function(petData) {
  //     res.json(petData)
  //   })
  // })

//Route for updating MySQL from Favorites
app.put("/api/favorites/:id", (req, res) => {
  db.Pet.update({notes:req.body.userNotes}, {
    where: {
      id:req.params.id,
    }
  }).then(function(petData) {
    res.json(petData)
  })
})

//Route for deleting an item from Favorites from MySQL 
app.delete("/api/favorites/:id", (req, res) => {
  db.Pet.destroy({
    where: {
      id: req.params.id,
    }
  }).then(function(petData) {
    res.json(petData)
  })
})

// Route for getting all the favorites by particular user displayed
app.get("/api/favorites/:id", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    db.Pet.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function (faves) {
      // console.log(`!!!!!!!!!!!!!!!`)
      // console.log(faves)
      res.json(faves)
    });
  }
});

// Creates new favorite with attached foreign key of said user
app.post("/api/favorites", (req, res) => {
  db.Pet.create({
    name: req.body.name,
    gender: req.body.gender,
    breed: req.body.breed,
    age: req.body.age,
    size: req.body.size,
    url: req.body.url,
    img: req.body.img,
    notes: req.body.notes,
    UserId: req.user.id
  }).then(function (newFave) {
    res.json(newFave)
  });
});

  // Route for logging user out AND REDIRECT TO LOG IN OR SIGN UP PAGE TO GET ACCESS TO PETFINDER
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

  app.post("/api/search", (req, res) => {
    client.animal.search({
        location: req.body.zipcode,
        distance: 50,
        type: req.body.animalType,
        gender: req.body.gender,
        age: req.body.age,
        size: req.body.size,
        page: 1,
        limit: 12,
      //change limit when ready.. limit is number of results to appear
      }).then(petData => {
      console.log(petData.data.animals)
      console.log(`=======================`);
      petData.data.animals.forEach(function(animal) {
      //  console.log(animal);
       console.log(animal.name);
       console.log(animal.gender);
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
