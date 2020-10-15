$("#petfinder").on("click", function(event) {
  $("#petfinder").attr("disabled", true);
  $("#results").empty();
  $(".fixed-bottom").hide();
  var userZipCode = $(".user-zip-code").val();

  var queryUrl = `https://api.petfinder.com/pet.find?format=json&key=a7e12d55f8325f95f249644d6b56c772&location=${userZipCode}&animal=dog&callback=?`;

  $.ajax({
    dataType: "json",
    url: queryUrl,
    method: "GET",
  }).done(function(response) {
    const resultingPets = response.petfinder.pets.pet;
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
      var petCardBody = $(`<div class='card-body pet-${[i]} pet-card-body'>`);
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

// Tooltip toggle for the geolocation button //
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
