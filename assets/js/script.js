//Initial cities on page
var cities = [];
var currentDate = new Date().toDateString();

//Function to display city current weather
function displayCityWeather(cityname) {
  var APIKey = "16579f7bf39afcac0733e6f89e871775";
  var city = $(this).attr("data-name");
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    $("#display-city-weather").empty();
    //Div to hold city current weather
    var cityDiv = $("#display-city-weather");
    //City Name
    var cityNameP = $("<h2>").text(response.name + " - " + ` ${currentDate}`);

    //City Temp in Farenheit
    var tempEl = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    var tempP = $("<p>").text("Temperature: " + tempEl + " F");

    //City Humidity
    var humidityEl = response.main.humidity;
    var humidityP = $("<p>").text("Humidity: " + humidityEl + " %");

    //City Wind Speed
    var windEl = response.wind.speed;
    var windP = $("<p>").text("Wind Speed: " + windEl + " MPH");

    var newCurrentWeatherDiv = $("<div class='current-weather'>");

    //Weather Icons

    //UV Index call
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    var queryUrl3 =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: queryUrl3,
      method: "GET",
    }).then(function (response) {
      $("#uv-display").empty();
      //Setting UV Colors
      var uvResults = response.value.toFixed(1);
      var uvBtn = $("<button class='uv-btn'>").html("UV Index: " + uvResults);
      if (uvResults <= 2) {
        uvBtn.css("background-color", "green");
      } else if (uvResults <= 5 || uvResults < 3.5) {
        uvBtn.css("background-color", "yellow");
      } else if (uvResults <= 3.5 || uvResults < 7.5) {
        uvBtn.css("background-color", "orange");
      } else if (uvResults <= 7.5 || uvResults < 10.5) {
        uvBtn.css("background-color", "red");
      } else if (uvResults >= 10.5) {
        uvBtn.css("background-color", "violet");
      }

      //Displays cities current weather
      newCurrentWeatherDiv.append(cityNameP, tempP, humidityP, windP, uvBtn);
      cityDiv.html(newCurrentWeatherDiv);
    });
  });

  //Display 5-day Forecast
  var APIKey = "16579f7bf39afcac0733e6f89e871775";
  var city = $(this).attr("data-name");

  var queryUrl2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryUrl2,
    method: "GET",
  }).then(function (response) {
    $("#5-day-forecast").empty();
    var weatherResults = response.list;
    for (var i = 0; i < weatherResults.length; i += 8) {
      var displayCityForecastDiv = $("<div class='card-forecast'>");
      //Date for 5-day forecast
      var date = weatherResults[i].dt_txt;
      var fixedDate = date.substr(0, 10);

      var tempEl2 = ((weatherResults[i].main.temp - 273.15) * 1.8 + 32).toFixed(
        1
      );
      var humidityEl2 = weatherResults[i].main.humidity;

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

//Function for event handler for button click "search"
$("#add-city-btn").on("click", function (event) {
  event.preventDefault();
  //storing city name
  var city = $("#city-input").val().trim();

  //save user input
  var storedCities = [];
  var cityInputText = $(this).val();
  storedCities.push(cityInputText);
  localStorage.setItem("cityInputName", JSON.stringify(storedCities));
  cities.push(city);
  renderCityBtns();
});

// //Displays stored items after a refresh
// function displayStoredWeather() {
//   var lastSearch = JSON.parse(localStorage.getItem("cityInputName"));

// }

$(document).on("click", ".city-btn", displayCityWeather);

renderCityBtns();
