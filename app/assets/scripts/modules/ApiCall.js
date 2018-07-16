import $ from 'jquery';

class ApiCall {
    
    constructor() {
        this.api_url = "http://api.openweathermap.org/data/2.5/weather?q=";
        this.city = "London,UK";
        this.api_key = "&APPID=a4fd59fe380d5916bbb4cb46978e82ad";
        this.api_call = this.api_url + this.city
            + this.api_key;
    }

    call() {

        let output = $.ajax({
            url: this.api_call,
            type: 'GET',
            data: {},
            datatype: 'json',
            success:  (data) => {
                console.log(data);
            },
            error: () => {
                alert("Error");
            }
        });
        
    }
}

export default ApiCall;