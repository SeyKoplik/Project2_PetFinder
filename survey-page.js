$(document).ready(function() {
  // jQuery references to survey elements //
  var surveyName = $("#survey-name"),
    surveyActivity = $("#survey-activity"),
    surveyBarking = $("#survey-barking"),
    surveyKids = $("#survey-kids"),
    surveyDogs = $("#survey-dogs"),
    surveyTraining = $("#survey-training"),
    surveyShedding = $("#survey-shedding"),
    surveySize = $("#survey-size"),
    surveyAllergies = $("#survey-allergies");

  $("#survey-submit").on("click", function(event) {
    event.preventDefault();

    // == Form validation == //
    function validate() {
      var isValid = true;
      $(".form-control").each(function() {
        if ($(this).val() === "") {
          isValid = false;
        }
      });
      $(".chosen-select").each(function() {
        if ($(this).val() === "") {
          isValid = false;
        }
      });
      if (!isValid) {
        $("#invalid-alert")
          .replaceWith(`<div class="alert alert-danger" role="alert">
            You missed one! Please answer all questions.</div>`);
      }
      return isValid;
    }
    if (validate()) {
      let id;
      $.get("/api/user_data", function(result) {
        id = result.id;
        var newSurvey = {
          UserId: id,
          name: surveyName.val().trim(),
          activity_level: surveyActivity.val(),
          barking_level: surveyBarking.val(),
          good_with_kids: surveyKids.val(),
          good_with_dogs: surveyDogs.val(),
          trainability: surveyTraining.val(),
          shedding: surveyShedding.val(),
          size: surveySize.val(),
          hypoallergenic: surveyAllergies.val(),
        };
        submitSurvey(newSurvey);
      });
    }
  });

  function submitSurvey(survey) {
    $.post("/api/survey/", survey, function() {
      window.location.href = "results";
    });
  }
});
