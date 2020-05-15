//Initial cities on page
var cities = [];
var currentDate = new Date().toDateString();
var APIKey = "16579f7bf39afcac0733e6f89e871775";

//Function to display city current weather
function displayCityWeather(cityname) {
  var APIKey = "16579f7bf39afcac0733e6f89e871775";
  console.log(this);
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
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
    var cityNameP = $("<h3>").text(response.name + " - " + ` ${currentDate}`);

    //City Temp in Farenheit
    var tempEl = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    var tempP = $("<p>").text("Temperature: " + tempEl + " F");

    //City Humidity
    var humidityEl = response.main.humidity;
    var humidityP = $("<p>").text("Humidity: " + humidityEl + " %");

    //City Wind Speed
    var windEl = response.wind.speed;
    var windP = $("<p>").text("Wind Speed: " + windEl + " MPH");

    //Weather Icons

    //Displays city current weather
    var newCurrentWeatherDiv = $("<div class='current-weather'>");
    newCurrentWeatherDiv.append(cityNameP, tempP, humidityP, windP);
    cityDiv.html(newCurrentWeatherDiv);

    //UV Index call
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    var queryUrl2 =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: queryUrl2,
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
      $("#uv-display").html(uvBtn);
    });
  });
  //Display 5-day Forecast
  var queryUrl3 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityname +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryUrl3,
    method: "GET",
  }).then(function (response) {
    $("#5-day-forecast").empty();
    //Storing results
    var weatherResults = response.list;
    //For loop to call 5 day forecast on html
    for (var i = 0; i < weatherResults.length; i += 8) {
      var displayCityForecastDiv = $("<div class='card-forecast'>");
      var date = weatherResults[i].dt_txt;
      var fixedDate = date.substr(0, 10);
      var tempEl2 = ((weatherResults[i].main.temp - 273.15) * 1.8 + 32).toFixed(
        1
      );
      var humidityEl2 = weatherResults[i].main.humidity;
      //Displays Weather info
      var displayDate = $("<h6 class='card-title'>").text(fixedDate);
      var displayTemp = $("<p class='card-text'>").text(
        "Temp: " + tempEl2 + " F"
      );
      var displayHumidity = $("<p class='card-text'>").text(
        "Humidity: " + humidityEl2 + " %"
      );
      //Creating weather icons
      // var weather = weatherResults[i].weather[0].main;

      displayCityForecastDiv.append(displayDate);
      displayCityForecastDiv.append(displayTemp);
      displayCityForecastDiv.append(displayHumidity);
      $("#5-day-forecast").append(displayCityForecastDiv);
    }
  });
}
storedWeather();
//Grabs text input from form on click
$("#add-city-btn").on("click", function (event) {
  event.preventDefault();
  //stores city name
  var cityInput = $("#city-input").val().trim();

  //Saves to local storage
  var cityInputText = $(this).siblings("input").val();
  var storedCities = [];
  storedCities.push(cityInputText);
  localStorage.setItem("cityInputName", JSON.stringify(storedCities));

  displayCityWeather(cityInput);
  storedWeather(storedCities);
});

function storedWeather() {
  // //Calls city name from user input and displays in div

  var lastCitySearch = JSON.parse(localStorage.getItem("cityInputName"));

  //Creates buttons for each city being inputted by user
  var cityListCol = $("<div class='city-list'>");
  var cityList = $("<button class='city-btn city-item-list'>").text(
    lastCitySearch
  );
  cityListCol.append(cityList);
  $("#city-list-view").prepend(cityListCol);
}
//Displays weather info on click
$("#city-list-view").on("click", ".city-btn", function (event) {
  event.preventDefault();
  displayCityWeather($(this).text());
});
