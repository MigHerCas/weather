import $ from 'jquery';

class Search {

    constructor(data, type) {
        this.request = new XMLHttpRequest();
        this.api_key = "a4fd59fe380d5916bbb4cb46978e82ad";
        this.type = type;
        this.data = data;  
        this.btn = $("#searchBtn");
    }

    address() {
        this.btn.attr("href", `details.html?type=${this.type}&data=${this.data}`);
    }
}

export default Search;