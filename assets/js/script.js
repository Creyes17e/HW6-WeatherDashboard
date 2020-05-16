var cities = [];
var currentDate = new Date().toDateString();
var APIKey = "16579f7bf39afcac0733e6f89e871775";

//Function to display city current weather
function displayCityWeather(cityname) {
  $(".display-weather-el").css("background-color", "white");
  $(".display-weather-el").css("border-color", "lightgrey");
  $(".display-weather-el").css("border-style", "solid");
  var APIKey = "16579f7bf39afcac0733e6f89e871775";
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
    //UV Index
    var uvIndexP = $("<p>").text("UV Index: ");

    //Weather Day Icons
    var currentWeather = response.weather[0].main;

    if (currentWeather === "Clouds") {
      var currentWeatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/wn/03d.png"
      );
    } else if (currentWeather === "Thunderstorm") {
      var currentWeatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/wn/11d.png"
      );
    } else if (currentWeather === "Rain") {
      var currentWeatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/wn/10d.png"
      );
    } else if (currentWeather === "Snow") {
      var currentWeatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/wn/13d.png"
      );
    } else if (currentWeather === "Mist") {
      var currentWeatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/wn/50d.png"
      );
    } else if (currentWeather === "Clear") {
      var currentWeatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/wn/01d.png"
      );
    } else if (currentWeather === "Drizzle") {
      var currentWeatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/wn/09d.png"
      );
    }
    //Displays current  weather icon next to city name
    cityNameP.append(currentWeatherIcon);

    //Displays city current weather
    var newCurrentWeatherDiv = $("<div class='current-weather'>");
    newCurrentWeatherDiv.append(cityNameP, tempP, humidityP, windP, uvIndexP);
    cityDiv.html(newCurrentWeatherDiv);

    //UV Index call
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    var queryUrl2 =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
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
      //UV value btn
      var uvResults = response.value.toFixed(1);
      var uvBtn = $("<button class='uv-btn'>").html(uvResults);
      uvIndexP.append(uvBtn);

      //Setting UV Colors
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

    //Title for forecast
    var displayForecastTitleDiv = $("<div class='forecast-title-div'>");
    var displayForecastTitle = $("<h4>").text("5-Day-Forecast");
    displayForecastTitleDiv.append(displayForecastTitle);
    $(".forecast-title").html(displayForecastTitleDiv);

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
      //Weather Day icons /to-do include night weather icons
      var weather = weatherResults[i].weather[0].main;
      if (weather === "Clouds") {
        var weatherIcon = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/wn/03d.png"
        );
      } else if (weather === "Thunderstorm") {
        var weatherIcon = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/wn/11d.png"
        );
      } else if (weather === "Rain") {
        var weatherIcon = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/wn/10d.png"
        );
      } else if (weather === "Snow") {
        var weatherIcon = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/wn/13d.png"
        );
      } else if (weather === "Mist") {
        var weatherIcon = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/wn/50d.png"
        );
      } else if (weather === "Clear") {
        var weatherIcon = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/wn/01d.png"
        );
      } else if (weather === "Drizzle") {
        var weatherIcon = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/wn/09d.png"
        );
      }
      displayCityForecastDiv.append(
        displayDate,
        weatherIcon,
        displayTemp,
        displayHumidity
      );

      $("#5-day-forecast").append(displayCityForecastDiv);
    }
  });
}
storedCityInfo();

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
  storedCityInfo(storedCities);
});

function storedCityInfo() {
  // //Calls city name from user input and displays in div
  var lastCitySearch = JSON.parse(localStorage.getItem("cityInputName"));

  if (lastCitySearch != null) {
    displayCityWeather(lastCitySearch);
  }
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
