$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/favorites").then(data => {
        console.log(data);
        //I can see in the browser console log that the two arrays for the seeded pets associated with this user (with an ID of 1) are returning.
    });
  });