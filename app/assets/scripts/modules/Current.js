import $ from 'jquery';

class Current {

    constructor() {
        this.request = new XMLHttpRequest();
        this.api_key = "a4fd59fe380d5916bbb4cb46978e82ad";
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
            url = `http://api.openweathermap.org/data/2.5/weather?q=${data}&appid=a4fd59fe380d5916bbb4cb46978e82ad&units=metric`;
        } else if (type == 2) {
            url = `http://api.openweathermap.org/data/2.5/weather?id=${data}&appid=a4fd59fe380d5916bbb4cb46978e82ad&units=metric`;
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
            error: (e) => {
                alert(e);
            }
        });

    }

    callFavourite(id) {
        let url = `http://api.openweathermap.org/data/2.5/weather?id=${placeId}&appid=a4fd59fe380d5916bbb4cb46978e82ad&units=metric`;

        // Api call
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            datatype: 'json',
            success: (data) => {
                this.renderCurrent(data);
            },
            error: (e) => {
                alert(e);
            }
        });
    }

    setFavourite(placeId, index) {
        let url = `http://api.openweathermap.org/data/2.5/weather?id=${placeId}&appid=a4fd59fe380d5916bbb4cb46978e82ad&units=metric`;

        // Api call
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            datatype: 'json',
            success: (data) => {
                this.renderFavourites(data, index);
            },
            error: (e) => {
                alert(e);
            }
        });
    }

    renderFavourites(data, index) {

        // Elements
        let nameElement = $(`#fav-cityname-${index}`);
        let iconElement = $(`#fav-icon-${index}`);
        let maxElement = $(`#fav-max-${index}`);
        let minElement = $(`#fav-min-${index}`);
        let anchor = $(`#favourite-anchor-${index}`);

        // Info from API
        let name = data.name;
        let id = data.id;
        let icon = data.weather[0].icon;
        let max = data.main.temp_max;
        let min = data.main.temp_min;
        
        // Rendering HTML
        nameElement.html(name);
        anchor.attr("href", `details.html?type=2&data=${id}`);

        iconElement.attr("src", `http://openweathermap.org/img/w/${icon}.png`);
        maxElement.html(`${max} ºC`);
        minElement.html(`${min} ºC`);
    }

    renderCurrent(data) {

        // Info from API
        let name = data.name;
        let id = data.id;
        let icon = data.weather[0].icon;
        let max = Math.round(parseInt(data.main.temp_max));
        let min = Math.round(parseInt(data.main.temp_min));
        let humidityP = data.main.humidity;
        let rainP = data.rain;
        let clouds = data.clouds.all;

        // We save cloulds value in localStorage item
        // We check if there is any object already
        let cloudsObject = {"clouds": clouds};

        localStorage.setItem("clouds", JSON.stringify(cloudsObject));

        // Item already exists, we push this favourite
        cloudsObject = JSON.parse(localStorage.getItem("clouds"));

        // Overwrite cloud value
        cloudsObject["clouds"] = clouds;

        localStorage.setItem("clouds", JSON.stringify(cloudsObject));
        cloudsObject = JSON.parse(localStorage.getItem("clouds"));

        // In case there is any rain
        if (rainP === undefined) {
            rainP = "0%";
        } else {
            rainP = rainP[0] + "%";
        }

        // Elements
        let cityName = $(".cityName");
        let detailsIcon = $("#det-icon");
        let tempMax = $(".info-panel__daily__item-max"); 
        let tempMin = $(".info-panel__daily__item-min"); 
        let rain = $(".info-panel__daily__item-rain"); 
        let humidity = $(".info-panel__daily__item-humidity"); 

        // Rendering HTML
        cityName.html(name);
        cityName.attr("id", id);

        detailsIcon.attr("src", `http://openweathermap.org/img/w/${icon}.png`);
        tempMax.html(`${max} ºC`);
        tempMin.html(`${min} ºC`);
        rain.html(rainP);
        humidity.html(`${humidityP}%`);

        
    }

    favourite() {
        
        // We store the city as favourite when the icon is clicked

        // First we get the id of the place
        let placeId = $(".cityName").attr("id");

        let favouritesObject;
        
        // localStorage
        if (typeof (Storage) !== "undefined") {
            
            // Code for localStorage/sessionStorage.

            // We check if there is any object already
            if (localStorage.getItem("favourites") === null) {
                
                // Item does not exist yet, we create it, adding this id
                favouritesObject = {1: placeId};

                // We store it
                localStorage.setItem("favourites", JSON.stringify(favouritesObject));

            } else {

                // Item already exists, we get it
                favouritesObject = JSON.parse(localStorage.getItem("favourites"));

                // We check how many entries does it have
                let length = Object.keys(JSON.parse(localStorage.getItem("favourites"))).length;

                if (length == 6) {
                    // We dont store more favourites
                    alert("Max number of favourite locations reached");
                } else {

                    // We save our id with the index
                    favouritesObject[(length + 1)] = placeId;
                    
                    // We store it
                    localStorage.setItem("favourites", JSON.stringify(favouritesObject));
                    localStorage.getItem("favourites");
                }
            }
            
            favouritesObject = JSON.parse(localStorage.getItem("favourites"));
            console.log(favouritesObject);
            
            
        } else {
            // Sorry! No Web Storage support..
            alert("Local storage is not supported by your browser. You will not be able to save favourite locations");
        }
    }

    clearStorage() {
        
        let clear = {};
        localStorage.setItem("favourites", JSON.stringify(clear));
        localStorage.getItem("favourites");
    }

}

export default Current;
