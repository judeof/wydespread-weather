const { mainModule } = require("process")

const geoCodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'
const weatherUrl='http://api.weatherstack.com/current?access_key=517046ba0cefeabf8d9414cec824ae5c&query='

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