const weatherApiKey = '99be4880848478fc68a6f9d53e3a1f6e';
const weatherApiPath = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherApiKey}`
fetch(weatherApiPath)
    .then(resp => console.log(resp.json()));

