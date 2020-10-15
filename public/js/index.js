// Working with main.html file in public folder
$(document).ready(function () {

  $("#searchBtn").on("click", function () {
    event.preventDefault();
    // WHEN THE SEARCH BUTTON IS CLICKED...
    // THE SEARCH INPUT BOX DISAPPEARS...
    $('.searchBox').hide();
    // THE ANIMAL INFO BOX APPEARS.
    $('.animalBox').show();

    // GETTING ALL INPUT VALUES & SETTING THEM AS VARIABLES TO BE USED TO MAKE PETFINDER API CALL
    const zipcode = $("#zipCode").val().trim();
    const animalType = $('input[name="petType"]:checked').val();
    const gender = $('input[name="gender"]:checked').val();
    const age = $("#selectAge option:selected").text();
    const size = $("#selectSize option:selected").text();

    // CONSOLE.LOG TO CHECK VALUES CHOSEN IS CORRECT
    console.log(zipcode, animalType, gender, age, size);

    $.ajax({url:'/api/search', method:'POST', data: {
      zipcode: zipcode,
      animalType: animalType,
      gender: gender,
      age: age,
      size: size
    }}).then (function (data){
      console.log(data);

        for(var i = 0; i < data.length; i++) {
          var petName = data[i].name;
          var petIMGurl = data[i].primary_photo_cropped.small

           var newCard = $('<div class="card" style="width:18rem;">');
           var newIMG = $('<img class="card-img-top" src="" alt="petimage">');


           $(".animalBox").append(newCard);
           newCard.text(data[i].name);

        }
     });
    })
  });

