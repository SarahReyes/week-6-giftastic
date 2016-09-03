

var shows = ["30 Rock", "Full House", "Downton Abbey", "Mr. Robot", "Freaks and Geeks", "Ducktales", "Breaking Bad"];

$(document).ready(function() {


    function displayAllButtons () {
        // loop through the array of tv shows
        for (var i = 0; i < shows.length; i++) {
            // create a button tag
            var buttonDisplay = $('<button type="button" class="btn btn-primary btn-lg">');
            //add the attribute data-show
            buttonDisplay.attr('data-show', shows[i]);
            // add class
            buttonDisplay.addClass("show-buttons");
            // add the button text
            buttonDisplay.text(shows[i]);
            // append the button to the div
            $('.buttons-appear-here').append(buttonDisplay);
        }
    }
    displayAllButtons();

    // user clicks submit button function
    $('#submit-tv-show').on('click', function(event){
        // code to stop buttons from repeat posting to HTML
        $('.buttons-appear-here').empty();
        // prevent the page from re-loading
        event.preventDefault();
        // grab the value from the text box
        var userShow = $('#inputShowName').val().trim();
        // add the value to the array
        shows.push(userShow);
        //testing the submit button
        console.log(userShow);
        console.log(shows);
        // display the buttons in the array by calling the function
        displayAllButtons();
        gifAction();
    });

    function gifAction () {
        $('.show-buttons').on('click', function(){
            var tvShow = $(this).data('show');
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=6";
            console.log(tvShow);

            $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
                // check the JSON
                console.log(queryURL);
                console.log(response);
                // create a variable for grabbing the data
                var results = response.data;

                // image rating loop
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
                    $('#gifs-appear-here').prepend(tvShowDiv);

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
                    // test the click
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
    }
    gifAction();
});
