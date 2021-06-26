let weather = {
    weatherApiKey: '99be4880848478fc68a6f9d53e3a1f6e',
    fetchWeather(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.weatherApiKey
        )
            .then((resp) => resp.json())
            .then((data) => localStorage.setItem((data.toString()), JSON.stringify(this.displayWeather(data))))
            .catch(() => {
                alert("No such city/country found, please enter the valid information to the search-box")
            })
    },

    searchWeather() {
        this.fetchWeather(document.querySelector('.search-bar').value);
    },
    displayWeather: data => {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector('.city').innerHTML = "Current weather in " + name;
        document.querySelector('.weather__desc').innerText = description;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.humidity').innerText = "Humidity feels like: " + humidity + "%";
        document.querySelector('.wind').innerText = "Wind speed: " + speed + " km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        document.querySelector(".weather-container").classList.remove("loading");
    }
};

document.querySelector('.search-bar__container button').addEventListener('click', () => {
    weather.searchWeather();
    const objToLS = {
        city: document.querySelector('.city').innerHTML,
        temp: document.querySelector('.temp').innerHTML,
        description: document.querySelector('.weather__desc').innerHTML
    };
    localStorage.setItem('city', JSON.stringify(objToLS))
})

document.querySelector('.search-bar').addEventListener('keyup', (e) => {
    if(e.key === "Enter") {
        weather.searchWeather();
    }
})

// console.log("Saved data in LS: " + localStorage.getItem('city'));

