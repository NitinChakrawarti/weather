const inputs = document.getElementById('input_field');
const search = document.getElementById('span');
const locat = document.getElementById('loca');
const tempe = document.getElementById('temprature');
const wind = document.getElementById('wind');
const humidc = document.getElementById('humidc');
const imge = document.querySelector('#icon_wea');
const myApi = "14d436cfc10fdf7c4f51d081f9a6525c"
const resultDisplay = document.querySelector("#results_resp")
const url = `"https://api.openweathermap.org/data/2.5/weather?q="${''}&appid=${myApi}`

function searchclick() {
    if (inputs.value === '') {
        alert("Please enter a location");
    }
    else {
        var search_value = inputs.value;
        apicall(search_value.toLowerCase().replaceAll(' ', ''));
    }
}

async function apicall(e) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=${myApi}`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            resultDisplay.style.display= "none";
            alert("Invalid Location , Please Enter a valid Location")
            throw new Error(`Response status: ${response.status}`);
        }
         
        const json = await response.json();
        // console.log(json);
        resultDisplay.style.display= "block"
        tempe.innerHTML = (json.main.temp - 273).toFixed(0);
        locat.innerHTML = (json.name);
        wind.innerHTML = (json.wind.speed);
        humidc.innerHTML = (json.main.humidity);

// sir this code is written for icon 
        
        let icon =json.weather[0].main
        imge.src = icon +'.png';
        inputs.value = '';

    }
    catch (error) {
        console.log(error);

    }
}
