$(document).ready(function() {
  var startGifs = ["Friends", "Party Down", "New Girl"];

  function buttonsAppear(buttonArray, classAdd, buttonDiv) {
    $(buttonDiv).empty();

    for (var i = 0; i < buttonArray.length; i++) {
      var a = $("<button>");

      a.addClass(classAdd);
      a.attr("data-type", buttonArray[i]);
      a.text(buttonArray[i]);
      $(buttonDiv).append(a);
    }
  }

  $(document).on("click", ".gif-button", function() {
    $("#gifs").empty();
    $(".git-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      type +
      "&api_key=3foLy7DcuYZeUjqgPerhOsrwTNnRcY6r";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $('<div class="gif-item">');
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var movingGif = results[i].images.fixed_height.url;
        var stillImage = results[i].images.fixed_height_still.url;
        var gifImage = $("<img>");

        gifImage.attr("src", stillImage);
        gifImage.attr("data-still", stillImage);
        gifImage.attr("data-move", movingGif);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gif-image");

        gifDiv.append(p);
        gifDiv.append(gifImage);

        $("#gifs").append(gifDiv);
      }
    });
  });

  $(document).on("click", ".gif-Image", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    var newGif = $("input")
      .eq(0)
      .val();

    if (newGif > 2) {
      startGifs.push(newGif);
    }

    buttonsAppear(startGifs, "gif-button", "#gif-buttons");
  });
  buttonsAppear(startGifs, "gif-button", "#gif-buttons");
});
