const search = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather() {
    let city = search.value;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bc7eebc352e9476f9e55dfe499d05f89&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('City not found');
        }

        let data = await response.json();
        console.log(data);

        // Show City Name and Country Code
        const cityName = data.name;
        const countryName = data.sys.country;  // Country code (e.g., "US", "IN")
        document.querySelector('.city').innerHTML = `${cityName}, ${countryName}`;

        // Weather Data
        document.querySelector('.temp').innerHTML = data.main.temp.toFixed() + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        // Get the icon code
        const iconCode = data.weather[0].icon;
        const weatherCondition = data.weather[0].main;  // "Clear", "Clouds", "Rain", etc.
        
        // Get timezone data and check for day/night
        const timezoneOffset = data.timezone;
        const currentTime = new Date((data.dt + timezoneOffset) * 1000);
        const sunrise = new Date(data.sys.sunrise * 1000); // Sunrise in UTC
        const sunset = new Date(data.sys.sunset * 1000);  // Sunset in UTC
        const isDaytime = currentTime >= sunrise && currentTime <= sunset;

        // Custom images for clear weather
        if (weatherCondition === 'Clear') {
            weatherIcon.src = isDaytime ? 'clear.png' : 'pngwing.com.png';
        } else {
            // For other conditions, use OpenWeatherMap icons
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.src = iconUrl;
        }

        search.value = "";
        document.querySelector('.weather').style.display = 'block';

    } catch (error) {
        alert(error.message);
    }
}

searchIcon.addEventListener('click', () => {
    checkWeather();
});

search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWeather();
    }
});
