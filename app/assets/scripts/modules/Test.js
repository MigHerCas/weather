
class Test {

    constructor() {
        this.message = "Hola Mundo!";
    }

    greet() {
        alert(this.message);
    }
}

// this.request.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//         let response = JSON.parse(this.responseText);
//         getElements(response);
//     }
// }

// this.request.open("GET", this.url, true);
// this.request.send();


export default Test;