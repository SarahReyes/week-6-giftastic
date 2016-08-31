
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

var shows =

$(document).ready(function() {
    $('button').on('click', function(){
        var tvShow = $(this).data('show');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=5";

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




            // This function handles events where one button is clicked
            $('.btn btn-primary').on('click', function(){

                // This line of code will grab the input from the textbox
                var show = $('.form-control').val().trim();

                // The movie from the textbox is then added to our array
                movies.push(movie);

                // Our array then runs which handles the processing of our movie array
                renderButtons();

                // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
                return false;
            })





            for (var i = 0; i < response.data.length; i++) {
                // div to hold the image and rating
                var tvShowDiv = $('<div>');
                // create a paragraph tag to hold the rating
                var gifRating = $('<p>').text("RATING: " + results[i].rating);

                // append the rating to the div
                tvShowDiv.append(gifRating);
                // append gifImage to the div
                tvShowDiv.append(gifImage);
                // prepend the div to a bigger div that holds all of the gifs that appear
                $('#gifsAppearHere').prepend(tvShowDiv);

                // create an img tag for the gif
                var gifImage = $('<img>');

                // add attribute of src and assign the initial value
                gifImage.attr('src', results[i].images.fixed_height_still.url);
                // add attribute of data-still and assign the value
                gifImage.attr('data-still', results[i].images.fixed_height_still.url);
                // add attribute of data animate and assign the value
                gifImage.attr('data-animate', results[i].images.fixed_height.url);
                // add attribute of data state and start it as 'still'
                gifImage.attr('data-state', 'still');
            }
            $('img').on('click', function() {
                console.log("I clicked");
                // set a variable to attribute the data state
                var stateOfGif = $(this).attr('data-state');
                // if the gif is clicked switch between still and animated
                if (stateOfGif === 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                }
                else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }
            });
        });
    });
});
