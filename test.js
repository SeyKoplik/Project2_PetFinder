require('dotenv').config()
const petfinder = require("@petfinder/petfinder-js");
const client = new petfinder.Client({ apiKey: process.env.PET_FINDER_API_KEY, secret: process.env.PET_FINDER_SECRET });

// const search = require('/public/js')

// client.animal.search()
// 	.then(function (response) {
// 		// Do something with `response.data.animals`
// 		console.log(response.data.animals[1]);
// 	})
// 	.catch(function (error) {
// 		// Handle the error
// 	});

// limit animal search results. See full docs for all available parameters.
// client.animal.search({
// 	location: search.zipcode,
// 	distance: 15,
// 	type: search.animalType,
// 	gender: search.gender,
// 	age: search.age,
// 	size: search.size,
// 	page: 1,
// 	limit: 20,
//   }).then(petData => {
// 	// Do something with petData.data.animals
// 	console.log(petData.data.animals);
//   });

// //===============================

async function showAnimals() {
  apiResult = await client.animal.search({
    location: 19146,
    distance: 15,
    type: "cat",
    gender: "female",
    age: "young",
    size: "small",
    page: 1,
    limit: 10,
  });

  // console.log(apiResult.data.animals);
  // console.log(`=======================`);

  apiResult.data.animals.forEach(function(animal) {
	// res.render(animal);
	 console.log(animal);
     console.log(`=======================`);
  });
}

(async function() {
	await showAnimals();
})();
