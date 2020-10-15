require("dotenv").config();
var petfinder = require("@petfinder/petfinder-js");
// var client = new petfinder.Client({
//   apiKey: process.env.PET_FINDER_API_KEY,
//   secret: process.env.PET_FINDER_SECRET,
// });

// client.animal
//   .search()
//   .then(function(response) {
//     // Do something with `response.data.animals`
//     console.log(response.data.animals[1]);
//   })
//   .catch(function(error) {
//     // Handle the error
//   });

//search organizations by zipcode
// client.organization.search({zip:"19146"})
// .then(response => {
// 	console.log(response.data);
// })

// search by zip code
// client.animal.search({
// 	location: 19146,
// 	distance: 10
//   }).then(resp => {
// 	// Do something with resp.data.animals
// 	console.log(resp.data)
//   });

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
require("dotenv").config();
const axios = require("axios");
var petfinder = require("@petfinder/petfinder-js");
// var client = new petfinder.Client({
//   apiKey: process.env.KEY,
//   secret: process.env.SECRET,
// });

var client = new petfinder.Client({
  apiKey: process.env.KEY,
  secret: process.env.SECRET,
});

async function showAnimals(state, animalType, gender, age, size) {
  // let page = 1;
  // do {
  apiResult = await client.animal.search({
    location: state,
    distance: 15,
    type: animalType,
    gender: gender,
    age: age,
    size: size,
    page: 1,
    limit: 20,
  });
  //  let idx = (page - 1) * 10;
  //   console.log(apiResult.data.animals);
  console.log(`=======================`);
  apiResult.data.animals.forEach(function(animal) {
    console.log(
      ` \n
       ID: ${animal.id} || Name: ${animal.name} || Gender: ${animal.gender} || Age: ${animal.age} || Size: ${animal.size}\n  Description: ${animal.description}\n  Status: ${animal.status}\n  URL: ${animal.url}\n  Photos: ${animal.photos} \n ============== \n`
    );
  });
}
(async function() {
  await showAnimals(
    "Philadelphia, PA",
    "Dog",
    "Female",
    "Young",
    "Medium",
    "Husky"
  );
})();
