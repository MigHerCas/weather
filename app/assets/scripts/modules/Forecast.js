import $ from 'jquery';

class Forecast {

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
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=a4fd59fe380d5916bbb4cb46978e82ad&units=metric`;

        } else if (type == 2) {
            url = `https://api.openweathermap.org/data/2.5/forecast?id=${data}&appid=a4fd59fe380d5916bbb4cb46978e82ad&units=metric`;
        } else {
            let coord = data.split("*");
            let lat = coord[0];
            let lon = coord[1];

            url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a4fd59fe380d5916bbb4cb46978e82ad&units=metric`;
        }

        // Api call
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            datatype: 'json',
            success: (data) => {
                this.getTemperatures(data);
                this.contrast(data);
            },
            error: (e) => {
                alert(e);
            }
        });

    }

    getTemperatures(data) {

        // Variables
        let list = data.list;
        
        let obj = {};
        let date, day, temp;

        // Date variables
        let str, array, date_str, date_array, year_str, month_str, day_str;

        for (const element of list) {
            str = element.dt_txt;

            array = str.split(" ");
            date_str = array[0];

            date_array = date_str.split("-");
            year_str = date_array[0];
            month_str = date_array[1];
            day_str = date_array[2];

            // We create the a date object with these parameters
            date = new Date(year_str, month_str, day_str);

            // Day extract
            day = date.getDate();
            temp = element.main.temp;

            if (obj.hasOwnProperty(`${day}`)) {
                obj[`${day}`] = (obj[`${day}`] + temp) / 2;
            } else {
                obj[`${day}`] = temp;
            }
        }

        // With this obj now we bring the info into the markup
        let target; 
        let index = 0;
        let currMin, currMax, currentAVGtemp;
        let currMax_str = $(".info-panel__daily__item-max").html();
        let currMin_str = $(".info-panel__daily__item-min").html();

        currMax = parseInt(currMax_str.substring(0, 2));
        currMin = parseInt(currMin_str.substring(0, 2));
        currentAVGtemp = Math.round((currMax + currMin) / 2);
        
        for (const prop in obj) {
            target = $(`.info-panel__forecast__item--${index}`);
            target.html(`${Math.round(obj[prop])} ºC` );   

            if (obj[prop] >= currentAVGtemp) {   
                target.css("color", "#E51118");
            } else {
                target.css("color", "#2998FF");
            }
            
            index++;

            // In some cases we get 6 days
            if (index == 5) break;
        }

    }

    contrast(data) {

        // Weather variables
        let currentMax = $(".info-panel__daily__item-max").html();
        currentMax = Math.round(parseInt(currentMax));
        let currentMin = $(".info-panel__daily__item-min").html();
        currentMin = Math.round(parseInt(currentMin));
        let currentTemp = Math.round((currentMax + currentMin) / 2);

        let currentHumidity = $(".info-panel__daily__item-humidity").html();
        currentHumidity = parseInt(currentHumidity.substr(0, 2));

        let cloudsObj = JSON.parse(localStorage.getItem("clouds"));
        let currentClouds = cloudsObj["clouds"];

        let nearTemp = $(".info-panel__forecast__item--1").html();
        nearTemp = parseInt(nearTemp.substring(0, 2)); 

        let nearHumidity;
        let nearClouds;

        let list = data.list;

        // Date variables
        let date, day, str, array, date_str, date_array, year_str, month_str, day_str;
        

        // Object with the clouds info of the next days
        let obj = {};
        let info = [];

        let cloudsInfo, humidityInfo;    

        for (const element of list) {
            str = element.dt_txt;

            array = str.split(" ");
            date_str = array[0];

            date_array = date_str.split("-");
            year_str = date_array[0];
            month_str = date_array[1];
            day_str = date_array[2];

            // We create the a date object with these parameters
            date = new Date(year_str, month_str, day_str);

            // Day extract
            day = date.getDate();
            cloudsInfo = element["clouds"]["all"];
            humidityInfo = element["main"]["humidity"];

            if (obj.hasOwnProperty(`${day}`)) {
                info = [(Math.round((obj[`${day}`][0] + cloudsInfo) / 2)), (Math.round((obj[`${day}`][1] + humidityInfo) / 2))]
                obj[`${day}`] = info;
            } else {
                info = [cloudsInfo, humidityInfo];
                obj[`${day}`] = info;
            }

        }
        
        let index = 0;
        
        // We get the clouds info of next day
        for (const prop in obj) {

            // Next day
            if (index == 1) {

                // Store the info
                nearClouds = obj[prop][0];
                nearHumidity = obj[prop][1];   
                break;
            }

            index++;
        }

        // With this info:
        //      Current: currentTemp, currentHumidity, currentClouds
        //      Near: nearTemp nearHumidity nearClouds
        // We calculate if the weather of next day will be better or worse

        // In my opinion, temperature is the most important feature,
        // then: clouds, temperature in this order

        let difTemp = currentTemp - nearTemp;
        let difCloud = currentClouds - nearClouds;
        let difHum = currentHumidity - nearHumidity;

        let icon = $(".info-panel__subsequent__item-icon");

        if (difTemp > 0) {
            // Worse
            icon.addClass("fa-arrow-down");
            icon.css("color", "#E51118");

        } else if (difTemp == 0) {

            if (difCloud > 0) {
                // Better
                icon.addClass("fa-arrow-up");
                icon.css("color", "#7ED56F");
            } else if (difCloud < 0) {
                // Worse
                icon.addClass("fa-arrow-down");
                icon.css("color", "#E51118");
            } else {
                if (difHum > 0) {
                    // Better
                    icon.addClass("fa-arrow-up");
                    icon.css("color", "#7ED56F");
                } else if (difHum < 0) {
                    // Worse
                    icon.addClass("fa-arrow-down");
                    icon.css("color", "#E51118");
                } else {
                    // Equal
                    icon.addClass("fa-equals");
                    icon.css("color", "#777777");
                }
            }
        } else {
            // Better
            icon.addClass("fa-arrow-up");
            icon.css("color", "#7ED56F");
        }
        
    }
            
}

export default Forecast;
