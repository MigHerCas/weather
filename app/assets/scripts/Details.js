import $ from 'jquery';
import Current from './modules/Current';
import Forecast from './modules/Forecast';

$( document ).ready(() => {
    let current = new Current();
    current.call();
    let forecast = new Forecast();
    setTimeout(checkFavourite(), 2000);

    // Favourite icon event
    let favIcon = $(".info-panel__details__icon");
    
    favIcon.click(() => {
        favIcon.css("color", "#FFB900");
    });

    favIcon.click(() => {
        let clicks = $(this).data('clicks');

            if (clicks) {
                // odd clicks
                favIcon.css("color", "#777777");

                if (favIcon.hasClass("info-panel__details__icon--on")) {
                    favIcon.removeClass("info-panel__details__icon--on");
                    favIcon.addClass("info-panel__details__icon--off");
                } else {
                    favIcon.addClass("info-panel__details__icon--off");
                }
            } else {
                // even clicks
                favIcon.css("color", "#FFB900");

                current.favourite();

                if (favIcon.hasClass("info-panel__details__icon--off")) {
                    favIcon.removeClass("info-panel__details__icon--off");
                    favIcon.addClass("info-panel__details__icon--on");
                } else {
                    favIcon.addClass("info-panel__details__icon--on");
                }
            }
            $(this).data("clicks", !clicks);
     
    });

    function checkFavourite () {
        // Check if this location is already stored in the favourite list
        let placeId = $(".cityName").html();
    }
});
