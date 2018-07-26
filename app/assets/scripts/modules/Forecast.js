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
        }

        // Api call
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            datatype: 'json',
            success: (data) => {
                console.log(data);
                this.getTemperatures(data);
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

    

}

export default Forecast;
