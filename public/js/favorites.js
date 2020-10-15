$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/favorites").then(data => {
        console.log(data)
      $(".pet-name").text(data.name);
    });
  });