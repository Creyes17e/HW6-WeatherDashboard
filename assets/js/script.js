//Initial cities on page
var cities = ["Houston", "Atlanta", "Austin", "Dallas"];
var currentDate = new Date().toDateString();

//function to display city weather
function displayCityWeather() {
  var APIKey = "16579f7bf39afcac0733e6f89e871775";
  var city = $(this).attr("data-name");
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  console.log(queryUrl);
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    //div to hold city weather
    $("#display-city-weather").empty();
    var cityDiv = $("#display-city-weather");
    var cityNameP = $("<p>").html(
      "<h2>" + response.name + "-" + `(${currentDate})</h2>`
    );
    cityDiv.append(cityNameP);

    var tempEl = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    var tempP = $("<p>").text("Temperature:" + tempEl);
    cityDiv.append(tempP);
    console.log(tempEl);

    var humidityEl = response.main.humidity;
    var humidityP = $("<p>").text("Humidity:" + humidityEl);
    cityDiv.append(humidityP);
    console.log(humidityEl);

    var windEl = response.wind.speed;
    var windP = $("<p>").text("Wind Speed:" + windEl);
    cityDiv.append(windP);
    console.log(windEl);
  });
}

//Function to display city btns
function renderCityBtns() {
  $("#city-btns-view").empty();

  for (var i = 0; i < cities.length; i++) {
    var cityBtn = $("<button class='city-btn'>");
    cityBtn.attr("data-name", cities[i]);
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
$(document).on("click", ".city-btn", displayCityWeather);
renderCityBtns();
