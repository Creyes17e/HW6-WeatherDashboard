//Initial cities on page
var cities = [];
var currentDate = new Date().toDateString();

//Function to display city weather
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
    $("#display-city-weather").empty();
    //Div to hold city weather
    var cityDiv = $("#display-city-weather");
    //City Naem
    var cityNameP = $("<h2>").text(response.name + " - " + ` ${currentDate}`);
    cityDiv.append(cityNameP);
    //City Temp in Farenheit
    var tempEl = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    var tempP = $("<p>").text("Temperature: " + tempEl + " F");
    cityDiv.append(tempP);

    //City Humidity
    var humidityEl = response.main.humidity;
    var humidityP = $("<p>").text("Humidity: " + humidityEl + " %");
    cityDiv.append(humidityP);

    //City Wind Speed
    var windEl = response.wind.speed;
    var windP = $("<p>").text("Wind Speed: " + windEl + " MPH");
    cityDiv.append(windP);
  });
  //UV index

  //Display 5-day Forecast
  var APIKey = "16579f7bf39afcac0733e6f89e871775";
  var city = $(this).attr("data-name");
  console.log(city);
  var queryUrl2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey;
  console.log(queryUrl2);

  $.ajax({
    url: queryUrl2,
    method: "GET",
  }).then(function (response) {
    $("#5-day-forecast").empty();
    var weatherResults = response.list;
    for (var i = 0; i < weatherResults.length; i += 8) {
      var displayCityForecastDiv = $("<div class='card'>");
      //Date for 5-day forcast
      var date = weatherResults[i].dt_txt;
      var fixedDate = date.substr(0, 10);

      var tempEl2 = ((weatherResults[i].main.temp - 273.15) * 1.8 + 32).toFixed(
        1
      );
      var humidityEl2 = weatherResults[i].main.humidity;
      console.log(tempEl2);

      var displayDate = $("<p class='card-title'>").text(fixedDate);
      var displayTemp = $("<p class='card-text'>").text(
        "Temp: " + tempEl2 + " F"
      );
      var displayHumidity = $("<p class='card-text'>").text(
        "Humidity: " + humidityEl2 + " %"
      );
      // var weather = weatherResults[i].weather[0].main;

      displayCityForecastDiv.append(displayDate);
      displayCityForecastDiv.append(displayTemp);
      displayCityForecastDiv.append(displayHumidity);
      $("#5-day-forecast").append(displayCityForecastDiv);
    }
  });
}
//Display UV Index
// var lon = response.main.coord.lon;
// var lat = response.coord.lat;
// var queryUrl3 = "http://api.openweathermap.org/data/2.5/uvi?";
// "appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
// console.log(queryUrl3);
// console.log(lon);
// ajax({
//   url: queryUrl3,
//   method: "GET",
// }).then(function (response) {});

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
