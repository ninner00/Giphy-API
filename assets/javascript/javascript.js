// Initial array of animals
      var animals = ["ant", "barracuda", "cheetah", "dog", "elephant", "fox", "gecko", "hedgehog", "ibex", "jackalope", "kangaroo", "lemur", "marmoset", "narwhal", "ocelot", "panther"];
      var pausedGif; var animatedGif; var stillGif; 

// $(document).ready(function(){
//     $("button").click(function(){
//            $("#buttons-view").refresh();
//          });
// });
      // Function for dumping the JSON content for each button into the div
      function displayAnimalInfo() {
         $(".animalsDiv").empty();

        var animal = $(this).attr("data-name");
         // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
          animal + "&api_key=dc6zaTOxFJmzC&rating&limit=10";

        // Performing the AJAX GET request
        $.ajax({
          url: queryURL,
          method: "GET"
        })

        // After the data comes back from the API
        .then(function(getGiphy) {

          // Gets the info from giphy
          var results = getGiphy.data;
          for (var i = 0; i < results.length; i++) {

            // var rating = results[i].rating;
            
            var displayGif = $("<div class='animalsDiv'>");
            
            // Creating a h5 tag with the result item's rating
            var rating = $("<h5>").text("Rating: " + results[i].rating).addClass('rating');

            animatedGif = results[i].images.original.url;
            pausedGif = results[i].images.original_still.url;
            stillGif = $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
          
            displayGif.append(rating, stillGif);
            
            $('#animals-view').prepend(displayGif);   
          }

            var animalName = $("<h3>").text("You picked the animal: " + animal + "!");
            // $('.animal-name').append(animalName);  
         
            // if nothing is there, then append(animalName)
            if (animalName === animalName){
              $('.animal-name').html(animalName); 
            }
            // if (animalName != " "){
            //   $('.animal-name').replaceWith(animalName); 
            // }

            // if there is something there, delete it, and then append(animalName)

      });
    }

    // Function for displaying animal data
      function renderButtons() {

        // Deleting the buttons prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
          
          // Then dynamically generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding the animal from the textbox to our array
        animals.push(animal);
        console.log(animals);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });
//animates and pauses gif on hover
$(document).on('mouseover','.playOnHover', function(){
      $(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
      $(this).attr('src', $(this).data('paused'));
 });

// $('.animal').click(function() {
//               window.location.reload(true);
//           });
      // Function for displaying the animal info
      // Using $(document).on instead of $(".animal").on to add event listeners to dynamically generated elements
      $(document).on("click", ".animal", displayAnimalInfo);

      // Calling the renderButtons function to display the initial buttons
      renderButtons();