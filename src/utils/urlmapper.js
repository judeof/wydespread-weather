const { mainModule } = require("process")
const access_key=require('./keys.js')

const geoCodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'
const weatherUrl='http://api.weatherstack.com/current?access_key='+encodeURIComponent(access_key.weather_access_key) + '&query='

const getWeatherURL = () => {
    return weatherUrl
}

const getGeoCodeURL = () => {
    return geoCodeURL
}

module.exports={
    getWeatherURL,
    getGeoCodeURL
}