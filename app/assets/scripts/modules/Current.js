import $ from 'jquery';

class Current {

    constructor() {
        this.request = new XMLHttpRequest();
        this.api_key = "a4fd59fe380d5916bbb4cb46978e82ad";
        this.call();
    }

    call() {

        // We get the parameters passed through the details' page link
        let parameters = location.search.substring(1).split("&");

        let t = parameters[0].split("=");
        let type = unescape(t[1]);
        
        let d = parameters[1].split("=");
        let data = unescape(d[1]);
        let url;

        // Name or Id option
        if (type == 1) {
            url = 'http://api.openweathermap.org/data/2.5/weather?q=' + data + '&appid=a4fd59fe380d5916bbb4cb46978e82ad&units=metric';
        } else if (type == 2) {
            url = 'http://api.openweathermap.org/data/2.5/weather?id=' + data + '&appid=a4fd59fe380d5916bbb4cb46978e82ad&units=metric';
        }

        // Api call
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            datatype: 'json',
            success: (data) => {
                console.log(data);
                this.renderCurrent(data);
            },
            error: () => {
                alert("Error");
            }
        });

    }

    renderCurrent(data) {

        // Info from API
        let name = data.name;
        let icon = data.weather[0].icon;
        let max = data.main.temp_max;
        let min = data.main.temp_min;
        let humidityP = data.main.humidity;
        let rainP = data.rain;

        // In case there is any rain
        if (rainP === undefined) {
            rainP = "0%";
        } else {
            rainP = rainP[0] + "%";
        }

        // Elements
        let cityName = $("#cityName");
        let detailsIcon = $("#det-icon");
        let tempMax = $(".info-panel__daily__item-max"); 
        let tempMin = $(".info-panel__daily__item-min"); 
        let rain = $(".info-panel__daily__item-rain"); 
        let humidity = $(".info-panel__daily__item-humidity"); 

        // Rendering HTML
        cityName.html(name);
        detailsIcon.attr("src", `http://openweathermap.org/img/w/${icon}.png`);
        tempMax.html(max);
        tempMin.html(min);
        rain.html(rainP);
        humidity.html(humidityP);

        
    }

}

export default Current;
