let city = document.getElementsByClassName('name')[0];
let time = document.getElementsByClassName('local-time')[0];
let tempC = document.getElementsByClassName('temp-c')[0];
let tempF = document.getElementsByClassName('temp-f')[0];
let sky = document.getElementsByClassName('info')[0];
const Humidity = document.getElementsByClassName('humidity')[0]
const Wind = document.getElementsByClassName('wind')[0];

function getVal(){
    let val = document.querySelector('input').value
    return val
}

let Weather = {
    "apiKey" : "fb0f18314dad4898bd3113515232201",
    fetchWeather : function(city){
        fetch("https://api.weatherapi.com/v1/current.json?key=" + this.apiKey + "&q="+ city + "&aqi=no")
        .then((response) => response.json())
        .then(data => this.DisplayWeather(data))
    },
    DisplayWeather : function(data){
        const { name , localtime , country ,  } = data.location;
        const { temp_c , temp_f , humidity , wind_kph , wind_mph , wind_dir} = data.current;
        const { text , icon} = data.current.condition;
        city.textContent = name + ", " + country;
        time.textContent = "Local Time: " + localtime;
        tempC.textContent = "Temperture in C: " + temp_c + "°C";
        tempF.textContent = "Temperature in F: " + temp_f + "°F"
        sky.textContent = text;
        document.querySelector('img').src = icon;
        Humidity.textContent = "Humidity: " + humidity + "%";
        Wind.textContent = "Wind :" + wind_kph + " kph " + " / " + wind_mph + " mph " + " / "  + wind_dir ;
    }
}

function Search(){
    Weather.fetchWeather(getVal())
}

document.querySelector('input').addEventListener('keyup', (event) => {
    if (event.key == "Enter"){
        Search()
    }
})