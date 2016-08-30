
// ["30 Rock", "How I Met Your Mother", "Downton Abbey", "Mr. Robot", "Mad Men"];

// create a data-still attribute with the URL for the
// still image and a data-animate attribute for the URL of the
// animated image. Then you just change the source to one of
// those two values depending on what you want it to do. You
// might check out  the in-class activity from 6.3 / 04 (HINT HINT)

// create multiple buttons with TV show names
// use an array to loop over all of the TV show buttons
// label the button with the TV show name
// connect the button to the giphy API
// create a bootstrap form for someone to submit a TV show they want to see
// limit the amount of gifs to 5
// when the gif pops up, it is paused
// user can click the gif and it plays
// user can click on the gif again and it pauses
// when the user clicks a new button, the previous gif go away
// rating will display with the gif, up to pg-13

// bonus: have a little tv video with static playing

$(document).ready(function() {
  $('button').on('click', function(){
    var tvShows = $(this).data('show');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShows + "&api_key=dc6zaTOxFJmzC&limit=5";

    $.ajax({
      url: queryURL,
      method: 'GET'
    })
    .done(function(response) {
      // check the JSON
      console.log(queryURL);
      console.log(response);

      // create a variable for grabbing the data
      var results = response.data;

      for (var i = 0; i < response.data.length; i++) {
        // div to hold the image and rating
        var tvShowDiv = $('<div>');
        // create a paragraph tag to hold the rating
        var gifRating = $('<p>').text("RATING: " + results[i].rating);
        // create an img tag for the gif
        var gifImage = $('<img src="' + results[i].images.fixed_height.url + '">');
        // append the rating to the div
        tvShowDiv.append(gifRating);
        // append gifImage to the div
        tvShowDiv.append(gifImage);
        // prepend the div to a bigger div that holds all of the gifs that appear
        $('#gifsAppearHere').prepend(tvShowDiv);
      }
    });
  });
});
