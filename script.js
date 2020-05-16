$(document).ready(function(){
//UV index does not exist on openweather as far as i can see
var date = JSON.stringify(moment().format("LL"));
var cities = []
//8655336642
$("#searchBtn").on("click", function(){
  event.preventDefault();
  var theCity = $("#citySearch").val().trim();
  runCall();
  makeButtons();
})

function makeButtons(){
  $("#buttonDump").empty();
  for (var i=0; i < cities.length; i++){
    var create = $("button");
    create.addClass("btn changeBtn");
    create.attr("data-name", cities[i]);
    create.text(cities[i]);
    $("#buttonDump").append(create);
  }

}
function changeCity(){
  $("#day1").text("")
}







function runCall(){
var APIKey = "a5a6719c38e6bf0209c461f1f0f255ca";

    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + `${theCity}`+ "&appid=" + `${APIKey}`;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response);
      console.log(queryURL);
      cities.push {
        City: `${response.name}`;
        Temperature: `${response.main.temp}`;
        Windspeed: `${response.wind.speed}`;
        humidity: `${response.main.humidity}`;
        Clouds: `${response.clouds.all}`
      };
      }
    )}

  })