const city = document.querySelector('#city');
const normalTemp = document.querySelector('#normalTemp');
const highTemp = document.querySelector('#highTemp');
const lowTemp = document.querySelector('#lowTemp');
const feelsLike = document.querySelector('#feelsLike');
const weatherIcon = document.querySelector('#weatherIcon');
const weatherDescription = document.querySelector('#weatherDescription');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');


//You must make an API call to the service and get the weather data
let weather = {
    apiKey: "600ff19ab2c6f83d318296acc21c57f2",
    //You must accept input from the user asking for the zip code they would like the weather of
    fetchWeather: function(zipCode) {
        fetch("https://api.openweathermap.org/data/2.5/weather?zip=" +zipCode+ "&units=imperial&appid=" +this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    //You must display the following data points on the page from the API: Current Date, City from the zipcode, Current temperature in ferinheight, current conditions, Temp Hi/Lo
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        //Add a few more data points to the page if available such as temp feels like and humidity
        const { temp, temp_min, temp_max, humidity} = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, temp_min, temp_max, humidity, speed);
        city.innerText = "Weather in " + name;
        weatherDescription.innerText = description;
        normalTemp.innerText = temp + " °F";
        weatherIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
        highTemp.innerText = temp_max + " °F";
        lowTemp.innerHTML = temp_min + " °F";
        feelsLike.innerText 
        humidity.innerText = "Humidity:" + humidity + "%";
        wind.innerText = "Wind speed: " + speed + " mph";
    },
    
    search: function () {
        this.fetchWeather(document.querySelector('#searchBox').value);
    },
}

document.querySelector('#searchButton').addEventListener('click', function() {
    weather.search()
}
);

document.querySelector("#searchBox").addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("28203");


const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]+ ' 2022'
}, 1000);
