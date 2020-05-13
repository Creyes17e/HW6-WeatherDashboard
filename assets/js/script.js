//Initial cities on page
var cities = ["Houston", "Atlanta", "Austin", "Dallas"];

//function to display city data
function renderCityBtns() {
  $("#city-btns-view").empty();

  for (var i = 0; i < cities.length; i++) {
    var cityBtn = $("<button class='city'>");
    cityBtn.attr("data-name", cities[i]);
    cityBtn.attr("display", "table");
    cityBtn.text(cities[i]);
    $("#city-btns-view").prepend(cityBtn);
  }
}

//Function for event handler for button click
$("#add-city-btn").on("click", function (event) {
  event.preventDefault();

  var city = $("#city-input").val().trim();
  cities.push(city);
  renderCityBtns();
});
renderCityBtns();
//function to display cities
function displayCities() {
  var city = $(this).attr("data-name");
  var url =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    city +
    "&appid=" +
    APIKey;
  var APIKey = "16579f7bf39afcac0733e6f89e871775";
  $.ajax({
    url,
    method: "GET",
  }).then(function (response) {
    //div to hold cities
    var cityDiv = $("<div class='city'>");
    //storing

    console.log(url);
  });
}
