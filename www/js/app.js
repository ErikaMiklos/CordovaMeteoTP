$(document).ready(function() {
    var myAPPID = "36d2c23859b983953f25cf83351b1ec3";
    var cardSelector = $("#card");
    var city = localStorage.getItem("city");

    function getWeather() {
        //console.log(city);
        if (city == null) {
            cardSelector.append("<p>Vous n'avez pas encore renseigner la ville.</p>");
        } else {
            $("#card *:not(div)").remove();
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" 
            + city + "&appid=" + myAPPID, function(result) {
                var cityName = result.name;
                var weatherType = result.weather[0].main;
                var iconCode = result.weather[0].icon;
                var temp = result.main.temp;
                var tempInCelsius = (temp - 273.15).toFixed(1);

                cardSelector.append("<ul><li>City: " + cityName 
                + "</li><li>Weather type: " + weatherType 
                + "</li><li>Temperature: " + tempInCelsius
                + " &deg;C</li></ul>");

                cardSelector.append("<img src='img/" + iconCode 
                + ".png' alt='Weather Icon' width='80px' height='80px'>");
            })
        }
    }

    function submitForm() {
        var mycity = $('input').val();
        if(mycity.length >= 3) {
            localStorage.setItem("city", mycity);
            city = mycity;
            getWeather();
        } else {
            alert('empty field');
        }
    }

    $('#getWeather').on('click', submitForm);

    $('form').submit(function(event) {
        event.preventDefault();
        submitForm();
    });

    getWeather();
});