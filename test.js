require('dotenv').config()
var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({ apiKey: process.env.PET_FINDER_API_KEY, secret: process.env.PET_FINDER_SECRET });

// client.animal.search()
// 	.then(function (response) {
// 		// Do something with `response.data.animals`
// 		console.log(response.data.animals[1]);
// 	})
// 	.catch(function (error) {
// 		// Handle the error
// 	});

//search organizations by zipcode
// client.organization.search({zip:"19146"})
// .then(response => {
// 	console.log(response.data);
// })

// search by zip code
client.animal.search({
	location: 19146,
	distance: 10
  }).then(resp => {
	// Do something with resp.data.animals
	console.log(resp.data)
  });

// limit animal search results. See full docs for all available parameters.
// client.animal.search({
// 	type: "Dog",
// 	breed: "Bernedoodle",
// 	page: 1,
// 	limit: 100,
//   }).then(resp => {
// 	// Do something with resp.data.animals
// 	console.log(resp.data.animals)
//   });