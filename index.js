var API = "1f4dba8c56850c568cf9b904cf6c79ea"
var div = document.createElement('div')
var weather = document.getElementById('weather')
var form = document.querySelector('form')
var search = document.getElementById('weather-search')

//main function
form.onsubmit = function (e) {
    e.preventDefault()
    weather.prepend(div)
    var URL = "https://api.openweathermap.org/data/2.5/weather?q="
    var city = this.search.value.trim()
    if ((!city) || (search.value = '')) {
        city = ''
        div.innerHTML = ''
        search.value = ''
    }
    return fetch(URL + city + "&units=imperial&appid=" + API)
//location not found
        .then(function (res) {
            if (res.status !== 200) throw new Error('Location not Found')
            return res.json()
        })
        .then(showData)

        .catch(function (err) {
            div.innerHTML = err.message
        })
}

//display info function
function showData(data) {
    city = ""
    div.innerHTML = ""
    search.value = ''

//show city
    var location = document.createElement('h2')
    div.appendChild(location)
    location.textContent = data.name + " , " + data.sys.country

//show map link
    var mapLink = document.createElement('a')
    var lat = data.coord.lat
    var lon = data.coord.lon
    var map = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon
    div.appendChild(mapLink)
    mapLink.textContent = "Click to View Map"
    mapLink.href = map
    mapLink.target = "_BLANK"

//show weather condition icon
    var icon = document.createElement('img')
    var iconCode = data.weather[0].icon
    var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png"
    icon.src = iconURL
    icon.alt = data.name
    div.appendChild(icon)

//show weather condition
    var condition = document.createElement('p')
    condition.setAttribute('style', 'text-transform: capitalize')
    condition.textContent = data.weather[0].description
    div.appendChild(condition)

//show current temperature
    var temperature = document.createElement('p')
    temperatureNumber = data.main.temp
    temperature.textContent = "Current:  " + temperatureNumber + '° F'
    div.appendChild(temperature)

//show feels like temperature
    var feelsLike = document.createElement('p')
    feelsLikeTemp = data.main.feels_like
    feelsLike.textContent = "Feels like:  " + feelsLikeTemp + '° F'
    div.appendChild(feelsLike)

//show time
    var dateTime = document.createElement('p')
    var date = new Date((data.dt) * 1000)
    var time = date.toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit'
    })
    dateTime.textContent = 'Last Updated:  ' + time
    div.appendChild(dateTime)
}