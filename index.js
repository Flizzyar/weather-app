const cities = {
    stockholm: { lat: 59.3293, lon: 18.0686 },
    göteborg: { lat: 57.7089, lon: 11.9746 },
    malmö: { lat: 55.605, lon: 13.0038 },
    paris: { lat: 48.8572, lon: 2.3528 }
}

const cityWeather = async (cityInput) => {
    const city = cities[cityInput.toLowerCase()]
    if (!city) {
        alert('Staden finns inte i databasen!')
    }

    try {
        const result = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
        )
        const cityTemp = document.querySelector('#temperatur')
        const cityName = document.querySelector('#city')
        const cityWindSpeed = document.querySelector('#windSpeed')
        const cityTime = document.querySelector('#time')
        const speed = result.data.current_weather.windspeed
        const temp = result.data.current_weather.temperature
        const time = result.data.current_weather.time
        cityTemp.innerHTML = `Temperature: ${temp}°C`
        cityName.innerHTML = `${cityInput}`
        cityWindSpeed.innerHTML = `Windspeed: ${speed}`
        cityTime.innerHTML = `Time: ${time}`
    } catch (error) {
        console.error('Fel vid hämtning av väder:', error)
    }
}

document.querySelector('#searchBtn').addEventListener('click', () => {
    const cityName = document.querySelector('#cityInput').value
    cityWeather(cityName)
})
