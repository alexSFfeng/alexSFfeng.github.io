// test jquery
// original gist learned from https://gist.github.com/willpatera/ee41ae374d3c9839c2d6
// modified to fit website form requirement
$(function(){

  var $form = $('form#request-form');
  var desturl = "https://script.google.com/macros/s/AKfycbwjVonJAPZXpljxuNlMRkVahvC1d9AXOo_jZtGn1mf1k7IJsCem/exec";

  $('#submit-form').on('click',function(e){

    var inputName = $('#Name').val();
    var coreIdea = $('#MainIdea').val();
    var targetIncon = $('#Inconvenience').val();

    if(inputName == "" || coreIdea == "" || targetIncon == ""){
      return;
    }

    e.preventDefault();

    // start loading animation
    document.getElementById("ResultImage").src="images/BeforeSubmit.gif";

    // submit request to post data to sheet
    var dataSerialized = $form.serialize();
    var jqxhr = $.post(
      desturl,
      dataSerialized,
      function() {
        console.log("Success! Data: " + dataSerialized.statusText);

        //success ui change
        resultSuccess();

    })
    .fail(function() {
      console.warn("Error! Data: " + dataSerialized.statusText);
      // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
      if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");

        resultSuccess();
        }
      else{

        document.getElementById("ResultImage").src="images/QuestionMark.png";
        alert("Request Failed due to internal problem! Please check internet "+
        "conection! Try again later!");
        }
    });
  });
});

// method call to update ui after success
function resultSuccess(){

  //success ui change
  document.getElementById("ResultImage").src = "images/lightBulb.png";

  document.getElementById("resultIdea").value=
   "Your idea was submitted and will be reviewed.\nThank you for your request" +
   "\nWe will try our best to bring it to life." +
   "\nClick clear to start a new request.";

   document.getElementById("submit-form").disabled = true;
}

// method call to update ui when starting new form
function clearForm(){
  document.getElementById("ResultImage").src="images/QuestionMark.png";
  document.getElementById("submit-form").disabled = false;
}
