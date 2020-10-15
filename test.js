require('dotenv').config()
const petfinder = require("@petfinder/petfinder-js");
const client = new petfinder.Client({ apiKey: process.env.PET_FINDER_API_KEY, secret: process.env.PET_FINDER_SECRET });

// const search = require('/public/js')

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

const newPage = Math.floor(Math.random() * 5) + 1;
console.log(newPage);
parseInt(newPage);

async function showAnimals() {
  apiResult = await client.animal.search({
    location: 19146,
    distance: 15,
    type: "cat",
    gender: "female",
    age: "young",
    size: "medium",
    page: newPage,
	limit: 5,
	//change limit when ready.. limit is number of results to appear
  });

  // console.log(apiResult.data.animals);
  // console.log(`=======================`);

  apiResult.data.animals.forEach(function(animal) {
	 console.log(animal.name);
	 console.log(animal.description);
	 console.log(animal.status);
	 let distance = parseInt(animal.distance)
	 let newDistance = distance.toFixed(1);
	 console.log(`${newDistance} miles away`);
	 console.log(animal.breeds.primary);
	//  console.log(animal.breeds.secondary);
	 console.log(`Mixed breed? ${animal.breeds.mixed}`);
	//  console.log(animal.breeds.unknown);
     console.log(`=======================`);
  });
}

(async function() {
	await showAnimals();
})();
