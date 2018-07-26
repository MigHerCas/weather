import Search from './modules/Search';
import $ from 'jquery';
import Current from './modules/Current';

$(document).ready(function () {

    // Classes
    let current = new Current();
    setTimeout(favourites(), 1000);

    // Variables
    let inpName = $("input#name");
    let inpId = $("input#id");
    let inpSearch = $(".search__bar__input");
    let btnSearch = $("#searchBtn");
    let type = 1;
    let data;
    let search;

    // Radio events
    inpName.click(function () {
        type = 1;
        search = new Search(data, type);
        search.address();
    });

    inpId.click(function () {
        type = 2;
        search = new Search(data, type);
        search.address();
    });

    // Input text event
    inpSearch.on('input', function (e) {
        data = inpSearch.val().toLowerCase();   
        search = new Search(data, type);
        search.address();
    });

    function favourites() {
        // We check if there is any object already
        if (localStorage.getItem("favourites") === null) {
            // Any favourite, don't do stuff here
        } else {

            // Item already exists, we get it
            let favouritesObject = JSON.parse(localStorage.getItem("favourites"));

            // We check how many entries does it have
            let length = Object.keys(JSON.parse(localStorage.getItem("favourites"))).length;
            let index = 1;

            for (let i = 1; i <= length; i++) {
                // We display the items
                $(`.favourites__item--${i}`).css("display", "grid");
            }

            // We iterate over this object
            for (const item in favouritesObject) {
                let placeId = favouritesObject[item];

                // Call API through Current.js
                current.setFavourite(placeId, index);
                index++;
            }
        }
    }

});