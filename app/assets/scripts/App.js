import ApiCall from './modules/ApiCall';
import Test from './modules/Test';
import Search from './modules/Search';
import $ from 'jquery';

$(document).ready(function () {

    // Variables
    let inpName = $("input#id");
    let inpId = $("input#name");
    let inpSearch = $(".search__bar__input");
    let btnSearch = $("#searchBtn");
    let type = 1;
    let data;

    // Radio events
    inpName.click(function () {
        type = 1;
    });

    inpId.click(function () {
        type = 2;
    });

    // Input text event
    inpSearch.on('input', function (e) {
        data = inpSearch.val().toLowerCase();   
    });

    // Search btn event
    btnSearch.hover(function() {
        let search = new Search(data, type);
        search.call();
    });
});