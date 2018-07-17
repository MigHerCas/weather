import $ from 'jquery';

class ApiCall {
    
    constructor() {
        this.request = new XMLHttpRequest();
        this.city = "London,UK";
        this.api_key = "a4fd59fe380d5916bbb4cb46978e82ad";
        this.url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.api_key}`;
        this.target = document.getElementById("test");
    }  

    call() {
        
        $.ajax({
            url: this.url,
            type: 'GET',
            data: {},
            datatype: 'json',
            success:  (data) => {
                this.render(data);
            },
            error: () => {
                alert("Error");
            }
        });
        
    }

    render(data) {
        console.log(data);
        this.target.innerHTML = data;
    } 
}

export default ApiCall;