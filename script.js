$(function () {

  searchWeather("New York")

  $('#searchBtn').click(function () {
    var searchValue = $('#searchInput').val();
    searchWeather(searchValue);
  });


  function searchWeather(searchValue) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=a5a6719c38e6bf0209c461f1f0f255ca&units=imperial",
      dataType: "json",
      success: function (data) {
        console.log(data)
        $('#errorDiv').html("");
        var lat = data.coord.lat;
        var long = data.coord.lon;
        var imgPlug = encodeURIComponent(data.weather[0].description);
        var description = "Weather: " + data.weather[0].description;
        var tMax = "Max temp: " + data.main.temp_max;
        var tMin = "Min temp: " + data.main.temp_min;
        var humidity = "Humidity: " + data.main.humidity;
        var temp = "Current temp: " + data.main.temp;
        var wind = "Wind speed: " + data.wind.speed;
        var city = data.name
        $("#desc").html(description);
        $("#lTemp").html(tMin);
        $("#cTemp").html(temp);
        $("#hTemp").html(tMax);
        $("#wind").html(wind);
        $("#humid").html(humidity);
        $("#city").html(city);
        $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "9&exclude=current,minutely,hourly,alert&appid=a5a6719c38e6bf0209c461f1f0f255ca&units=imperial",
          dataType: "json",
          success: function (data) {
            for (i = 0; i < 4; i++) {
              var id = "day" + i;
              $('#date').html(moment().format("dddd, MMMM Do YYYY"));
              var max = " Max temp: " + data.daily[i].temp.max;
              var min = " Min temp: " + data.daily[i].temp.min;
              var src = "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
              var humidity = " Humidity: " + data.daily[i].humidity;
              var main = "Weather: " + data.daily[i].weather[0].main;
              $('#' + id + 'main').html(main);
              $('#' + id + 'high').html(max);
              $('#' + id + 'low').html(min);
              $('#' + id + 'humid').html(humidity);
              $('#' + id + 'icon').attr("src", src);
              var dayCheck = moment().add(i + 1, 'days').weekday()
              $('#' + id).html(moment().add(i + 1, 'days').format("dddd"))
            }
            $.ajax({
              type: "GET",
              url: "https://pixabay.com/api/?key=20327596-352360f8a2ed6166a8179e672&q=" + imgPlug,
              dataType: "json",
              success: function (data) {
                console.log(data);
                var pull = data.hits[0].webformatURL
                $('#mainImg').attr("src", pull);
              },
              error: function (error) {
                console.log(error);
                $('.icon').attr("src", '');
                $('#errorDiv').html("Oops! Something went wrong!");
              }
            });
          },
          error: function (error) {
            console.log(error);
            $('.icon').attr("src", '');
            $('#errorDiv').html("Oops! Something went wrong!");
          }
        });
      },
      error: function (error) {
        console.log(error);
        $('.icon').attr("src", '');
        $('#errorDiv').html("Oops! Something went wrong!");
      }
    });
  }
})
