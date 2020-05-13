//Initial cities on page
var cities = ["Houston", "Atlanta", "Austin", "Dallas"];
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

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    $("#display-city-weather").empty();
    //Div to hold city weather
    var cityDiv = $("#display-city-weather");
    //City Naem
    var cityNameP = $("<p>").html(
      "<h2>" + response.name + "-" + `(${currentDate})</h2>`
    );
    cityDiv.append(cityNameP);
    //City Temp in Farenheit
    var tempEl = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    var tempP = $("<p>").text("Temperature:" + tempEl + "F");
    cityDiv.append(tempP);

    //City Humidity
    var humidityEl = response.main.humidity;
    var humidityP = $("<p>").text("Humidity:" + humidityEl + "%");
    cityDiv.append(humidityP);

    //City Wind Speed
    var windEl = response.wind.speed;
    var windP = $("<p>").text("Wind Speed:" + windEl + "MPH");
    cityDiv.append(windP);
  });

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
    $("#display-city-forecast").empty();
    var weatherResults = response.list;
    for (var i = 0; i < weatherResults.length; i += 8) {
      var displayCityForecastDiv = $("#display-city-forecast");
      // var date = weatherResults[i].dt_text;
      //date does not display, need to fix
      var tempEl2 = ((weatherResults[i].main.temp - 273.15) * 1.8 + 32).toFixed(
        1
      );
      var humidityEl2 = weatherResults[i].main.humidity;
      console.log(tempEl2);

      // var displayDate = $("<p class='card-title'>").text(setDate);
      var displayTemp = $("<p class='card-text'>").text(
        "Temp:" + tempEl2 + "F"
      );
      var displayHumidity = $("<p class='card-text'>").text(
        "Humidity:" + humidityEl2 + "%"
      );
      // var weather = weatherResults[i].weather[0].main;

      // displayCityForecastDiv.append(displayDate);
      displayCityForecastDiv.append(displayTemp);
      displayCityForecastDiv.append(displayHumidity);
      $("#display-city-forecast").append(displayCityForecastDiv);
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

//Function for event handler for button click
$("#add-city-btn").on("click", function (event) {
  event.preventDefault();

  var city = $("#city-input").val().trim();
  cities.push(city);
  renderCityBtns();
});
$(document).on("click", ".city-btn", displayCityWeather);

renderCityBtns();
