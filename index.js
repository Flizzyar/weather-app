const cityWeather = async (cityName) => {
    const loadingEl = document.querySelector('#loading')
    loadingEl.textContent = 'Laddar väderdata...'

    const cities = {
        stockholm: { lat: 59.3293, lon: 18.0686 },
        göteborg: { lat: 57.7089, lon: 11.9746 },
        malmö: { lat: 55.605, lon: 13.0038 }
    }

    const city = cities[cityName.toLowerCase()]
    if (!city) {
        loadingEl.textContent = ''
        document.querySelector('#city').textContent = ''
        document.querySelector('#temperatur').textContent = ''
        document.querySelector('#windSpeed').textContent = ''
        document.querySelector('#time').textContent = ''
        document.querySelector('#error').textContent =
            'Staden finns inte i databasen!'
        return
    }

    try {
        const result = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
        )
        document.querySelector('#error').textContent = ''
        document.querySelector('#city').textContent = `Stad: ${cityName}`
        document.querySelector(
            '#temperatur'
        ).textContent = `Temperatur: ${result.data.current_weather.temperature}°C`
        document.querySelector(
            '#windSpeed'
        ).textContent = `Vindhastighet: ${result.data.current_weather.windspeed} km/h`
        document.querySelector(
            '#time'
        ).textContent = `Tid: ${result.data.current_weather.time}`
        loadingEl.textContent = ''
    } catch (error) {
        console.error('Fel vid hämtning av väder:', error)
    }
}

document.querySelector('#searchBtn').addEventListener('click', () => {
    const cityName = document.querySelector('#cityInput').value
    cityWeather(cityName)
})
