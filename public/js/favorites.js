// Working with favorites.html file in public folder
$(document).ready(function () {
//TO PULL THE DATE FROM THE MYSQL DATABASE AND RENDER IT ON THE FAVORITES PAGE.
    $.ajax({
        url: '/api/favorites/' , method: 'GET' //need to get user_id from passport to put at end of url stmt before comma 
      }).then(function (data) {
        // DATA OUTPUT IS THE RESULT OF MYSQL DATABASE INFORMATION
        console.log(data);
  
        for (var i = 0; i < data.length; i++) {
          var petID = data[i].id;
          var petIMGurl = data[i].primary_photo_cropped.small;
          var petName = data[i].name;
          var petStatus = data[i].status;
          var petDistance = parseInt(data[i].distance);
          var newPetDistance = petDistance.toFixed(1);
          var petGender = data[i].gender;
          var petBreed = data[i].breeds.primary;
          var petMixed = data[i].breeds.mixed;
          var petWebLink = data[i].url;
          var petMix = "";
          if (petMixed === true) {
            petMix = "Yes";
          } else if (petMixed === false) {
            petMix = "Nope";
          } else {petMix = "Not sure"}
          var userNotes = data[i].userNotes;
          var newPetCard = $(`<div class='card pet-card' id='pet-card-${[i]}'>`);
          var newPetPic = $(`<img class='card-img-top img-thumbnail rounded mx-auto d-block' id='pet-pic-${[i]}'>`);
          newPetPic.attr("src", petIMGurl);
  
          var newPetCardBody = $(`<div class='card-body h-100 pet-${[i]} pet-card-body'>`);
  
          newPetCardBody.append(`
          <h5 class="card-title">Hello! I'm ${petName}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Status: ${petStatus}</li>
          <li class="list-group-item">Distance: ${newPetDistance} miles away</li>
          <li class="list-group-item">Gender: ${petGender}</li>
          <li class="list-group-item">Breed: ${petBreed}</li>
          <li class="list-group-item">Mixed Breed? ${petMix}</li>
        </ul>
        <div class="card-body m-auto">
        <h5 class="notes-title">My Notes for ${petName}:</h5>
        <div class="notes-area">${userNotes}</div>
        <div class="card-body m-auto">
          <a href="${petWebLink}" class="card-link"><button type="button" class="btn btn-outline-warning btn-sm">ADOPT INFO!</button></a>
          <button type="button" class="btn btn-outline-danger btn-sm">&hearts;</button>
          <button type="button" class="btn btn-outline-danger btn-sm" id="update${petID}>Update</button>
          <button type="button" class="btn btn-outline-danger btn-sm" id="delte${petID}>Delete</button>
        </div>
          `);
          
          newPetCard.append(newPetPic);
          newPetCard.append(newPetCardBody);
          $(".animalBox").append(newPetCard);
        }// === END FOR LOOP OF CREATING NEW DIVS FOR EACH PET RESULT
  
      });//END OF GETTING DATA FROM DATABASE AND RENDERING IT ON THE FAVORITES PAGE.



//UPDATING THE DATABASE WITH NOTES ADDED BY USER ON FAVORITES PAGE.
// $.ajax({
//   url: '/api/favorites/' , method: 'PUT' //need to get user_id from passport to put at end of url stmt before comma 
// }).then(function (data) {
  // DATA OUTPUT IS THE RESULT OF MYSQL DATABASE INFORMATION
  // console.log(data);


  //DELETING ITEMS FROM THE DATABASE WHEN CHOSEN FOR DELETE BY USER ON FAVORITES PAGE.
// $.ajax({
//   url: '/api/favorites/' , method: '' //need to get user_id from passport to put at end of url stmt before comma 
// }).then(function (data) {
//   // DATA OUTPUT IS THE RESULT OF MYSQL DATABASE INFORMATION
//   console.log(data);

}); //==== END DOCUMENT.READY

