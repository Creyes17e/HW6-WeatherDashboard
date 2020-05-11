var cities = [""];

function displayCities() {
  var city = $(this).attr("data-name");
  var APIKey = "16579f7bf39afcac0733e6f89e871775";
  var url =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=Houston&appid=" +
    APIKey;
}

$.ajax({
  url,
  method: "GET",
}).then(function (response) {
  console.log(response);
  console.log(queryURL);
});
