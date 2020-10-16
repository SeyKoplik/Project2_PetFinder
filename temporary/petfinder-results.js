// This JS will run geolocation on page load and will then run the ajax
// query to find pets that match this breed in your area
var petfinder = require("@petfinder/petfinder-js");

$(document).ready(function() {
  geolocate();

  function geolocate() {
    if (window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onGeolocateSuccess,
        onGeolocateError
      );
    }
  }

  function onGeolocateSuccess(coordinates) {
    var { latitude, longitude } = coordinates.coords;
    function reverseGeocode() {
      var geocoder = new google.maps.Geocoder();
      latitude = parseFloat(latitude).toFixed(2);
      longitude = parseFloat(longitude).toFixed(2);
      var latlng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

      geocoder.geocode({ location: latlng }, function(results, status) {
        var addressLength = results[0].address_components.length;
        var zip = results[0].address_components[addressLength - 2].long_name;
        console.log(zip);

        var queryUrl = "@petfinder/petfinder-js";
        var client = new petfinder.Client({
          apiKey: process.env.PET_FINDER_API_KEY,
          secret: process.env.PET_FINDER_SECRET,
        });
        $.ajax({
          dataType: "json",
          url: queryUrl,
          method: "GET",
        }).done(function(response) {
          const resultingPets = response.client.pets.pet;
          $("#petfinder").attr("disabled", false);
          $(".user-zip-code").val("");
          $("#geolocation-button").attr("disabled", false);
          console.log(resultingPets);
          for (var i = 0; i < resultingPets.length; i++) {
            // result attributes we're gonna use //
            var PFpetPicUrl = resultingPets[i].media.photos.photo[2].$t,
              PFpetName = resultingPets[i].name.$t,
              PFpetSex = resultingPets[i].sex.$t,
              PFpetDescription = resultingPets[i].description.$t,
              PFpetAge = resultingPets[i].age.$t,
              PFpetBreed = resultingPets[i].breeds.breed,
              PFpetContact = resultingPets[i].contact.email.$t,
              PFpetSize = resultingPets[i].size.$t;
            var petCard = $(`<div class='card pet-card' id='pet-card-${[i]}'>`);
            // pet picture //
            var petPic = $(`<img class='card-img-top' id='pet-pic-${[i]}'>`);
            petPic.attr("src", PFpetPicUrl);

            // pet info //
            var petCardBody = $(
              `<div class='card-body pet-${[i]} pet-card-body'>`
            );
            // if there's more than one breed, it's an array //
            if (Array.isArray(PFpetBreed)) {
              var PFpetBreeds0 = resultingPets[i].breeds.breed[0].$t;
              var PFpetBreeds1 = resultingPets[i].breeds.breed[1].$t;
              petCardBody.append(`
            <h2 class="pet-name">${PFpetName}</h2>
            <hr>
            <p class="pet-info"><strong>Age:</strong> ${PFpetAge}<br>
               <strong>Sex:</strong> ${PFpetSex}<br>
               <strong>Size:</strong> ${PFpetSize}<br>
               <strong>Breeds:</strong> ${PFpetBreeds0 +
                 ", " +
                 PFpetBreeds1}<br>
               <strong>Contact:</strong> ${PFpetContact}<br>
            </p>
            <div class="d-flex align-items-baseline justify-content-center">
                <button 
                 type="button" 
                 class="btn btn-secondary description-popover" 
                 data-container="body" 
                 data-toggle="popover" 
                 data-placement="top" 
                 data-content="${PFpetDescription}">
                   More Info!
                </button>
              </div>
          `);
            } else {
              petCardBody.append(`
            <h2 class="pet-name">${PFpetName}</h2>
            <hr>
            <p class="pet-info"><strong>Age:</strong> ${PFpetAge}<br>
               <strong>Sex:</strong> ${PFpetSex}<br>
               <strong>Size:</strong> ${PFpetSize}<br>
               <strong>Breed:</strong> ${PFpetBreed.$t}<br>
               <strong>Contact:</strong> ${PFpetContact}<br>
               </p>
               <div class="d-flex align-items-baseline justify-content-center">
                <button 
                 type="button" 
                 class="btn btn-secondary description-popover" 
                 data-container="body" 
                 data-toggle="popover" 
                 data-placement="top" 
                 data-content="${PFpetDescription}">
                   More Info!
                </button>
              </div>
            `);
            }
            // Toggle for the pet description popover //
            $(function() {
              $(".description-popover").popover({
                container: "body",
                trigger: "focus",
              });
            });
            // final card //
            petCard.append(petPic);
            petCard.append(petCardBody);
            $("#results").append(petCard);
          }
        });
      });
    }
    reverseGeocode();
  }

  function onGeolocateError(error) {
    console.warn(error.code, error.message);
    if (error.code === 1) {
      // they said no
    } else if (error.code === 2) {
      // position unavailable
    } else if (error.code === 3) {
      // timeout
    }
  }
});
