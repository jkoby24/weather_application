$(document).ready(function(){ 
// variable for current date 
var currentDay = moment().format('l');
weatherArr = []



function displayWeather(){
    var citySearch = $('#search-term').val().trim();
    var apiId = '&appid=041c269998ad740632343786aab8b7d6'; 
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ citySearch + apiId; 
    $.ajax({
    url: queryURL, 
    method: "GET"
    }).then(function(response){
        var weatherDiv = $("<div class = 'card-body'>");
        var currentCity = response.name;
        var icon = response.weather[0].icon;
        var iconImage = $("<img>").attr("src","http://openweathermap.org/img/w/" + icon + ".png")
        var pOne = $("<h3>").text(currentCity + ' ' + currentDay);
        
        /// function to convert kelvin to fahrenheit 
        function kelvintoFahrenheit() {
            var fahrenheit = Math.round(((parseFloat(response.main.temp)-273.15)*1.8)+32)
            return fahrenheit;
        }
        var tempreture = kelvintoFahrenheit();
        var pTwo = $('<p>').text('Tempreture:' + ' ' + tempreture + '℉');
        var humidity = response.main.humidity;
        var pThree = $('<p>').text('Humidity:' + ' ' + humidity + '%')
        var windSpeed = response.wind.speed;
        var pFour = $('<p>').text('Wind Speed:' + ' ' + windSpeed + ' ' + 'MPH');
        weatherDiv.append(pOne).append(iconImage).append(pTwo).append(pThree).append(pFour);
        $('#weather').prepend(weatherDiv);
        /// list items appear once city is searched 
        var listBtn = $('<button class = "list-group-item list-group-item-action">');
        var listText = $('<p>').text(currentCity);
        listBtn.append(listText);
        $('.list-group').append(listBtn);

        window.localStorage.setItem("weather", JSON.stringify(response));

        function getWeather(){
        var test = window.localStorage.getItem('weather');
        test2 = JSON.parse(test)
        weatherArr = test2;
        } getWeather()
    });
};


function displayForecast(){
    var citySearch = $('#search-term').val().trim();
    var apiId = '&appid=041c269998ad740632343786aab8b7d6'; 
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+ citySearch + apiId; 
    $.ajax({
    url: queryURL, 
    method: "GET"
    }).then(function(response){

        for (var i = 0; i < response.list.length; i+=8) {

        var forecastDiv = $("<div class = 'col-2 col-sm-2'>");
        var date = response.list[i].dt_txt;
        var lineOne = $('<p>').text(date);
        //icon for current weather conditions 
        var icon = response.list[i].weather[0].icon;
        var iconImage = $("<img>").attr("src","http://openweathermap.org/img/w/" + icon + ".png")

        function kelvintoFahrenheit() {
            var fahrenheit = Math.round(((parseFloat(response.list[i].main.temp)-273.15)*1.8)+32)
            return fahrenheit;
        }
        var tempreture = kelvintoFahrenheit()
        var lineTwo = $('<p>').text('Temp:' + ' ' + tempreture + '℉');
        // gets the humidity information 
        var humidity = response.list[i].main.humidity;
        var lineThree = $('<p>').text('Humidity:' + ' ' + humidity + '%');

        forecastDiv.append(lineOne).append(iconImage).append(lineTwo).append(lineThree);
        $('#day-forecast').append(forecastDiv);
        window.localStorage.setItem("forecast", JSON.stringify(response));
    }
});
};

$(document).on('click', '#search-btn', function (event) {
    event.preventDefault();
    // empties container before search results are applied 
    $('#weather').empty();
    $('#day-forecast').empty();
    var citySearch = $('#search-term').val().trim();
    displayWeather(citySearch);
    displayForecast(citySearch);
    
    
    
});

});