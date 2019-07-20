$(document).ready(function() {
  var startGifs = ["Friends", "New Girl", "30 Rock"];

  function makeButtons() {
    $("#buttonsView").empty();

    for (var i = 0; i < startGifs.length; i++) {
      var a = $("<button>");
      a.addClass("showGifs");
      a.attr("data-name", startGifs[i]);
      a.text(startGifs[i]);
      $("#buttonsView").append(a);
    }
  }

  // add the show gifs
  $("#addGif").on("click", function() {
    var newGifs = $("#gif-input")
      .val()
      .trim();
    startGifs.push(newGifs);
    makeButtons();
    return false;
  });

  // function for displaying the giphy gifs
  function displayGifs() {
    var gif = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      gif +
      "&api_key=3foLy7DcuYZeUjqgPerhOsrwTNnRcY6r";

    // creates ajax call
    $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
      console.log(response.data);
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class=gifs>");
        var showGif = $("<img>");
        showGif.attr("src", results[i].images.fixed_height_still.url);
        showGif.attr("title", "Rating: " + results[i].rating);
        showGif.attr("data-still", results[i].images.fixed_height_still.url);
        showGif.attr("data-state", "still");
        showGif.addClass("gif");
        showGif.attr("data-animate", results[i].images.fixed_height.url);
        gifDiv.append(showGif);

        $("#gifsView").prepend(gifDiv);
      }
    });
  }

  // function for the animating
  $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state == "still") {
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    }
  });

  // function for the displaying
  $(document).on("click", ".showGifs", displayGifs);

  makeButtons();
});
