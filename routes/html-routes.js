// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });

  // Load index page
  app.get("/members", isAuthenticated, function (req, res) {
    // res.render("index");
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  // Load favorites page
  app.get("/favorites", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/favorites.html"));
  });

  // Logs out user from the email input using passport and then redirects to signup page
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  })

  // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.render("404");
  // });
};
