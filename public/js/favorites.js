// Working with favorites.html file in public folder
$(document).ready(function () {
  //TO PULL THE DATE FROM THE MYSQL DATABASE AND RENDER IT ON THE FAVORITES PAGE.
  // need something after comma of url dealing with passport
  $.ajax({
    url: '/api/favorites/:id', method: 'GET' //need to get user_id from passport to put at end of url stmt before comma 
  }).then(function (data) {
    // DATA OUTPUT IS THE RESULT OF MYSQL DATABASE INFORMATION
    console.log(`$$$$$$$$$`)
    console.log(data);
    console.log(`$$$$$$$$$`)

    for (var i = 0; i < data.length; i++) {
      console.log(i);
      var petID = data[i].id;
      var petIMGurl = data[i].img;
      var petName = data[i].name;
      var petGender = data[i].gender;
      var petBreed = data[i].breed;
      var petSize = data[i].size;
      var petWebLink = data[i].url;

      var newPetCard = $(`<div class='card pet-card' id='pet-card-${[i]}'>`);
      var newPetPic = $(`<img class='card-img-top img-thumbnail rounded mx-auto d-block' id='pet-pic-${[i]}'>`);
      newPetPic.attr("src", petIMGurl);

      var newPetCardBody = $(`<div class='card-body h-100 pet-${[i]} pet-card-body'>`);

      newPetCardBody.html(`
          <h5 class="card-title">Hello! I'm ${petName}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Size: ${petSize}</li>
          <li class="list-group-item">Gender: ${petGender}</li>
          <li class="list-group-item">Breed: ${petBreed}</li>
        </ul>
        <div class="card-body m-auto">
        <h5 class="notes-title">My Notes for ${petName}:</h5>
        <div class="notes-area"><textarea></textarea></div>
        <div class="card-body m-auto">
          <a href="${petWebLink}" class="card-link"><button type="button" class="btn btn-outline-warning btn-sm">ADOPT INFO!</button></a>
          <button type="button" class="btn btn-outline-danger btn-sm update" data-id="${petID}">Update</button>
          <button type="button" class="btn btn-outline-danger btn-sm delete" data-id="${petID}">Delete</button>
        </div>
          `);
      // console.log(newPetCardBody);
      // console.log(`FKSGFKJH`);

      newPetCard.append(newPetPic);
      newPetCard.append(newPetCardBody);
      $(".faveAnimalBox").append(newPetCard);
    }// === END FOR LOOP OF CREATING NEW DIVS FOR EACH PET RESULT

  });//END OF GETTING DATA FROM DATABASE AND RENDERING IT ON THE FAVORITES PAGE.

  $(document).on("click", ".update", function (event) {
    event.preventDefault();
    console.log($(this).parent().prev().find("textarea").val());
    //UPDATING THE DATABASE WITH NOTES ADDED BY USER ON FAVORITES PAGE.
    $.ajax({
      url: '/api/favorites/' + $(this).attr("data-id"), method: 'PUT', data:
        { userNotes: $(this).parent().prev().find("textarea").val() }
    }).then(function (data) {
      // DATA OUTPUT IS THE RESULT OF MYSQL DATABASE INFORMATION
      console.log(data);
    })

  })

  //DELETING ITEMS FROM THE DATABASE WHEN CHOSEN FOR DELETE BY USER ON FAVORITES PAGE.
  // $.ajax({
  //   url: '/api/favorites/' , method: 'REMOVE' 
  // }).then(function (data) {
  //   // DATA OUTPUT IS THE RESULT OF MYSQL DATABASE INFORMATION
  //   console.log(data);

  // }); //==== END DOCUMENT.READY

  //EXAMPLE FROM W3 SCHOOLS

  // var mysql = require('mysql');

  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "yourusername",
  //   password: "yourpassword",
  //   database: "mydb"
  // });

  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  //   var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log("1 record inserted");
  //   });
})

